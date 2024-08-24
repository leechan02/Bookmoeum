import { FiBook, FiBox, FiHome } from "react-icons/fi";
import WhereInfo from "./WhereInfo";

export default function WhereSection() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='grid place-items-center gap-6'>
        <div className='text-primary text-sm font-medium'>
          책을 찾아볼 수 있는 곳
        </div>
        <WhereInfo count={4} label='서점' Icon={FiBook} />
        <WhereInfo count='1,475' label='도서관' Icon={FiHome} />
        <WhereInfo count={2} label='전자책' Icon={FiBox} />
      </div>
    </div>
  );
}
