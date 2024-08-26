"use client";

import Book from "@/components/Book/Book";
import Chip from "@/components/Chips/Chip";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { useEffect, useState } from "react";

interface BookDetailParams {
  params: { id: string };
}

interface BookData {
  title: string;
  author: string;
  cover: string;
  publisher: string;
  isbn13: string;
  categoryName: string;
  description: string;
  link: string;
  pubDate: string;
  subInfo: Array<{
    itemPage: number;
    subTitle: string;
  }>;
}

export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // const response = await fetch(`/api/bookDetail/aladdin/${params.id}`);
        const response = await fetch(`/data/bookDetail.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        console.log(data.item[0]);
        setBookData(data.item[0]);
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
    <div className=''>
      <div>
        <Book imageUrl={bookData.cover} width={240} />
        <div>
          <div>
            <div>{bookData.title}</div>
            <div>
              <div>{bookData.author}</div>
            </div>
            <div>
              <Chip label={bookData.publisher} />
              <Chip label={bookData.categoryName} />
              <Chip label={bookData.pubDate} />
            </div>
          </div>
          <BookStoreIcon imageUrl='/IconAladdin.svg' width={48} />
        </div>
      </div>
    </div>
  );
}
