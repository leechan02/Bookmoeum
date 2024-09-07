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

interface BookData {
  title: string;
  author: string;
  image: string;
  publisher: string;
  isbn: string;
  description: string;
  link: string;
  pubdate: string;
}

export interface ProcessedBookData extends BookData {
  processedTitle: string;
  processedAuthor: string;
  translator: string;
  processedCategory: string;
}

const processTitle = (title: string): string => {
  const specialChars = ["(", "-", ":", "·"];
  for (let char of specialChars) {
    const index = title.indexOf(char);
    if (index !== -1) {
      return title.substring(0, index).trim();
    }
  }
  return title.trim();
};

const processAuthorAndTranslator = (
  author: string
): { author: string; translator: string } => {
  const authorMatch = author.match(/(.*?)\s*\(지은이\)/);
  const translatorMatch = author.match(/\(지은이\)(.*?)\(옮긴이\)/);

  const trimSpecialChars = (str: string) =>
    str.replace(/^[^a-zA-Z가-힣]+|[^a-zA-Z가-힣]+$/g, "").trim();

  return {
    author: authorMatch
      ? trimSpecialChars(authorMatch[1])
      : trimSpecialChars(author),
    translator: translatorMatch ? trimSpecialChars(translatorMatch[1]) : "",
  };
};

const processCategory = (category: string): string => {
  const parts = category.split(">");
  console.log(parts);
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return category.trim();
};

export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<ProcessedBookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLibraries, setSelectedLibraries] = useState<LibraryResult[]>([]);
  const book = useSelector((state: RootState) => state.book.selectedBook);

  useEffect(() => {
    console.log(book);

    // 로컬 스토리지에서 선택된 도서관들 불러오기
    const storedLibraries = localStorage.getItem("selectedLibraries");
    if (storedLibraries) {
      setSelectedLibraries(JSON.parse(storedLibraries));
    }
  }, [params.id]);

  const handleSelectLibrary = (library: LibraryResult) => {
    const updatedLibraries = [...selectedLibraries, library];
    setSelectedLibraries(updatedLibraries);
    localStorage.setItem("selectedLibraries", JSON.stringify(updatedLibraries));
  };

  const handleRemoveLibrary = (libraryToRemove: LibraryResult) => {
    const updatedLibraries = selectedLibraries.filter(
      lib => lib.libraryCode !== libraryToRemove.libraryCode
    );
    setSelectedLibraries(updatedLibraries);
    localStorage.setItem("selectedLibraries", JSON.stringify(updatedLibraries));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bookData) return <div>No book data found</div>;

  return (
    <>
     {/* <FirstSection
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
      /> */}
    </>
  );
}
