"use client";

import { useSearchParams } from "next/navigation";
import SearchTabs from "./_components/SearchTabs";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import BookList from "@/components/Book/BookList";

export interface SearchResult {
  title: string;
  author: string;
  cover: string;
  isbn13: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
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

  const fetchSearchResults = async () => {
    if (query === "검색어를 입력해주세요" || isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}&start=${
          (page - 1) * 10 + 1
        }`
      );
      // const response = await fetch(`/data/bookSearch.json`);
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      const data = await response.json();
      console.log(data);
      setSearchResults((prevResults) => [...prevResults, ...data.item]);
      setTotalResults(data.totalResults);
      setHasMore(searchResults.length + data.item.length < data.totalResults);
    } catch (error) {
      console.error("검색 결과 가져오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSearchResults([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [query, page]);


  return (
    <div className='flex flex-col justify-center items-start gap-6 sm:gap-8'>
      <div className='font-bold text-2xl sm:text-3xl text-primary'>
        {query}
      </div>
      <SearchTabs />
      {isLoading ? (
        <div className='text-sm sm:text-base'>검색결과</div>
      ) : (
        <div className='text-sm sm:text-base'> 검색결과 {totalResults}</div>
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
  return (
    <div className='w-full max-w-[1440px] mx-auto'>
      <div className='px-4 sm:px-6 md:px-8 lg:px-28 py-6 sm:py-8'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
