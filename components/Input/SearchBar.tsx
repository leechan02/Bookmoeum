"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "읽고 싶은 책을 검색해보세요",
}: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-[460px] lg:max-w-[584px] h-[52px] md:h-[60px] flex items-center px-6 py-4 mx-6 rounded-full bg-secondary opacity-95'
    >
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full h-full bg-transparent outline-none text-sm md:text-base'
      />
      <button type='submit'>
        <FiSearch className='w-6 h-6 text-primary' />
      </button>
    </form>
  );
}
