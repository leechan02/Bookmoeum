"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import BookList from "@/components/Book/BookList";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchCat from "@/components/Loading/SearchCat";
import { FiBook } from "react-icons/fi";
import TabItemsBar from "@/components/Tab/TabItemsBar";
import BookSkeleton from "@/components/Book/BookSkeleton";

export interface SearchResult {
  title: string;
  author: string;
  image: string;
  publisher: string;
  isbn: string;
  description: string;
  link: string;
  pubdate: string;
  timestamp: string;
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
      const nextStart = lastPage.start + 100;
      return nextStart <= lastPage.total ? nextStart : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 30, // 30 minutes
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

  const tabs = [{ label: "도서", Icon: FiBook }];

  const searchResults = data?.pages.flatMap((page) => page.items) || [];
  const totalResults = data?.pages[0]?.total || 0;

  return (
    <div className='flex flex-col justify-start items-start gap-4 sm:gap-8 min-h-[calc(100vh-200px)]'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>{query}</div>
      <TabItemsBar
        tabs={tabs}
        activeTab='도서'
        onTabChange={() => console.log("test")}
      />
      <div className='text-sm sm:text-base text-primary'>
        검색결과 {totalResults}
      </div>
      {status === "pending" ? (
        <BookSkeleton count={20} />
      ) : status === "error" ? (
        <div className='text-sm sm:text-base text-primary'>
          에러: {(error as Error)?.message || "알 수 없는 오류"}
        </div>
      ) : searchResults.length === 0 ? (
        <div className="w-full flex-grow flex justify-center items-center">
          <div className='w-full flex flex-col items-center justify-center gap-2'>
            <p className='text-2xl sm:text-3xl text-primary font-bold'>
              이런! 책을 찾을 수가 없어요.
            </p>
            <p className='text-lg sm:text-xl text-primary'>
              제목을 다시 확인해주세요.
            </p>
          </div>
        </div>
      ) : (
        <>
          <BookList searchResults={searchResults} />
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
    <div className='w-full max-w-[1440px] mx-auto flex flex-col'>
      <div className='px-6 md:px-8 lg:px-28 py-6 sm:py-8 pb-20 flex-grow'>
        <Suspense>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
