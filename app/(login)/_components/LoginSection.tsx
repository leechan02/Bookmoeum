"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { auth } from "@/libs/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginSection() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

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
            반갑습니다!
          </div>
          <div className='flex-col justify-center items-center gap-5 inline-flex'>
            <div className='flex-col justify-start items-center gap-4 inline-flex'>
              <Button
                icon='/IconGoogle.svg'
                label='구글로 시작하기'
                variant='secondary'
                width={400}
                onClick={handleGoogleLogin}
              />
              <Button label='다른 옵션 없음' variant='secondary' width={400} />
            </div>
            <div className='inline-flex justify-center gap-1'>
              <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
              <div className='font-medium text-secondary text-base'>or</div>
              <div className='border-b-2 border-secondary w-48 mb-[10px]'></div>
            </div>
            <Input
              type='email'
              placeholder='이메일을 입력하세요'
              buttonLabel='계속'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
