"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import Button from "@/components/Button/Button";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase/config";
import BookList from "@/components/Book/BookList";
import { SearchResult } from "@/app/(normal)/search/page";

export default function AddBooksPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [failedBooks, setFailedBooks] = useState<string[]>([]);

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0]
      .split(",")
      .map((header) => header.trim().toLowerCase());

    const titleIndex = headers.findIndex((h) => ["제목", "title"].includes(h));
    const authorIndex = headers.findIndex((h) =>
      ["작가", "author"].includes(h)
    );

    if (titleIndex === -1 || authorIndex === -1) {
      throw new Error("CSV 파일에서 제목 또는 작가 열을 찾을 수 없습니다.");
    }

    return lines
      .slice(1)
      .map((line) => {
        const values = line.split(",");
        return {
          title: values[titleIndex]?.trim() || "",
          author: values[authorIndex]?.trim() || "",
        };
      })
      .filter((book) => book.title && book.author); // 빈 항목 제거
  };

  const searchBook = async (title: string, author: string) => {
    const response = await fetch(
      `/api/search/aladdin?query=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("API 요청 실패");
    }
    const data = await response.json();
    // 제목과 저자가 일치하는 항목 찾기
    const matchingItem = data.item.find(
      (item: { title: string; author: string }) =>
        item.title.toLowerCase().includes(title.toLowerCase()) &&
        item.author.toLowerCase().includes(author.toLowerCase())
    );

    // 일치하는 항목이 없으면 제목만 일치하는 첫 번째 항목 반환
    return (
      matchingItem ||
      data.item.find((item: { title: string }) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      ) ||
      null
    );
  };

  const processBooks = async (books: any[]) => {
    setIsLoading(true);
    setProgress(0);
    const successResults: SearchResult[] = [];
    const failureResults: string[] = [];

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      try {
        const searchResult = await searchBook(book.title, book.author);
        if (searchResult) {
          successResults.push(searchResult);
        } else {
          failureResults.push(book.title);
        }
      } catch (error) {
        console.error("Error searching book:", error);
        failureResults.push(book.title);
      }
      setProgress(((i + 1) / books.length) * 100);
    }

    setSearchResults(successResults);
    setFailedBooks(failureResults);
    setIsLoading(false);
  };

  const addBooksToFirebase = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    for (let i = 0; i < searchResults.length; i++) {
      const book = searchResults[i];
      try {
        const bookRef = doc(db, `users/${user.uid}/books/${book.isbn13}`);
        await setDoc(bookRef, {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          pubdate: book.pubDate,
          isbn: book.isbn13,
          image: book.cover,
          description: book.description,
          timestamp: new Date(),
        });
        setProgress(((i + 1) / searchResults.length) * 100);
      } catch (error) {
        console.error("책 추가 중 오류 발생:", error);
      }
    }

    setIsLoading(false);
    router.push("/mylibrary");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          try {
            const books = parseCSV(text);
            await processBooks(books);
          } catch (error) {
            console.error("CSV 파싱 오류:", error);
            alert(
              "CSV 파일 형식이 올바르지 않습니다. 제목과 작가 열이 있는지 확인해주세요."
            );
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveBook = (isbn13: string) => {
    setSearchResults((prevResults) =>
      prevResults.filter((book) => book.isbn13 !== isbn13)
    );
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-8 p-4'>
      <button onClick={() => router.back()} className='absolute top-4 left-4'>
        <FiArrowLeft size={24} />
      </button>
      {searchResults.length == 0 && (
        <>
          <h1 className='font-bold text-primary font-mono text-2xl'>
            책 불러오기
          </h1>
          <input
            type='file'
            accept='.csv'
            onChange={handleFileUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Button
            icon={FiUpload}
            variant='primary'
            label='CSV 파일 불러오기'
            onClick={handleImportClick}
          />
        </>
      )}
      {isLoading && (
        <div className='w-full max-w-md text-center'>
          <p>책을 불러오는 중입니다... {Math.round(progress)}%</p>
          <progress value={progress} max='100' className='w-full'></progress>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className='w-full'>
          <h2 className='text-xl font-bold mb-4'>검색 결과 확인</h2>
          <p>성공: {searchResults.length}개</p>
          <p>실패: {failedBooks.length}개</p>
          <BookList
            searchResults={searchResults}
            onRemove={handleRemoveBook}
            showRemoveButton={true}
          />
          <div className='mt-6 flex justify-end space-x-4'>
            <Button
              label='취소'
              variant='secondary'
              onClick={() => router.back()}
            />
            <Button
              label='확인'
              variant='primary'
              onClick={addBooksToFirebase}
            />
          </div>
        </div>
      )}
      {failedBooks.length > 0 && (
        <div className='w-full'>
          <h3 className='font-bold'>실패한 책 목록:</h3>
          <ul>
            {failedBooks.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
