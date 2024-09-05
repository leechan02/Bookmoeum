"use client";
import { FiX } from "react-icons/fi";
import ButtonIcon from "../Icon/ButtonIcon";
import SearchBar from "../Input/SearchBar";
import { useState } from "react";
import LibrarySelect from "./LibrarySelect";

interface LibrarySelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLibrarySelect: (library: LibraryResult) => void;
}

export interface LibraryResult {
  libraryName: string;
  libraryCode: string;
  address: string;
  homepage: string;
}

export default function LibrarySelectPopup({
  isOpen,
  onClose,
  onLibrarySelect,
}: LibrarySelectPopupProps) {
  const [results, setResults] = useState<LibraryResult[]>([]);
  const [resultCount, setResultCount] = useState(0);

  async function searchLibrary(query: string): Promise<LibraryResult[]> {
    try {
      const response = await fetch(
        `/api/library?query=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("검색 실패");
        return [];
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      return [];
    }
  }

  const handleSubmit = async (query: string) => {
    console.log(query);

    const searchResult = await searchLibrary(query);
    setResults(searchResult);
    setResultCount(searchResult.length);
  };

  const handleLibrarySelect = (library: LibraryResult) => {
    onLibrarySelect(library);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-primary bg-opacity-30 flex items-center justify-center z-50'
      onClick={handleOverlayClick}
    >
      <div
        className='w-[320px] h-[480px] rounded-3xl bg-white p-4 relative flex flex-col justify-between items-center'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col gap-4'>
          <div className='text-sm text-primary font-regular text-center'>
            검색결과 {resultCount}
          </div>
          <div className='max-h-[360px] overflow-y-auto flex flex-col gap-2 scrollbar-hide'>
            {results.map((result, index) => (
              <LibrarySelect
                key={index}
                library={result}
                onSelect={() => handleLibrarySelect(result)}
              />
            ))}
          </div>
        </div>
        <SearchBar
          placeholder='도서관을 검색해보세요'
          isBook={false}
          onSubmit={handleSubmit}
          small={true}
        />
      </div>
    </div>
  );
}
