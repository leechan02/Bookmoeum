"use client";

import Book from "./Book";

interface BookSliderProps {
  bookCover: string[];
  reverse?: boolean;
  direction?: 'horizontal' | 'vertical';
}

export default function BookSlider({
  reverse = false,
  bookCover,
  direction = 'horizontal',
}: BookSliderProps) {
  const extendedBookList = [...bookCover, ...bookCover];

  const getAnimationClass = () => {
    if (direction === 'horizontal') {
      return reverse ? 'animate-bookSlideRight' : 'animate-bookSlideLeft';
    } else {
      return reverse ? 'animate-bookSlideDown' : 'animate-bookSlideUp';
    }
  };

  return (
    <div
      className={`flex gap-4 ${
        direction === 'horizontal' ? 'flex-row' : 'flex-col'
      } items-end ${
        reverse ? 'justify-end' : 'justify-start'
      } ${getAnimationClass()}`}
    >
      {extendedBookList.map((cover, index) => (
        <Book key={index} imageUrl={cover} width={120} />
      ))}
    </div>
  );
}

