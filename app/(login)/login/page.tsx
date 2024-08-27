import BookCoverSection from "./_components/BookCoverSection";
import LoginSection from "./_components/LoginSection";

export default function LoginPage() {
  return (
    <div className="flex w-full">
      <LoginSection />
      <BookCoverSection />
    </div>
  );
}

