"use client";
import React, { useEffect, useState } from "react";
import NavButton from "../Button/NavButton";
import { FiBook, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/libs/firebase/config";

export default function MobileNav() {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 400);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (!isMobile) return null;

  return (
    <div className='flex fixed bottom-0 bg-primary w-full justify-center items-center gap-16 py-2 rounded-t-2xl'>
      <NavButton icon='/LogoIconDark.svg' label='홈' link='/' />
      <NavButton icon={FiBook} label='내 서재' link='/mylibrary' />
      {user ? (
        <NavButton icon={FiLogOut} label='로그아웃' onClick={handleLogout} />
      ) : (
        <NavButton icon={FiUser} label='로그인' link='/login' />
      )}
    </div>
  );
}
