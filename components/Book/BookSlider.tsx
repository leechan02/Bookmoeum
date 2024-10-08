"use client";

import Link from "next/link";
import Book from "./Book";

interface Book {
  cover: string;
  isbn: string;
}
interface BookSliderProps {
  books: Book[];
  reverse?: boolean;
  direction?: "horizontal" | "vertical";
}

export default function BookSlider({
  reverse = false,
  books,
  direction = "horizontal",
}: BookSliderProps) {
  const extendedBookList = [...books, ...books];

  const getAnimationClass = () => {
    if (direction === "horizontal") {
      return reverse ? "animate-bookSlideRight" : "animate-bookSlideLeft";
    } else {
      return reverse ? "animate-bookSlideDown" : "animate-bookSlideUp";
    }
  };

  return (
    <div
      className={`flex gap-4 ${
        direction === "horizontal" ? "flex-row" : "flex-col"
      } items-end ${
        reverse ? "justify-end" : "justify-start"
      } ${getAnimationClass()}`}
    >
      {extendedBookList.map((book, index) => (
        <Link key={index} href={`/book/${book.isbn}`}>
          <Book imageUrl={book.cover} width={120} />
        </Link>
      ))}
    </div>
  );
}
