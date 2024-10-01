"use client";
import Book from "@/components/Book/Book";
import BookSlider from "@/components/Book/BookSlider";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오지 못했습니다.");
  }
  const data = await response.json();
  return data as BestsellerResponse;
}

// 배열을 n개씩 분할하는 함수
function splitArray<T>(array: T[], n: number): T[][] {
  return array.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / n);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // 새 청크 시작
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as T[][]);
}

export default function BooksBackground() {
  const { data } = useQuery<BestsellerResponse>({
    queryKey: ['bestseller'],
    queryFn: getBestseller,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  const bookCovers = data?.item.map((book) => book.cover) ?? [];
  
  // 10개씩 나눈 책 커버 배열
  const splitBookCovers = useMemo(() => splitArray(bookCovers, 10), [bookCovers]);

  return (
    <div className='flex gap-4 justify-center items-center h-screen overflow-hidden relative'>
      {[...Array(10)].map((_, index) => (
        <BookSlider 
          key={index}
          bookCover={splitBookCovers[index % splitBookCovers.length] || []} 
          direction='vertical' 
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}