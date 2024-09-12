"use client";
import { FiX } from "react-icons/fi";
import SearchBar from "../Input/SearchBar";
import { useEffect, useState } from "react";
import LibrarySelect from "./LibrarySelect";

interface LibrarySelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLibrarySelect: (library: LibraryResult) => void;
  onLibraryRemove: (library: LibraryResult) => void;
  selectedLibraries: LibraryResult[];
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
  onLibraryRemove,
  selectedLibraries,
}: LibrarySelectPopupProps) {
  const [results, setResults] = useState<LibraryResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<LibraryResult[]>([]);
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    // 선택된 도서관을 제외한 검색 결과 필터링
    const filtered = results.filter(
      result => !selectedLibraries.some(selected => selected.libraryCode === result.libraryCode)
    );
    setFilteredResults(filtered);
    setResultCount(filtered.length);
  }, [results, selectedLibraries]);

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
    const searchResult = await searchLibrary(query);
    setResults(searchResult);
  };

  const handleLibrarySelect = (library: LibraryResult) => {
    onLibrarySelect(library);
  };

  const handleLibraryRemove = (library: LibraryResult) => {
    onLibraryRemove(library);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setResults([]);
      setFilteredResults([]);
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
        className='w-[320px] h-[480px] rounded-3xl bg-white p-4 relative flex flex-col justify-center items-center gap-2'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-sm text-primary font-regular text-center'>
          내 도서관 {selectedLibraries.length}
        </div>
        <div className='max-h-40 flex overflow-y-auto scrollbar-hide'>
          <div className='flex flex-col gap-2'>
            {selectedLibraries.map((library, index) => (
              <LibrarySelect
                key={index}
                library={library}
                onSelect={() => handleLibraryRemove(library)}
                isSelected={true}
              />
            ))}
          </div>
        </div>
        <div className='text-sm text-primary font-regular text-center'>
          검색결과 {resultCount}
        </div>
        <div className='flex-1 overflow-hidden flex flex-col'>
          <div className='flex-1 overflow-y-auto scrollbar-hide'>
            <div className='flex flex-col gap-2'>
              {filteredResults.map((result, index) => (
                <LibrarySelect
                  key={index}
                  library={result}
                  onSelect={() => handleLibrarySelect(result)}
                  isSelected={selectedLibraries.some(
                    (lib) => lib.libraryCode === result.libraryCode
                  )}
                />
              ))}
            </div>
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
