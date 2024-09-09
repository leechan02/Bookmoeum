"use client";

import { useSearchParams } from "next/navigation";
import SearchTabs from "./_components/SearchTabs";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import BookList from "@/components/Book/BookList";

export interface SearchResult {
  title: string;
  author: string;
  // cover: string;
  image: string;
  // isbn13: string;
  isbn: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "검색어를 입력해주세요");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const newQuery = searchParams.get("query") || "검색어를 입력해주세요";
    if (newQuery !== query) {
      setQuery(newQuery);
      setSearchResults([]);
      setPage(1);
      setHasMore(true);
    }
  }, [searchParams, query]);

  const lastResultElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchSearchResults = useCallback(async () => {
    if (query === "검색어를 입력해주세요" || isLoading || !hasMore) return;
    
    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(true);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // const response = await fetch(
      //   `/api/search/aladdin?query=${encodeURIComponent(query)}&start=${
      //     (page - 1) * 10 + 1
      //   }`,
      //   { signal }
      // );
      const response = await fetch(
        `/api/search/naver?query=${encodeURIComponent(query)}&start=${
          (page - 1) * 10 + 1
        }`,
        { signal }
      );
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      const data = await response.json();
      setSearchResults(prevResults => {
        // const newResults = [...prevResults, ...data.item];
        const newResults = [...prevResults, ...data.items];
        // setHasMore(newResults.length < data.totalResults);
        setHasMore(newResults.length < data.total);
        return newResults;
      });
      // setTotalResults(data.totalResults);
      setTotalResults(data.total);
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error("검색 결과 가져오기 실패:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div className='flex flex-col justify-center items-start gap-4 sm:gap-8'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>
        {query}
      </div>
      <SearchTabs />
      {isLoading ? (
        <div className='text-sm sm:text-base text-primary'>검색결과</div>
      ) : (
        <div className='text-sm sm:text-base text-primary'> 검색결과 {totalResults}</div>
      )}
      <BookList
        searchResults={searchResults}
        lastResultElementRef={lastResultElementRef}
      />
      {isLoading && <div className='text-sm sm:text-base'>로딩 중...</div>}
      {!hasMore && (
        <div className='text-sm sm:text-base'>더 이상 결과가 없습니다.</div>
      )}
    </div>
  );
}

export default function SearchPage(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 400);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className='w-full max-w-[1440px] mx-auto'>
      <div className={isMobile ? 'px-6 py-0' : 'px-6 md:px-8 lg:px-28 py-6 sm:py-8'}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
