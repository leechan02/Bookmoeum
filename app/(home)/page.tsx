"use client";

import SearchBar from "@/components/Input/SearchBar";
import MoveBooks from "./_components/MoveBooks";
import { useRouter } from "next/navigation";

export default function Home(): JSX.Element {
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log(query);
    router.push(`/search`);
  };

  return (
    <>
      <header className='flex flex-col justify-center items-center gap-8 pt-14 pb-6'>
        <img
          src='/LogoIcon.svg'
          alt='logo Icon'
          className='w-24 h-24 text-primary'
        />
        <div className='flex flex-col gap-6 justify-center items-center'>
          <div className='text-center text-5xl font-bold text-primary leading-[72px]'>
            여러 사이트를 돌아다닐 필요없이
            <br />
            모든 책 검색은 책모음에서.
          </div>
          <div className='text-center text-lg font-light text-grey-200 leading-[27px]'>
            도서관, 서점, 전자책 등<br />
            읽고 싶은 책이 어디에 있는지 한눈에 확인하세요.
          </div>
        </div>
      </header>
      <div className='flex justify-center items-center pt-4 pb-14 sticky top-0 z-50'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <MoveBooks />
    </>
  );
}
