"use client";

import SearchBar from "@/components/Input/SearchBar";

interface Book {
  title: string;
  cover: string;
  pubDate: string;
}

interface BestsellerResponse {
  item: Book[];
}

async function getBestseller(): Promise<BestsellerResponse> {
  const response = await fetch('/api/getBestseller');

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오지 못했습니다.");
  }

  const data = await response.json();
  return data as BestsellerResponse;
}

async function handleClick(query: string): Promise<void> {
  try {
    console.log(`검색어: ${query}`);
    const data = await getBestseller();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export default function Home(): JSX.Element {
  return (
    <>
      <header className='flex flex-col justify-center items-center gap-8 py-28'>
        <img
          src='/LogoIcon.svg'
          alt='logo Icon'
          className='w-24 h-24 text-primary'
        />
        <div className='flex flex-col gap-5 justify-center items-center'>
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
        {/* <div className="w-[584px] h-[60px] py-4 px-6"></div> */}
        <SearchBar onSearch={handleClick} />
      </header>
      <section className='py-28'></section>
    </>
  );
}
