import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <div className='bg-primary py-6'>
      <div className="px-28 py-8 flex justify-between items-start">
        <div className='w-[263px] flex-col justify-start items-start gap-4 inline-flex'>
          <img
            src='/LogoIconDark.svg'
            alt='logoIcon'
            className='w-6 h-6 fill-secondary'
          />
          <div className='font-light text-secondary text-sm'>
            모든 독서생활은 이제 책모음과 함께하세요.
          </div>
        </div>
        <FiInstagram className='w-6 h-6 text-secondary' />
      </div>
      <div className='text-grey-200 font-light text-xs text-center'>
        © 책모음 2024. All right reserved.
      </div>
    </div>
  );
}
