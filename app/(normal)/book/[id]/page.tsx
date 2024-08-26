"use client";

import Book from "@/components/Book/Book";
import Button from "@/components/Button/Button";
import Chip from "@/components/Chips/Chip";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import ButtonIcon from "@/components/Icon/ButtonIcon";
import { useEffect, useState } from "react";
import { FiBook, FiPlus } from "react-icons/fi";

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

interface ProcessedBookData extends BookData {
  processedTitle: string;
  processedAuthor: string;
  translator: string;
}

const processTitle = (title: string): string => {
  const specialChars = ["(", "-", ":", "·"];
  for (let char of specialChars) {
    const index = title.indexOf(char);
    if (index !== -1) {
      return title.substring(0, index).trim();
    }
  }
  return title.trim();
};

const processAuthorAndTranslator = (
  author: string
): { author: string; translator: string } => {
  const authorMatch = author.match(/(.*?)\s*\(지은이\)/);
  const translatorMatch = author.match(/\(지은이\)(.*?)\(옮긴이\)/);

  const trimSpecialChars = (str: string) => 
    str.replace(/^[^a-zA-Z가-힣]+|[^a-zA-Z가-힣]+$/g, '').trim();

  return {
    author: authorMatch ? trimSpecialChars(authorMatch[1]) : trimSpecialChars(author),
    translator: translatorMatch ? trimSpecialChars(translatorMatch[1]) : "",
  };
};

export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<ProcessedBookData | null>(null);
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
        const rawBookData = data.item[0];

        console.log(rawBookData);
        const { author, translator } = processAuthorAndTranslator(
          rawBookData.author
        );

        setBookData({
          ...rawBookData,
          processedTitle: processTitle(rawBookData.title),
          processedAuthor: author,
          translator: translator,
        });
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
    <div className='flex justify-center items-center py-14'>
      <div className='flex justify-center items-start gap-40'>
        <Book imageUrl={bookData.cover} width={240} />
        <div>
          <div>{bookData.processedTitle}</div>
          <div>
            <div>{bookData.processedAuthor}</div>
            {bookData.translator && <div>{bookData.translator}</div>}
          </div>
          <div>
            <Chip label={bookData.publisher} />
            <Chip label={bookData.categoryName} />
            <Chip label={bookData.pubDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
