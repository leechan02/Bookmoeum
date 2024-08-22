"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  placeholder = "읽고 싶은 책을 검색해보세요",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-[584px] h-[60px] flex items-center px-6 py-4 rounded-full bg-secondary opacity-70'
    >
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className='w-full h-full bg-transparent outline-none'
      />
      <button onClick={handleSearch}>
        <FiSearch className='w-6 h-6 text-primary' />
      </button>
    </form>
  );
}
