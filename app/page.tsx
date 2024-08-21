"use client";

import SearchBar from "@/components/Input/SearchBar";

export default function Home() {
  async function getBooks() {
    const API_URL = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.NEXT_PUBLIC_ALADDIN_API_KEY}&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101`;
    return fetch(API_URL)
      .then((res) => res.text()) // 응답을 텍스트로 받음
      .then((str) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "application/xml");
        return xmlDoc;
      });
  }

  async function handleSearch(query: string) {
    console.log(query);
    console.log(process.env.NEXT_PUBLIC_ALADDIN_API_KEY);
    const books = await getBooks();
    console.log(books);
  }

  return (
    <div className='flex justify-center'>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
