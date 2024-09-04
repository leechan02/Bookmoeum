"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { loginWithGoogle } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";

interface LoginOptionProps {
  handleEmailSubmit: (email: string) => void;
  onShowSignIn: () => void;
  emailError?: string | null;
}

export default function LoginOption({
  handleEmailSubmit,
  onShowSignIn,
  emailError,
}: LoginOptionProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [buttonWidth, setButtonWidth] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setButtonWidth(400);
      else setButtonWidth(300);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log("Google login successful");
      router.push("/");
    } catch (error: any) {
      console.error("Google login error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("로그인 창이 닫혔습니다. 다시 시도해 주세요.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setError("이미 로그인 창이 열려 있습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className='flex-col justify-center items-center gap-4 sm:gap-5 inline-flex w-full'>
      <div className='flex-col justify-start items-center gap-3 sm:gap-4 inline-flex w-full'>
        <Button
          icon='/IconGoogle.svg'
          label='구글로 시작하기'
          variant='secondary'
          width={buttonWidth}
          onClick={handleGoogleLogin}
        />
        <Button
          icon={FiMail}
          label='이메일로 회원가입'
          variant='secondary'
          width={buttonWidth}
          onClick={onShowSignIn}
        />
      </div>
      {error && <div className='text-red-500 text-sm'>{error}</div>}
      <div className='inline-flex justify-center gap-1'>
        <div className='border-b-2 border-secondary w-32 sm:w-48 mb-[10px]'></div>
        <div className='font-medium text-secondary text-sm sm:text-base'>or</div>
        <div className='border-b-2 border-secondary w-32 sm:w-48 mb-[10px]'></div>
      </div>
      <Input
        type='email'
        placeholder='이메일을 입력하세요'
        buttonLabel='계속'
        onSubmit={handleEmailSubmit}
        error={emailError}
      />
    </div>
  );
}
