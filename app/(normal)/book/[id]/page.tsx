"use client";

import { useEffect, useState } from "react";
import FirstSection from "./_components/FirstSection";
import SecondSection from "./_components/SecondSection";
import LibrarySelectPopup, {
  LibraryResult,
} from "@/components/Popup/LibrarySelectPopup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BookData } from "@/store/bookSlice";

interface BookDetailParams {
  params: { id: string };
}

export default function BookDetail({ params }: BookDetailParams) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryResult[]>(
    []
  );
  const bookData = useSelector((state: RootState) => state.book.selectedBook);

  useEffect(() => {
    // 로컬 스토리지에서 선택된 도서관들 불러오기
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