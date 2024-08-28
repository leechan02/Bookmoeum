"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/libs/firebase/config";
import Link from "next/link";

export default function Nav() {
  const { user } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div className='h-[92px] flex px-28 py-4 justify-start items-center gap-6'>
      <Link href='/' className='flex grow shrink basis-0'>
        <img src='/Logo.svg' alt='logo' />
      </Link>
      <Link href='/mylibrary' className='font-medium'>
        내 서재
      </Link>
      {user ? (
        <button className='font-medium' onClick={handleLogout}>로그아웃</button>
      ) : (
        <Link href='/login' className='font-medium'>
          로그인
        </Link>
      )}
    </div>
  );
}
