"use client";

import Book from "./Book";

interface BookSliderProps {
  bookCover: string[];
  reverse?: boolean;
}

export default function BookSlider({
  reverse = false,
  bookCover,
}: BookSliderProps) {
  const extendedBookList = [...bookCover, ...bookCover];

  return (
    <div
      className={`flex gap-4 items-end ${
        reverse
          ? " justify-end animate-bookSlideRight"
          : " justify-start animate-bookSlideLeft"
      }`}
    >
      {extendedBookList.map((cover, index) => (
        <Book key={index} imageUrl={cover} width={120} />
      ))}
    </div>
  );
}
