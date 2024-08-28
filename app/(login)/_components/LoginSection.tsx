"use client";

import Link from "next/link";
import LoginOption from "./LoginOption";
import { useEffect, useState } from "react";
import { isSignInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/libs/firebase/config";
import EmailLinkHandler from "./EmailLinkHandler";
import { checkEmailExists } from "@/utils/auth";

export default function LoginSection() {
  const handleSubmit = async (email: string) => {
    const isEmailExist = await checkEmailExists(email);

    isEmailExist ? console.log("Email exists") : console.log("Email does not exist");
  }

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
          <LoginOption handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}