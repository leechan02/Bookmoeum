"use client";

import { useSearchParams } from "next/navigation";
import SearchTabs from "./_components/SearchTabs";
import { useEffect, useState } from "react";

interface SearchResult {
  title: string;
  author: string;
  cover: string;
}

export default function SearchPage(): JSX.Element {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query === "검색어를 입력해주세요") return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
          throw new Error("API 요청 실패");
        }
        const data = await response.json();
        console.log(data);
        setSearchResult(data.item || []);
        console.log(searchResult);
      } catch (error) {
        console.error("검색 결과 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <>
      <div className='flex-col justify-center items-center px-28 py-8 gap-8'>
        <div className='flex-col inline-flex justify-start items-start gap-4'>
          <div className='font-bold text-3xl text-primary'>{query}</div>
          <SearchTabs />
          {isLoading ? (
            <div>로딩 중...</div>
          ) : (
            <div>
              {searchResult.map((result, index) => (
                <div key={index}>
                  <div>{result.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
