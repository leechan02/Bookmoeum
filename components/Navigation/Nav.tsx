"use client";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/libs/firebase/config";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

export default function Nav() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="h-[80px] flex px-6 md:px-8 lg:px-28 py-4 justify-between items-center">
        <Link href="/" className="flex-shrink-0">
          <img 
            src={isMobile ? "/LogoIcon.svg" : "/Logo.svg"} 
            alt="logo"
            className={isMobile ? "w-8 h-8" : ""}
          />
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
          <FiMenu size={32} />
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white shadow-md text-center">
          <Link href="/mylibrary" className="block py-2 font-medium">
            내 서재
          </Link>
          {user ? (
            <button className="block w-full text-center py-2 font-medium" onClick={handleLogout}>로그아웃</button>
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