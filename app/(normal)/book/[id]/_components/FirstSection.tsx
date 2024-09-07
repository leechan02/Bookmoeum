import React from "react";
import Book from "@/components/Book/Book";
import Chip from "@/components/Chips/Chip";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiBook, FiHeart, FiHome, FiPlus } from "react-icons/fi";
import { ProcessedBookData } from "../page";
import Button from "@/components/Button/Button";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";

interface FirstSectionProps {
  bookData: ProcessedBookData;
  onClick?: () => void;
  selectedLibraries: LibraryResult[];
  onRemoveLibrary?: (library: LibraryResult) => void;
}

export default function FirstSection({
  bookData,
  onClick,
  selectedLibraries,
  onRemoveLibrary,
}: FirstSectionProps) {
  return (
    <div className='flex flex-col justify-center items-center py-8 md:py-14 px-8'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full max-w-[900px] gap-8'>
        <div className='flex justify-center'>
          <Book imageUrl={bookData.image} width={240} />
        </div>
        <div className='flex-col justify-start items-start gap-10 md:gap-20 inline-flex w-full md:w-auto'>
          <div className='flex-col justify-center items-start gap-4 md:gap-6 inline-flex w-full'>
            <div className='text-xl md:text-3xl font-medium text-primary text-center md:text-left w-full'>
              {bookData.title}
            </div>
            <div className='inline-flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 px-1 w-full'>
              <div className='inline-flex justify-start items-center gap-1'>
                <span className='text-sm font-medium text-primary'>
                  {bookData.author}
                </span>
                <span className='text-sm font-light text-grey-200'>저</span>
              </div>
              {bookData.translator && (
                <div className='inline-flex justify-start items-center gap-1'>
                  <span className='text-sm font-medium text-primary'>
                    {bookData.translator}
                  </span>
                  <span className='text-sm font-light text-grey-200'>역</span>
                </div>
              )}
            </div>
            <div className='inline-flex flex-wrap justify-center md:justify-start items-center gap-1 w-full'>
              <Chip label={bookData.publisher} />
              {/* <Chip label={bookData.processedCategory} /> */}
              <Chip label={bookData.pubdate} />
            </div>
          </div>
          <div className='flex-col justify-start items-center md:items-start gap-6 md:gap-8 inline-flex w-full'>
            <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
              <div className='text-xs font-regular text-grey-200'>
                읽을 수 있는 곳
              </div>
              <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
                <BookStoreIcon imageUrl='/IconAladdin.svg' width={40} />
                <BookStoreIcon imageUrl='/IconKyobo.svg' width={40} />
                <BookStoreIcon imageUrl='/IconYes24.svg' width={40} />
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
                  onClick={onClick}
                />
              </div>
            </div>
            <div className='flex justify-center md:justify-start items-center gap-2 w-full'>
              <IconButton
                icon={FiHeart}
                iconSize={40}
                iconColor='white'
                bgColor='secondary'
              />
              <Button icon={FiBook} label='내 서재에 담기' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
