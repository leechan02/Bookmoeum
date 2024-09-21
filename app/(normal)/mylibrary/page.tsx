"use client";
import { useEffect, useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  where,
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
import { withAuth } from "@/contexts/WithAuth";
import { SearchResult } from "../search/page";
import TabItemsBar from "@/components/Tab/TabItemsBar";
import { FiHeart } from "react-icons/fi";

const PAGE_SIZE = 10;

function MyLibraryContent() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchLikedBooks = async ({
    pageParam,
  }: {
    pageParam?: QueryDocumentSnapshot<DocumentData> | null;
  }) => {
    if (!user) throw new Error("User not authenticated");

    const likesRef = collection(db, `users/${user.uid}/likes`);
    let q = query(likesRef, orderBy("timestamp", "desc"), limit(PAGE_SIZE));

    if (pageParam) {
      q = query(q, startAfter(pageParam));
    }

    const snapshot = await getDocs(q);
    const books = snapshot.docs.map((doc) => ({
      ...doc.data(),
      isbn: doc.id,
    })) as SearchResult[];
    console.log(books);

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
  } = useInfiniteQuery({
    queryKey: ["likedBooks", user?.uid],
    queryFn: fetchLikedBooks,
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

  const tabs = [{ label: "위시리스트", Icon: FiHeart }];

  if (!user) {
    return (
      <div className='flex flex-col justify-start items-start gap-4 sm:gap-8 min-h-[calc(100vh-200px)]'>
        <div className='font-bold text-2xl sm:text-3xl text-primary'>
          내 서재
        </div>
        <TabItemsBar tabs={tabs} firstActive='위시리스트' />
        <div className='w-full flex-grow flex justify-center items-center'>
          <SearchCat />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-start items-start gap-4 sm:gap-8 min-h-[calc(100vh-200px)]'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>내 서재</div>
      <TabItemsBar tabs={tabs} firstActive='위시리스트' />
      {status === "pending" ? (
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
      <div className='px-6 md:px-8 lg:px-28 py-6 sm:py-8 flex-grow'>
        <MyLibraryContent />
      </div>
    </div>
  );
}
