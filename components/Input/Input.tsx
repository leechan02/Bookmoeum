"use client";

import { useState } from 'react';
import Button2 from "../Button/Button2";

interface InputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  buttonLabel: string;
}

export default function Input({ type, placeholder, buttonLabel }: InputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 폼 제출 로직을 추가하세요
    console.log('Submitted value:', inputValue);
    // 예: API 호출 또는 다른 처리
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-center gap-4 w-full max-w-md mx-auto p-4"
    >
      <input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-[400px] px-4 py-2 rounded-full bg-secondary focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <Button2 label={buttonLabel}/>
    </form>
  );
}