"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";
import { BookData, setSelectedBook, updateBookData } from "@/store/bookSlice";
import FirstSection from "./_components/FirstSection";
import SecondSection from "./_components/SecondSection";
import LibrarySelectPopup, {
  LibraryResult,
} from "@/components/Popup/LibrarySelectPopup";
import SearchCat from "@/components/Loading/SearchCat";

interface BookDetailParams {
  params: { id: string };
}

const fetchBookData = async (id: string): Promise<any> => {
  const response = await fetch(`/api/bookDetail/book?isbn=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book data");
  }
  return response.json();
};

const processTitle = (
  title: string
): { processedTitle: string; subTitle: string } => {
  const match = title.match(/^(.+?)\s*(\(.+\))?$/);
  if (match && match[2]) {
    return {
      processedTitle: match[1].trim(),
      subTitle: match[2].slice(1, -1).trim(),
    };
  }
  return { processedTitle: title, subTitle: "" };
};

const processAuthor = (author: string): string => {
  return author.replace(/\^/g, ", ");
};

const processBookData = (data: any): BookData => {
  const { processedTitle, subTitle } = processTitle(data.title);
  const processedAuthor = processAuthor(data.author);
  return {
    ...data,
    processedTitle,
    processedAuthor,
    subTitle,
    translator: "",
    category: "",
    page: 0,
  };
};

export default function BookDetail({ params }: BookDetailParams) {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryResult[]>(
    []
  );

  const reduxBookData = useSelector(
    (state: RootState) => state.book.selectedBook
  );

  const {
    data: queryBookData,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["book", params.id],
    queryFn: () => fetchBookData(params.id),
    enabled: !reduxBookData,
    staleTime: 1000 * 60 * 30, // 10 minutes
  });

  useEffect(() => {
    if (queryBookData && !reduxBookData) {
      const processedData = processBookData(queryBookData);
      dispatch(setSelectedBook(processedData));
    }
  }, [queryBookData, reduxBookData, dispatch]);

  const bookData =
    reduxBookData || (queryBookData ? processBookData(queryBookData) : null);

  useEffect(() => {
    const storedLibraries = localStorage.getItem("selectedLibraries");
    if (storedLibraries) {
      setSelectedLibraries(JSON.parse(storedLibraries));
    }
  }, []);

  const handleSelectLibrary = (library: LibraryResult) => {
    const updatedLibraries = [...selectedLibraries, library];
    setSelectedLibraries(updatedLibraries);
    localStorage.setItem("selectedLibraries", JSON.stringify(updatedLibraries));
  };

  const handleRemoveLibrary = (libraryToRemove: LibraryResult) => {
    const updatedLibraries = selectedLibraries.filter(
      (lib) => lib.libraryCode !== libraryToRemove.libraryCode
    );
    setSelectedLibraries(updatedLibraries);
    localStorage.setItem("selectedLibraries", JSON.stringify(updatedLibraries));
  };

  if (isLoading) {
    return (
      <div className="flex flex-grow justify-center items-center">
        <SearchCat />
      </div>
    );
  }
  if (error) return <div>Error loading book data</div>;
  if (!bookData) return <div>No book data found</div>;

  return (
    <>
      <FirstSection
        bookData={bookData}
        onClick={() => setIsPopupOpen(true)}
        selectedLibraries={selectedLibraries}
        onRemoveLibrary={handleRemoveLibrary}
      />
      <SecondSection bookData={bookData} />
      <LibrarySelectPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLibrarySelect={handleSelectLibrary}
        onLibraryRemove={handleRemoveLibrary}
        selectedLibraries={selectedLibraries}
      />
    </>
  );
}
