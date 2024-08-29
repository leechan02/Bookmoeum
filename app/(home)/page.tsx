"use client";

import SearchBar from "@/components/Input/SearchBar";
import MoveBooks from "./_components/MoveBooks";
import WhereSection from "./_components/WhereSection";

export default function Home(): JSX.Element {
  return (
    <>
      <section className='flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 pt-8 md:pt-14 pb-4 sm:pb-5 md:pb-6'>
        <img
          src='/LogoIcon.svg'
          alt='logo Icon'
          className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary'
        />
        <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center items-center'>
          <div className='text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-normal sm:leading-normal md:leading-normal lg:leading-[72px]'>
            <span className='block sm:inline'>
              여러 사이트를
            </span>{" "}
            <span className="inline">돌아다닐 필요없이</span>
            <span className='block'>모든 책 검색은 책모음에서.</span>
          </div>
          <div className='text-center text-xs sm:text-base md:text-lg font-light text-grey-200 leading-normal sm:leading-relaxed md:leading-[27px]'>
            <span className='block'>도서관, 서점, 전자책 등</span>
            <span className='block'>
              읽고 싶은 책이 어디에 있는지 한눈에 확인하세요.
            </span>
          </div>
        </div>
      </section>
      <div className='flex justify-center items-center pt-4 pb-8 md:pb-14 sticky top-0 z-50'>
        <SearchBar />
      </div>
      <MoveBooks />
      <WhereSection />
    </>
  );
}
