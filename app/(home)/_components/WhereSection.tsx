import { FiBook, FiBox, FiHome } from "react-icons/fi";

export default function WhereSection() {
  return (
    <div className="flex justify-center items-center py-60">
      <div className="flex-col justify-center items-center gap-6 inline-flex">
        <div className="text-primary text-sm font-medium">책을 찾아볼 수 있는 곳</div>
        <div className="flex justify-center items-center gap-1">
          <div className="text-primary text-5xl font-bold">4 서점</div>
          <FiBook className="w-12 h-12 text-primary"/>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="text-primary text-5xl font-bold">1,475 도서관</div>
          <FiHome className="w-12 h-12 text-primary"/>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="text-primary text-5xl font-bold">2 전자책</div>
          <FiBox className="w-12 h-12 text-primary"/>
        </div>
      </div>
    </div>
  );
}
