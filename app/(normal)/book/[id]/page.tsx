"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";
import { BookData } from "@/store/bookSlice";
import FirstSection from "./_components/FirstSection";
import SecondSection from "./_components/SecondSection";
import LibrarySelectPopup, { LibraryResult } from "@/components/Popup/LibrarySelectPopup";

interface BookDetailParams {
  params: { id: string };
}

const fetchBookData = async (id: string): Promise<BookData> => {
  const response = await fetch(`/api/bookDetail/aladdin/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book data");
  }
  return response.json();
};

export default function BookDetail({ params }: BookDetailParams) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryResult[]>([]);
  
  const reduxBookData = useSelector((state: RootState) => state.book.selectedBook);

  const { data: queryBookData, isLoading, error } = useQuery<BookData>({
    queryKey: ["book", params.id],
    queryFn: () => fetchBookData(params.id),
    enabled: !reduxBookData, // Redux에 데이터가 없을 때만 쿼리 실행
  });

  const bookData = reduxBookData || queryBookData;

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

  if (isLoading) return <div>Loading...</div>;
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