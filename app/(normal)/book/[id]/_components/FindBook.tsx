import React, { useEffect, useState } from "react";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiPlus } from "react-icons/fi";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BookData, updateBookData } from "../../../../../store/bookSlice";
import Chip from "@/components/Chips/Chip";

interface FindBookProps {
  selectedLibraries: LibraryResult[];
  onAddLibrary: () => void;
}

interface ExistResult {
  exists: boolean;
  title?: string;
  link?: string;
}

interface AladinResult extends ExistResult {
  usedBook?: {
    available: boolean;
    link: string | null;
  };
}

interface BookstoreResults {
  [key: string]: ExistResult | AladinResult | null;
}

interface LibraryAvailability {
  exists: boolean;
  loanAvailable: boolean;
}

interface LibraryResults {
  [key: string]: LibraryAvailability;
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
  const [libraryResults, setLibraryResults] = useState<LibraryResults>({});
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

  useEffect(() => {
    const fetchLibraryData = async () => {
      if (!bookData) return;

      const results = await Promise.all(
        selectedLibraries.map(async (library) => {
          const response = await fetch(
            `/api/bookDetail/library?isbn=${bookData.isbn}&libCode=${library.libraryCode}`
          );
          const data = await response.json();
          console.log(`${library.libraryCode} API response:`, data);
          return { [library.libraryCode]: data };
        })
      );
      setLibraryResults(Object.assign({}, ...results));
    };

    fetchLibraryData();
  }, [bookData, selectedLibraries]);

  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>읽을 수 있는 곳</div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            {bookstoreResults.aladdin?.exists && (
              <>
                {bookstoreResults.aladdin.link && (
                  <a
                    href={bookstoreResults.aladdin.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <BookStoreIcon imageUrl='/IconAladdin.svg' width={48} />
                  </a>
                )}
                {(bookstoreResults.aladdin as AladinResult).usedBook?.available && (
                  <a
                    href={(bookstoreResults.aladdin as AladinResult).usedBook?.link || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <BookStoreIcon imageUrl='/IconAladdinUsed.svg' width={48} />
                  </a>
                )}
              </>
            )}
            {bookstoreResults.kyobo?.exists && bookstoreResults.kyobo.link && (
              <a
                href={bookstoreResults.kyobo.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BookStoreIcon imageUrl='/IconKyobo.svg' width={48} />
              </a>
            )}
            {bookstoreResults.yes24?.exists && bookstoreResults.yes24.link && (
              <a
                href={bookstoreResults.yes24.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <BookStoreIcon imageUrl='/IconYes24.svg' width={48} />
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
            {selectedLibraries.map((library) => {
              const availability = libraryResults[library.libraryCode];
              return (
                <div
                  key={library.libraryCode}
                  className='relative inline-flex flex-col items-center group'
                >
                  {availability?.exists ? (
                    <a
                      href={library.homepage}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <IconButton
                        icon={library.libraryName}
                        iconSize={48}
                        iconColor='white'
                        bgColor={availability.exists ? "success" : "secondary"}
                      />
                    </a>
                  ) : (
                    <IconButton
                      icon={library.libraryName}
                      iconSize={48}
                      iconColor='white'
                      bgColor='secondary'
                    />
                  )}
                  <div className='absolute -top-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Chip
                      label={availability?.exists ? "보유" : "미보유"}
                      textColor='text-white'
                      backgroundColor={
                        availability?.exists ? "bg-success" : "bg-secondary"
                      }
                    />
                  </div>
                </div>
              );
            })}
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
