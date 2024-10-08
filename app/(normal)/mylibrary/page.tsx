"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "@/libs/firebase/config";
import BookList from "@/components/Book/BookList";
import SearchCat from "@/components/Loading/SearchCat";
import { SearchResult } from "../search/page";
import TabItemsBar from "@/components/Tab/TabItemsBar";
import { FiBook, FiHeart, FiPlus } from "react-icons/fi";
import Button from "@/components/Button/Button";

const PAGE_SIZE = 20;

function MyLibraryContent() {
  const [user, setUser] = useState(auth.currentUser);
  const [activeTab, setActiveTab] = useState("읽은책");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchResults, setSearchResults] = useState<{
    success: SearchResult[];
    failure: string[];
  }>({ success: [], failure: [] });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchBooks = async ({
    pageParam,
  }: {
    pageParam?: QueryDocumentSnapshot<DocumentData> | null;
  }) => {
    if (!user) throw new Error("User not authenticated");

    const collectionName = activeTab === "읽은책" ? "books" : "likes";
    const booksRef = collection(db, `users/${user.uid}/${collectionName}`);
    let q = query(booksRef, orderBy("timestamp", "desc"), limit(PAGE_SIZE));

    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const snapshot = await getDocs(q);
    const books = snapshot.docs.map((doc) => ({
      ...doc.data(),
      isbn: doc.id,
      timestamp: doc.data().timestamp?.toDate().toISOString(),
    })) as SearchResult[];

    return {
      books,
      nextCursor: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["likedBooks", activeTab, user?.uid],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    enabled: !!user,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        handleLoadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore]);

  const tabs = [
    { label: "읽은책", Icon: FiBook },
    { label: "위시리스트", Icon: FiHeart },
  ];

  const handleTabChange = (label: string) => {
    setActiveTab(label);
  };

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

  const searchBook = async (title: string) => {
    const response = await fetch(
      `/api/search/aladdin?query=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error("API 요청 실패");
    }
    const data = await response.json();
    return data.item[0]; // 첫 번째 검색 결과 반환
  };

  const processBooks = async (books: any[]) => {
    setIsLoading(true);
    setProgress(0);
    const successResults: SearchResult[] = [];
    const failureResults: string[] = [];

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      try {
        const searchResult = await searchBook(book.title);
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

    setSearchResults({ success: successResults, failure: failureResults });
    setShowConfirmation(true);
    setIsLoading(false);
  };

  const addBooksToFirebase = async () => {
    if (!user) return;

    const collectionName = activeTab === "읽은책" ? "books" : "likes";
    const booksRef = collection(db, `users/${user.uid}/${collectionName}`);

    setIsLoading(true);
    setProgress(0);

    for (let i = 0; i < searchResults.success.length; i++) {
      const book = searchResults.success[i];
      try {
        await addDoc(booksRef, {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          pubdate: book.pubdate,
          isbn: book.isbn,
          image: book.image,
          description: book.description,
          timestamp: new Date(),
        });
        setProgress(((i + 1) / searchResults.success.length) * 100);
      } catch (error) {
        console.error("Error adding book:", error);
      }
    }

    setIsLoading(false);
    setShowConfirmation(false);
    refetch();
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

  return (
    <div className='flex flex-col justify-start items-start gap-4 sm:gap-8 min-h-[calc(100vh-200px)]'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>내 서재</div>
      <div className='flex justify-between w-full'>
        <TabItemsBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <input
          type='file'
          accept='.csv'
          onChange={handleFileUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Button
          icon={FiPlus}
          variant='secondary'
          label='불러오기'
          small={true}
          onClick={handleImportClick}
        />
      </div>
      {isLoading && (
        <div className='w-full text-center'>
          <p>책을 불러오는 중입니다... {Math.round(progress)}%</p>
          <progress value={progress} max='100' className='w-full'></progress>
        </div>
      )}
      {!user || status === "pending" ? (
        <div className='w-full flex-grow flex justify-center items-center'>
          <SearchCat />
        </div>
      ) : status === "error" ? (
        <div className='text-sm sm:text-base text-primary'>
          에러: {(error as Error)?.message || "알 수 없는 오류"}
        </div>
      ) : (
        <>
          <div className='text-sm sm:text-base text-primary'>
            총 {data?.pages[0]?.books.length || 0}권의 책
          </div>
          <BookList
            searchResults={data?.pages.flatMap((page) => page.books) || []}
          />
          {isFetchingNextPage && (
            <div className='text-sm sm:text-base'>로딩 중...</div>
          )}
        </>
      )}
      {showConfirmation && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg max-w-lg w-full'>
            <h2 className='text-xl font-bold mb-4'>검색 결과 확인</h2>
            <p>성공: {searchResults.success.length}개</p>
            <p>실패: {searchResults.failure.length}개</p>
            <div className='mt-4 max-h-60 overflow-y-auto'>
              <h3 className='font-bold'>실패한 책 목록:</h3>
              <ul>
                {searchResults.failure.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            </div>
            <div className='mt-6 flex justify-end space-x-4'>
              <Button
                label='취소'
                variant='secondary'
                onClick={() => setShowConfirmation(false)}
              />
              <Button
                label='확인'
                variant='primary'
                onClick={addBooksToFirebase}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyLibraryPage() {
  return (
    <div className='w-full max-w-[1440px] mx-auto flex flex-col'>
      <div className='px-6 md:px-8 lg:px-28 py-6 sm:py-8 pb-20 flex-grow'>
        <MyLibraryContent />
      </div>
    </div>
  );
}
