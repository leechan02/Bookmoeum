"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function AddBooksPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <button onClick={() => router.back()}>
        <FiArrowLeft />
      </button>
      <h1 className="font-bold text-primary font-mono text-2xl">This is add books page</h1>
    </div>
  );
}
