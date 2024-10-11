"use client";
import { useEffect, useState, useCallback } from "react";
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
} from "firebase/firestore";
import { auth, db } from "@/libs/firebase/config";
import BookList from "@/components/Book/BookList";
import SearchCat from "@/components/Loading/SearchCat";
import { SearchResult } from "../search/page";
import TabItemsBar from "@/components/Tab/TabItemsBar";
import { FiBook, FiHeart, FiPlus } from "react-icons/fi";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 20;

function MyLibraryContent() {
  const [user, setUser] = useState(auth.currentUser);
  const [activeTab, setActiveTab] = useState("읽은책");
  const router = useRouter();

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
    refetch, // refetch 함수 추가
  } = useInfiniteQuery({
    queryKey: ["likedBooks", activeTab, user?.uid],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    enabled: !!user,
  });

  // activeTab이 변경될 때 데이터를 다시 불러오는 useEffect 추가
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [activeTab, user, refetch]);

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

  const handleImportClick = () => {
    router.push("/addbooks");
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
        <Button
          icon={FiPlus}
          variant='secondary'
          label='불러오기'
          small={true}
          onClick={handleImportClick}
        />
      </div>
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