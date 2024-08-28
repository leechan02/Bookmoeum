"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { auth } from "@/libs/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { useRouter } from "next/navigation";

interface LoginOptionProps {
  handleSubmit: (email: string) => void;
}

export default function LoginOption({ handleSubmit }: LoginOptionProps) {
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}
