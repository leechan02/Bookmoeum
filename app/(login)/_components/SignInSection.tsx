"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { auth } from "@/libs/firebase/config";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInSection() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted value:", email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='inline-flex justify-center items-center w-1/2 bg-white'>
      <div className='flex-col justify-center items-center inline-flex'>
        <div className='h-screen flex-col justify-center items-center gap-10 inline-flex'>
          <Link href='/'>
            <img src='/LogoIcon.svg' alt='logo' className='w-12 h-12' />
          </Link>
          <div className='text-center text-primary text-3xl font-medium'>
            어서오세요!
          </div>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-start items-center gap-4 w-full'
          >
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='이메일을 입력하세요'
              className='w-[400px] px-4 py-2 rounded-full bg-secondary focus:ring-2 focus:ring-primary focus:outline-none'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호를 입력하세요'
              className='w-[400px] px-4 py-2 rounded-full bg-secondary focus:ring-2 focus:ring-primary focus:outline-none'
            />
            <Button label='계속' type='submit' width={400} />
          </form>
        </div>
      </div>
    </div>
  );
}
