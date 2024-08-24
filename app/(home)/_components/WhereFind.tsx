import { FiBook, FiBox, FiHome } from "react-icons/fi";

export default function WhereFind() {
  return (
    <div>
      <div>
        <div>책을 찾아볼 수 있는 곳</div>
        <div>
          <div>4 서점</div>
          <FiBook />
        </div>
        <div>
          <div>1,475 도서관</div>
          <FiHome />
        </div>
        <div>
          <div>2 전자책</div>
          <FiBox />
        </div>
      </div>
    </div>
  );
}
