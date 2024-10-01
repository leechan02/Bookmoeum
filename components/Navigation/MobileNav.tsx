"use client";
import React, { useEffect, useState } from "react";
import NavButton from "../Button/NavButton";
import { FiBook, FiLogOut, FiUser } from "react-icons/fi";
import { logoutUser } from "@/utils/logout";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const [isAuth, setIsAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth");
        if (!response.ok) {
          throw new Error('Failed to fetch auth status');
        }
        const data = await response.json();
        setIsAuth(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuth(false);
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 400);
    };

    checkAuth();
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push('/');
    } else {
      console.error("로그아웃 실패");
      // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className='flex fixed bottom-0 bg-primary w-full justify-center items-center gap-16 py-2 rounded-t-2xl'>
      <NavButton icon='/images/LogoIconDark.svg' label='홈' link='/' />
      <NavButton icon={FiBook} label='내 서재' link='/mylibrary' />
      {isAuth ? (
        <NavButton icon={FiLogOut} label='로그아웃' onClick={handleLogout} />
      ) : (
        <NavButton icon={FiUser} label='로그인' link='/login' />
      )}
    </div>
  );
}
