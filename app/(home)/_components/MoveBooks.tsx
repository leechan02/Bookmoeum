import Book from "@/components/Book/Book";
import BookSlider from "@/components/Book/BookSlider";
import { useQuery } from "@tanstack/react-query";
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
  const response = await fetch('/api/getBestseller');
  // const response = await fetch("/data/bestseller.json");

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오지 못했습니다.");
  }

  const data = await response.json();
  return data as BestsellerResponse;
}

export default function MoveBooks() {
  const {data} = useQuery<BestsellerResponse>({
    queryKey: ['bestseller'],
    queryFn: getBestseller,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  })

  const bookCover = data?.item.map((book) => book.cover) ?? [];

  return (
    <section className='py-4 md:py-14 flex flex-col gap-6 overflow-hidden'>
      <BookSlider bookCover={bookCover} />
      <BookSlider bookCover={bookCover} reverse />
    </section>
  );
}
