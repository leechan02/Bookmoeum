"use client";

import Link from "next/link";
import LoginOption from "./LoginOption";

interface LoginSectionProps {
  onEmailCheck: (email: string) => void;
}

export default function LoginSection({ onEmailCheck }: LoginSectionProps) {
  return (
    <div className='inline-flex justify-center items-center w-1/2 bg-white'>
      <div className='flex-col justify-center items-center inline-flex'>
        <div className='h-screen flex-col justify-center items-center gap-10 inline-flex'>
          <Link href='/'>
            <img src='/LogoIcon.svg' alt='logo' className='w-12 h-12' />
          </Link>
          <div className='text-center text-primary text-3xl font-medium'>
            반갑습니다!
          </div>
          <LoginOption onEmailCheck={onEmailCheck} />
        </div>
      </div>
    </div>
  );
}
