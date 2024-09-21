"use client";

import { useEffect, useState } from "react";
import Button from "../Button/Button";

interface InputProps {
  type: "text" | "email" | "password";
  placeholder: string;
  buttonLabel: string;
  onSubmit: (value: string) => void;
  error?: string | null;
}

export default function Input({
  type,
  placeholder,
  buttonLabel,
  onSubmit,
  error,
}: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [buttonWidth, setButtonWidth] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setButtonWidth(400);
      else setButtonWidth(300);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col justify-start items-center gap-4 w-full'
    >
      {error && <p className='text-error text-xs'>{error}</p>}
      <input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={`w-[300px] sm:w-[400px] px-4 py-2 rounded-full bg-secondary focus:outline-none ${
          error ? "ring-2 ring-error" : "focus:ring-2 focus:ring-primary"
        }`}
        />
      <Button label={buttonLabel} type='submit' width={buttonWidth} />
    </form>
  );
}
