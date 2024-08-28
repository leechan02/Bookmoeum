"use client";

import { withAuth } from "@/contexts/WithAuth";
import BookCoverSection from "../_components/BookCoverSection";
import LoginSection from "../_components/LoginSection";

function LoginPage() {
  return (
    <div className='flex w-full'>
      <LoginSection />
      <BookCoverSection />
    </div>
  );
}

export default withAuth(LoginPage);