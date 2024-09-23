"use client";

import BookCoverSection from "../_components/BookCoverSection";
import LoginSection from "../_components/LoginSection";

export default function LoginPage() {
  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen'>
      <div className='flex-grow flex items-center justify-center'>
        <LoginSection />
      </div>
      <div className='hidden md:block md:w-1/2'>
        <BookCoverSection />
      </div>
    </div>
  );
}
