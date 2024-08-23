"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage(): JSX.Element {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";

  return (
    <div>
      {query}
    </div>
  );
}

