"use client";

import SearchBar from "@/components/Input/SearchBar";

export default function Home() {
  return (
    <header className='flex flex-col justify-center items-center gap-8 py-28'>
      <img src='/LogoIcon.svg' alt='logo Icon' className='w-24 h-24 text-primary' />
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className="text-center text-5xl font-bold text-primary leading-[72px]">
          여러 사이트를 돌아다닐 필요없이
          <br />
          모든 책 검색은 책모음에서.
        </div>
        <div className="text-center text-lg font-light text-grey-200 leading-[27px]">
          도서관, 서점, 전자책 등<br />
          읽고 싶은 책이 어디에 있는지 한눈에 확인하세요.
        </div>
      </div>
      {/* <div className="w-[584px] h-[60px] py-4 px-6"></div> */}
      <SearchBar onSearch={(query) => console.log(query)} />
    </header>
  );
}
