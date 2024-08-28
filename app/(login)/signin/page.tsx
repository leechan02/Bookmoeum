import BookCoverSection from "../_components/BookCoverSection";
import SignInSection from "../_components/SignInSection";

export default function SignInPage() {
  return (
    <div className="flex w-full">
      <SignInSection />
      <BookCoverSection />
    </div>
  );
}

