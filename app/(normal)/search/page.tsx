"use client";

import SearchBar from "@/components/Input/SearchBar";
import { useSearchParams } from "next/navigation";

export default function SearchPage(): JSX.Element {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";

  return (
    <>
      <div className="font-bold text-3xl text-primary">{query}</div>
    </>
  );
}
