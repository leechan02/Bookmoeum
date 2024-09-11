"use client";

import Link from "next/link";
import SearchBar from "../Input/SearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { logoutUser } from "@/utils/logout";
import { useRouter } from "next/navigation";

export default function SearchNav() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isColumn, setIsColumn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsColumn(window.innerWidth < 400);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      console.log("로그아웃 성공");
      router.push('/');
    } else {
      console.error("로그아웃 실패");
      // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <>
      <div className={isColumn ? "hidden" : "w-full max-w-[1440px] mx-auto"}>
        <div className='md:h-[80px] flex px-6 md:px-8 lg:px-28 pt-4 justify-between items-center'>
          <Link href='/' className='flex-shrink-0'>
            <img
              src={isMobile ? "/LogoIcon.svg" : "/Logo.svg"}
              alt='logo'
              className={isMobile ? "w-8 h-8" : ""}
            />
          </Link>

          {!isColumn && <SearchBar />}
          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6'>
            <Link
              href='/mylibrary'
              className='font-medium text-primary whitespace-nowrap'
            >
              내 서재
            </Link>
            {user ? (
              <button
                className='font-medium text-primary whitespace-nowrap'
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <Link
                href='/login'
                className='font-medium text-primary whitespace-nowrap'
              >
                로그인
              </Link>
            )}
          </div>
          {/* Mobile Menu Icon */}
          <button
            className='md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu size={32} />
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden px-4 py-2 bg-white shadow-md text-center'>
            <Link href='/mylibrary' className='block py-2 font-medium'>
              내 서재
            </Link>
            {user ? (
              <button
                className='block w-full text-center py-2 font-medium text-primary'
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <Link
                href='/login'
                className='block py-2 font-medium text-primary'
              >
                로그인
              </Link>
            )}
          </div>
        )}
      </div>
      <div
        className={
          isColumn
            ? "sticky top-0 flex justify-center items-center py-4 z-50"
            : "hidden"
        }
      >
        <SearchBar />
      </div>
    </>
  );
}
