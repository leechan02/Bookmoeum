"use client";

import { useState } from 'react';
import Button from '../Button/Button';

interface InputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  buttonLabel: string;
  onSubmit: (value: string) => void;
}

export default function Input({ type, placeholder, buttonLabel, onSubmit }: InputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted value:', inputValue);
    onSubmit(inputValue);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-center gap-4 w-full"
    >
      <input
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-[400px] px-4 py-2 rounded-full bg-secondary focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <Button label={buttonLabel} type="submit" width={400} />
    </form>
  );
}