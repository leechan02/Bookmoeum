import React, { useEffect, useState } from "react";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiPlus } from "react-icons/fi";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BookData, updateBookData } from "../../../../../store/bookSlice";

interface FindBookProps {
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

const processTranslator = (author: string): string => {
  const translatorMatch = author.match(/\(지은이\)(.*?)\(옮긴이\)/);

  const trimSpecialChars = (str: string) =>
    str.replace(/^[^a-zA-Z가-힣]+|[^a-zA-Z가-힣]+$/g, "").trim();

  return translatorMatch ? trimSpecialChars(translatorMatch[1]) : "";
};

const processCategory = (category: string): string => {
  const parts = category.split(">");
  console.log(parts);
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return category.trim();
};

export default function FindBook({
  selectedLibraries,
  onAddLibrary,
}: FindBookProps) {
  const dispatch = useDispatch();
  const bookData = useSelector(
    (state: RootState) => state.book.selectedBook as BookData
  );
  const [bookstoreResults, setBookstoreResults] = useState<BookstoreResults>({
    kyobo: null,
    yes24: null,
    // yp: null,
    aladdin: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookstoreData = async () => {
      if (!bookData) return;

      setIsLoading(true);
      if (resultsCache[bookData.isbn]) {
        setBookstoreResults(resultsCache[bookData.isbn]);
        setIsLoading(false);
        return;
      }
      const bookstores = ["kyobo", "yes24", "aladdin"];
      try {
        const results = await Promise.all(
          bookstores.map(async (store) => {
            const response = await fetch(
              `/api/bookDetail/${store}?isbn=${bookData.isbn}`
            );
            const data = await response.json();
            console.log(`${store} API response:`, data);
            return { [store]: data };
          })
        );
        const newResults = Object.assign({}, ...results);
        setBookstoreResults(newResults);
        resultsCache[bookData.isbn] = newResults;

        // Update Redux state with additional data from Aladdin API
        if (newResults.aladdin?.exists) {
          const translator = processTranslator(newResults.aladdin.author || "");
          const processedCategory = processCategory(
            newResults.aladdin.category || ""
          );

          dispatch(
            updateBookData({
              translator,
              category: processedCategory,
              page: newResults.aladdin.page,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching bookstore data:", error);
        setBookstoreResults({
          kyobo: { exists: false },
          yes24: { exists: false },
          yp: { exists: false },
          aladdin: { exists: false },
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookstoreData();
  }, [bookData, dispatch]);

  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>읽을 수 있는 곳</div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            {bookstoreResults.aladdin?.exists &&
              bookstoreResults.aladdin.link && (
                <a
                  href={bookstoreResults.aladdin.link}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BookStoreIcon imageUrl='/IconAladdin.svg' width={40} />
                </a>
              )}
            {bookstoreResults.kyobo?.exists && bookstoreResults.kyobo.link && (
              <a
                href={bookstoreResults.kyobo.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BookStoreIcon imageUrl='/IconKyobo.svg' width={40} />
              </a>
            )}
            {bookstoreResults.yes24?.exists && bookstoreResults.yes24.link && (
              <a
                href={bookstoreResults.yes24.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BookStoreIcon imageUrl='/IconYes24.svg' width={40} />
              </a>
            )}
            {/* {bookstoreResults.yp?.exists && bookstoreResults.yp.link && (
              <a
                href={bookstoreResults.yp.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BookStoreIcon imageUrl='/IconYP.svg' width={40} />
              </a>
            )} */}
            {/* <BookStoreIcon imageUrl='/IconMille.svg' width={40} /> */}
            {/* <BookStoreIcon imageUrl='/IconRidi.svg' width={40} /> */}
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
