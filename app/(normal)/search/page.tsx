"use client";

import { useSearchParams } from "next/navigation";
import SearchTabs from "./_components/SearchTabs";
import { useCallback, useEffect } from "react";
import BookList from "@/components/Book/BookList";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface SearchResult {
  title: string;
  author: string;
  image: string;
  publisher: string;
  isbn: string;
  description: string;
  link: string;
  pubdate: string;
}

interface SearchResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchResult[];
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";

  const fetchSearchResults = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }) => {
    const response = await fetch(
      `/api/search/naver?query=${encodeURIComponent(query)}&start=${pageParam}`
    );
    if (!response.ok) {
      throw new Error("API 요청 실패");
    }
    return response.json() as Promise<SearchResponse>;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: fetchSearchResults,
    getNextPageParam: (lastPage) => {
      const nextStart = lastPage.start + 1;
      return nextStart * 100 <= lastPage.total ? nextStart : undefined;
    },
    initialPageParam: 1,
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

  return (
    <div className='flex flex-col justify-center items-start gap-4 sm:gap-8'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>{query}</div>
      <SearchTabs />
      {status === "pending" ? (
        <div className='text-sm sm:text-base text-primary'>검색 중...</div>
      ) : status === "error" ? (
        <div className='text-sm sm:text-base text-primary'>
          에러: {(error as Error)?.message || "알 수 없는 오류"}
        </div>
      ) : (
        <>
          <div className='text-sm sm:text-base text-primary'>
            검색결과 {data?.pages[0]?.total || 0}
          </div>
          <BookList
            searchResults={data?.pages.flatMap((page) => page.items) || []}
          />
          {isFetchingNextPage && (
            <div className='text-sm sm:text-base'>로딩 중...</div>
          )}
          {!hasNextPage && (
            <div className='text-sm sm:text-base'>더 이상 결과가 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage(): JSX.Element {
  return (
    <div className='w-full max-w-[1440px] mx-auto'>
      <div className='px-6 md:px-8 lg:px-28 py-6 sm:py-8'>
        <SearchContent />
      </div>
    </div>
  );
}
