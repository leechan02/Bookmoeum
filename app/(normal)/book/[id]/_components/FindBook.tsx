import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
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

interface LibraryAvailability {
  exists: boolean;
  loanAvailable: boolean;
}

const processTranslator = (author: string): string => {
  const translatorMatch = author.match(/\(지은이\)(.*?)\(옮긴이\)/);
  const trimSpecialChars = (str: string) =>
    str.replace(/^[^a-zA-Z가-힣]+|[^a-zA-Z가-힣]+$/g, "").trim();
  return translatorMatch ? trimSpecialChars(translatorMatch[1]) : "";
};

const processCategory = (category: string): string => {
  const parts = category.split(">");
  return parts.length >= 2 ? parts[1].trim() : category.trim();
};

const fetchBookstoreData = async (store: string, isbn: string) => {
  const response = await fetch(`/api/bookDetail/${store}?isbn=${isbn}`);
  return response.json();
};

const fetchRidiData = async (title: string) => {
  const response = await fetch(`/api/bookDetail/ridi?title=${encodeURIComponent(title)}`);
  return response.json();
};

const fetchLibraryData = async (isbn: string, libCode: string) => {
  const response = await fetch(`/api/bookDetail/library?isbn=${isbn}&libCode=${libCode}`);
  return response.json();
};

export default function FindBook({ selectedLibraries, onAddLibrary }: FindBookProps) {
  const dispatch = useDispatch();
  const bookData = useSelector((state: RootState) => state.book.selectedBook as BookData);

  const bookstoreQueries = useQueries({
    queries: ['kyobo', 'yes24', 'aladdin'].map(store => ({
      queryKey: ['bookstore', store, bookData?.isbn],
      queryFn: () => fetchBookstoreData(store, bookData?.isbn),
      enabled: !!bookData?.isbn,
    })),
  });

  const ridiQuery = useQuery({
    queryKey: ['bookstore', 'ridi', bookData?.processedTitle],
    queryFn: () => fetchRidiData(bookData?.processedTitle || ''),
    enabled: !!bookData?.processedTitle,
  });

  const libraryQueries = useQueries({
    queries: selectedLibraries.map(library => ({
      queryKey: ['library', library.libraryCode, bookData?.isbn],
      queryFn: () => fetchLibraryData(bookData?.isbn, library.libraryCode),
      enabled: !!bookData?.isbn,
    })),
  });

  // Aladdin data processing
  const aladinQuery = bookstoreQueries[2];
  React.useEffect(() => {
    if (aladinQuery.data?.exists) {
      const translator = processTranslator(aladinQuery.data.author || "");
      const processedCategory = processCategory(aladinQuery.data.category || "");
      dispatch(updateBookData({
        translator,
        category: processedCategory,
        page: aladinQuery.data.page,
      }));
    }
  }, [aladinQuery.data, dispatch]);

  const isLoading = bookstoreQueries.some(query => query.isLoading) || 
                    ridiQuery.isLoading ||
                    libraryQueries.some(query => query.isLoading);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>읽을 수 있는 곳</div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        {bookstoreQueries.map((query, index) => {
          const store = ['kyobo', 'yes24', 'aladdin'][index];
          const data = query.data as ExistResult | AladinResult;
          if (!data?.exists) return null;

          return (
            <React.Fragment key={store}>
              {data.link && (
                <a href={data.link} target='_blank' rel='noopener noreferrer' className='h-12'>
                  <BookStoreIcon imageUrl={`/Icon${store.charAt(0).toUpperCase() + store.slice(1)}.svg`} width={48} />
                </a>
              )}
              {store === 'aladdin' && (data as AladinResult).usedBook?.available && (
                <a href={(data as AladinResult).usedBook?.link || "#"} target='_blank' rel='noopener noreferrer' className='h-12'>
                  <BookStoreIcon imageUrl='/IconAladdinUsed.svg' width={48} />
                </a>
              )}
            </React.Fragment>
          );
        })}
        
        {ridiQuery.data?.exists && ridiQuery.data.link && (
          <a href={ridiQuery.data.link} target='_blank' rel='noopener noreferrer' className='h-12'>
            <BookStoreIcon imageUrl='/IconRidi.svg' width={48} />
          </a>
        )}

        {libraryQueries.map((query, index) => {
          const library = selectedLibraries[index];
          const availability = query.data as LibraryAvailability;
          return (
            <div key={library.libraryCode} className='relative inline-flex flex-col items-center group'>
              {availability?.exists ? (
                <a href={library.homepage} target='_blank' rel='noopener noreferrer'>
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
                  backgroundColor={availability?.exists ? "bg-success" : "bg-secondary"}
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
      </div>
    </div>
  );
}