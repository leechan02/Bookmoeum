"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/libs/firebase/config";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Nav() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="h-[64px] md:h-[92px] flex px-6 md:px-8 lg:px-28 py-4 justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <img src="/Logo.svg" alt="logo" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/mylibrary" className="font-medium">
            내 서재
          </Link>
          {user ? (
            <button className="font-medium" onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link href="/login" className="font-medium">
              로그인
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white shadow-md text-center">
          <Link href="/mylibrary" className="block py-2 font-medium">
            내 서재
          </Link>
          {user ? (
            <button className="block w-full text-left py-2 font-medium" onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link href="/login" className="block py-2 font-medium">
              로그인
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
