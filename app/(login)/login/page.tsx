"use client";

import { useState } from "react";
import BookCoverSection from "../_components/BookCoverSection";
import LoginSection from "../_components/LoginSection";
import { checkEmailExists } from "@/utils/auth";
import SignInSection from "../_components/SignInSection";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleEmailCheck = async (inputEmail: string) => {
    const exists = await checkEmailExists(inputEmail);
    setShowSignIn(!exists);
  };

  return (
    <div className='flex w-full'>
      {showSignIn ? (
        <SignInSection />
      ) : (
        <LoginSection onEmailCheck={handleEmailCheck} />
      )}
      <BookCoverSection />
    </div>
  );
}
