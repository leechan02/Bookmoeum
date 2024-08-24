"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage(): JSX.Element {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "검색어를 입력해주세요";

  return (
    <>
    <div className="flex-col justify-center items-center px-28 py-8 gap-8">
      <div className="font-bold text-3xl text-primary">{query}</div>
    </div>
    </>
  );
}
