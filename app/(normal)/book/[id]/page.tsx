"use client";

import { useEffect, useState } from "react";
import FirstSection from "./_components/FirstSection";
import SecondSection from "./_components/SecondSection";
import LibrarySelectPopup, {
  LibraryResult,
} from "@/components/Popup/LibrarySelectPopup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface BookDetailParams {
  params: { id: string };
}

interface SearchResult {
  title: string;
  author: string;
  image: string;
  publisher: string;
  isbn: string;
  description: string;
  link: string;
  pubdate: string;
}

export interface BookData extends SearchResult {
  processedTitle: string;
  processedAuthor: string;
  subTitle: string;
  translator: string;
  category: string;
  page: number;
}

const processTitle = (title: string) => {
  const match = title.match(/^(.+?)\s*(\(.+\))?$/);
  if (match && match[2]) {
    return {
      processedTitle: match[1].trim(),
      subTitle: match[2].slice(1, -1).trim()  // 괄호 제거
    };
  }
  return { processedTitle: title, subTitle: "" };
};

const processAuthor = (author: string): string => {
  return author.replace(/\^/g, ", ");
};


export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryResult[]>(
    []
  );
  const book = useSelector(
    (state: RootState) => state.book.selectedBook as SearchResult | null
  );

  useEffect(() => {
    if (book) {
      const { processedTitle, subTitle } = processTitle(book.title);
      const processedAuthor = processAuthor(book.author);

      const processedBook = {
        ...book,
        processedTitle,
        processedAuthor,
        subTitle,
        translator: "",
        category: "",
        page: 0,
      };
      setBookData(processedBook);
      console.log(processedBook);
    }

    // 로컬 스토리지에서 선택된 도서관들 불러오기
    const storedLibraries = localStorage.getItem("selectedLibraries");
    if (storedLibraries) {
      setSelectedLibraries(JSON.parse(storedLibraries));
    }
  }, [params.id, book]);

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
