import React, { useEffect, useState } from "react";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiPlus } from "react-icons/fi";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";
import { BookData } from "../page";

interface FindBookProps {
  bookData: BookData;
  selectedLibraries: LibraryResult[];
  onAddLibrary: () => void;
}

interface ExistResult {
  exists: boolean;
  title?: string;
  link?: string;
}

interface BookstoreResults {
  [key: string]: ExistResult | null;
}

const resultsCache: { [key: string]: BookstoreResults } = {};

export default function FindBook({
  bookData,
  selectedLibraries,
  onAddLibrary,
}: FindBookProps) {
  const [bookstoreResults, setBookstoreResults] = useState<BookstoreResults>({
    kyobo: null,
    yes24: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookstoreData = async () => {
      setIsLoading(true);
      if (resultsCache[bookData.isbn]) {
        setBookstoreResults(resultsCache[bookData.isbn]);
        setIsLoading(false);
        return;
      }
      const bookstores = ['kyobo', 'yes24'];
      try {
        const results = await Promise.all(
          bookstores.map(async (store) => {
            const response = await fetch(`/api/bookDetail/${store}?isbn=${bookData.isbn}`);
            const data = await response.json();
            console.log(`${store} API response:`, data);  // 디버깅을 위한 로그
            return { [store]: data };
          })
        );
        const newResults = Object.assign({}, ...results);
        setBookstoreResults(newResults);
        resultsCache[bookData.isbn] = newResults;
      } catch (error) {
        console.error('Error fetching bookstore data:', error);
        setBookstoreResults({
          kyobo: { exists: false },
          yes24: { exists: false },
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookstoreData();
  }, [bookData.isbn]);


  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>읽을 수 있는 곳</div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <BookStoreIcon imageUrl='/IconAladdin.svg' width={40} />
            {bookstoreResults.kyobo?.exists && bookstoreResults.kyobo.link && (
              <a href={bookstoreResults.kyobo.link} target="_blank" rel="noopener noreferrer">
                <BookStoreIcon imageUrl='/IconKyobo.svg' width={40} />
              </a>
            )}
            {bookstoreResults.yes24?.exists && bookstoreResults.yes24.link ? (
              <a href={bookstoreResults.yes24.link} target="_blank" rel="noopener noreferrer">
                <BookStoreIcon imageUrl='/IconYes24.svg' width={40} />
              </a>
            ) : (
              <div>Yes24 결과 없음</div>  // Yes24 결과가 없을 때 표시
            )}
            <BookStoreIcon imageUrl='/IconYP.svg' width={40} />
            <BookStoreIcon imageUrl='/IconMille.svg' width={40} />
            <BookStoreIcon imageUrl='/IconRidi.svg' width={40} />
            {selectedLibraries.map((library) => (
              <IconButton
                key={library.libraryCode}
                icon={library.libraryName}
                iconSize={48}
                iconColor='white'
                bgColor='primary'
              />
            ))}
            <IconButton
              icon={FiPlus}
              iconSize={48}
              iconColor='white'
              bgColor='primary'
              onClick={onAddLibrary}
            />
          </>
        )}
      </div>
    </div>
  );
}