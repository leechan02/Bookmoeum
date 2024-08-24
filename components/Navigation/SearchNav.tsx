"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "../Input/SearchBar";

export default function SearchNav() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log(query);
    router.push(`/search?query=${query}`);
  };

  return (
    <div className='sticky top-0 h-[92px] flex px-8 py-4 justify-between items-center'>
      <Link href='/'>
        <img src='/Logo.svg' alt='logo' />
      </Link>
      <SearchBar onSearch={handleSearch} />
      <div className="flex gap-6">
        <Link href='/mylibrary' className="font-medium">내 서재</Link>
        <Link href='/login' className="font-medium">로그인</Link>
      </div>
    </div>
  );
}
