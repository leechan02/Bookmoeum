"use client";
import Button from "@/components/Button/Button";
import { registerUser } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInSection({
  handleLogin,
}: {
  handleLogin: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
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

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Firebase의 기본 비밀번호 규칙
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    if (!validateEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      await registerUser(email, password);
      console.log("User registered successfully");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("이미 사용 중인 이메일 주소입니다.");
          break;
        case "auth/invalid-email":
          setEmailError("유효하지 않은 이메일 주소입니다.");
          break;
        case "auth/weak-password":
          setPasswordError(
            "비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요."
          );
          break;
        default:
          setGeneralError(
            "계정 생성 중 오류가 발생했습니다. 다시 시도해주세요."
          );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col justify-start items-center gap-4 w-full'
    >
      <div className='w-full max-w-[400px]'>
        {emailError && (
          <p className='text-error text-xs px-4 pb-2'>{emailError}</p>
        )}
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일을 입력하세요'
          className={`w-full px-4 py-2 rounded-full bg-secondary focus:outline-none ${
            emailError
              ? "ring-2 ring-error"
              : "focus:ring-2 focus:ring-primary"
          }`}
        />
      </div>
      <div className='w-full max-w-[400px]'>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호를 입력하세요'
          className={`w-full px-4 py-2 rounded-full bg-secondary focus:outline-none ${
            passwordError
              ? "ring-2 ring-error"
              : "focus:ring-2 focus:ring-primary"
          }`}
        />
        {passwordError && (
          <p className='text-error text-xs mt-1'>{passwordError}</p>
        )}
      </div>
      {generalError && <p className='text-error text-sm'>{generalError}</p>}
      <Button label='계속' type='submit' width={buttonWidth} />
      <button
        onClick={handleLogin}
        className='text-sm sm:text-base text-primary hover:underline'
      >
        로그인 화면으로 돌아가기
      </button>
    </form>
  );
}
