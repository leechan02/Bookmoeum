"use client";

import { useSearchParams } from "next/navigation";
import SearchTabs from "./_components/SearchTabs";
import { useCallback, useEffect, useRef, useState } from "react";

interface SearchResult {
  title: string;
  author: string;
  cover: string;
}

export default function SearchPage(): JSX.Element {
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
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      const data = await response.json();
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
    <>
      <div className='flex-col justify-center items-center px-28 py-8 gap-8'>
        <div className='flex-col inline-flex justify-start items-start gap-4'>
          <div className='font-bold text-3xl text-primary'>{query}</div>
          <SearchTabs />
          {isLoading ? (
            <div>검색결과...</div>
          ) : (
            <div> 검색결과 {totalResults}</div>
          )}
          <div>
            {searchResults.map((result, index) => (
              <div
                key={index}
                ref={
                  index === searchResults.length - 1
                    ? lastResultElementRef
                    : null
                }
              >
                <div>{result.title}</div>
              </div>
            ))}
          </div>
          {isLoading && <div>로딩 중...</div>}
          {!hasMore && <div>더 이상 결과가 없습니다.</div>}
        </div>
      </div>
    </>
  );
}
