"use client";

import { useEffect, useState } from "react";

interface BookDetailParams {
  params: { id: string };
}

interface BookData {
  title: string;
  author: string;
  cover: string;
  isbn13: string;
}

export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`/api/bookDetail/aladdin/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        console.log(data);
        setBookData(data);
      } catch (err) {
        setError("Error fetching book data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bookData) return <div>No book data found</div>;

  return (
    <div className='h-screen'>
      <h1>{bookData.title}</h1>
      <p>Author: {bookData.author}</p>
      <p>ISBN13: {params.id}</p>
      {/* 필요한 다른 book 정보를 여기에 추가하세요 */}
    </div>
  );
}
