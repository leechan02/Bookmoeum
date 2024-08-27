import React from 'react';
import Book from "@/components/Book/Book";
import Chip from "@/components/Chips/Chip";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import ButtonIcon from "@/components/Icon/ButtonIcon";
import Button from "@/components/Button/Button";
import { FiBook, FiHeart, FiPlus } from "react-icons/fi";
import { ProcessedBookData } from '../page';

interface FirstSectionProps {
  bookData: ProcessedBookData;
}

export function FirstSection({ bookData }: FirstSectionProps) {
  return (
    <div className='flex justify-center items-center py-14'>
      <div className='flex justify-center items-start gap-40'>
        <Book imageUrl={bookData.cover} width={240} />
        <div className='flex-col justify-start items-start gap-20 inline-flex'>
          <div className='flex-col justify-center items-start gap-6 inline-flex'>
            <div className='text-3xl font-medium text-primary'>
              {bookData.processedTitle}
            </div>
            <div className='inline-flex justify-start items-center gap-4 px-1'>
              <div className='inline-flex justify-start items-center gap-1'>
                <span className='text-sm font-medium text-primary'>
                  {bookData.processedAuthor}
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
            <div className='inline-flex justify-start items-center gap-1'>
              <Chip label={bookData.publisher} />
              <Chip label={bookData.processedCategory} />
              <Chip label={bookData.pubDate} />
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-8 inline-flex">
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="text-xs font-regular text-grey-200">읽을 수 있는 곳</div>
              <div className="inline-flex justify-start items-center gap-4">
                <BookStoreIcon imageUrl="/IconAladdin.svg" width={48} />
                <BookStoreIcon imageUrl="/IconKyobo.svg" width={48} />
                <BookStoreIcon imageUrl="/IconYes24.svg" width={48} />
                <BookStoreIcon imageUrl="/IconYP.svg" width={48} />
                <BookStoreIcon imageUrl="/IconMille.svg" width={48} />
                <BookStoreIcon imageUrl="/IconRidi.svg" width={48} />
                <ButtonIcon Icon={FiPlus} iconSize={48} iconColor="white" bgColor="primary" />
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <ButtonIcon Icon={FiHeart} iconSize={40} iconColor="white" bgColor="secondary" />
              <Button Icon={FiBook} label="내 서재에 담기"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}