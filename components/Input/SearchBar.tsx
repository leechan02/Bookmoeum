"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuScanLine } from "react-icons/lu";

interface SearchBarProps {
  placeholder?: string;
  isBook?: boolean;
  onSubmit?: (query: string) => void;
  small?: boolean;
}

export default function SearchBar({
  placeholder = "읽고 싶은 책을 검색해보세요",
  isBook = true,
  onSubmit,
  small = false
}: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (isBook) {
      router.push(`/search?query=${query}`);
    } else {
      onSubmit && onSubmit(query);
    }
    setQuery("");
  };

  const formClasses = `
    w-full
    ${small ? 'max-w-[300px] h-[40px]' : 'max-w-[460px] lg:max-w-[584px] h-[52px] md:h-[60px]'}
    flex gap-2 items-center px-6 py-2 rounded-full bg-secondary opacity-95 mx-2
  `;

  const inputClasses = `
    w-full h-full bg-transparent outline-none 
    ${small ? 'text-xs' : 'text-sm md:text-base'}
    text-ellipsis
  `;

  const iconClasses = `
    ${small ? 'w-4 h-4' : 'w-6 h-6'}
    text-primary
  `;

  return (
    <form onSubmit={handleSubmit} className={formClasses}>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClasses}
      />
      <button type='submit'>
        <FiSearch className={iconClasses} />
      </button>
      <LuScanLine className={iconClasses} />
    </form>
  );
}