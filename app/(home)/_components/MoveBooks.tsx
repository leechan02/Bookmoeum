import Book from "@/components/Book/Book";
import BookSlider from "@/components/Book/BookSlider";
import { useEffect, useState } from "react";

interface Book {
  title: string;
  cover: string;
  pubDate: string;
}

interface BestsellerResponse {
  item: Book[];
}

async function getBestseller(): Promise<BestsellerResponse> {
  // const response = await fetch('/api/getBestseller');
  const response = await fetch("/data/bestseller.json");

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오지 못했습니다.");
  }

  const data = await response.json();
  return data as BestsellerResponse;
}

export default function MoveBooks() {
  const [bookCover, setBookCover] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBestseller() {
      try {
        const { item } = await getBestseller();
        console.log(item);
        setBookCover(item.map((book) => book.cover));
      } catch (error) {
        console.error(error);
      }
    }

    fetchBestseller();
  }, []);

  return (
    <section className='py-28 flex-col gap-8 overflow-hidden'>
      <BookSlider bookCover={bookCover} />
      <BookSlider bookCover={bookCover} reverse />
    </section>
  );
}
