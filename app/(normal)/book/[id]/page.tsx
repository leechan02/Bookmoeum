"use client";

import { useEffect, useState } from "react";
import FirstSection from "./_components/FirstSection";
import SecondSection from "./_components/SecondSection";

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
  subInfo: {
    itemPage: number;
    subTitle: string;
  };
}

export interface ProcessedBookData extends BookData {
  processedTitle: string;
  processedAuthor: string;
  translator: string;
  processedCategory: string;
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
    str.replace(/^[^a-zA-Z가-힣]+|[^a-zA-Z가-힣]+$/g, "").trim();

  return {
    author: authorMatch
      ? trimSpecialChars(authorMatch[1])
      : trimSpecialChars(author),
    translator: translatorMatch ? trimSpecialChars(translatorMatch[1]) : "",
  };
};

const processCategory = (category: string): string => {
  const parts = category.split(">");
  console.log(parts);
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return category.trim();
};

export default function BookDetail({ params }: BookDetailParams) {
  const [bookData, setBookData] = useState<ProcessedBookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`/api/bookDetail/aladdin/${params.id}`);
        // const response = await fetch(`/data/bookDetail.json`);
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
          processedCategory: processCategory(rawBookData.categoryName),
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
    <>
      <FirstSection bookData={bookData} />
      <SecondSection bookData={bookData} />
    </>
  );
}
