import { useState, useEffect } from "react";
import Book from "./Book";

interface BookDescriptionProps {
  title: string;
  author: string;
  imageUrl: string;
}

export default function BookDescription({
  title,
  author,
  imageUrl,
}: BookDescriptionProps) {
  const [bookWidth, setBookWidth] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setBookWidth(140);
      else setBookWidth(window.innerWidth >= 640 ? 120 : 100);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-start gap-2 w-[100px] sm:w-[120px]`}
    >
      <Book imageUrl={imageUrl} width={bookWidth} />
      <div className='flex flex-col justify-center items-start gap-1 w-full'>
        <div className='text-xs sm:text-sm font-medium text-primary truncate w-full'>
          {title}
        </div>
        <div className='text-xs font-light text-primary truncate w-full'>
          {author}
        </div>
      </div>
    </div>
  );
}
