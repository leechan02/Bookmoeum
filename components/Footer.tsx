import { FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <div className='bg-primary py-4 sm:py-6'>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-28">
        <div className="py-4 sm:py-6 md:py-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
          <div className='w-full sm:w-[263px] flex flex-col justify-start items-center sm:items-start gap-4'>
            <img
              src='/LogoIconDark.svg'
              alt='logoIcon'
              className='w-6 h-6 fill-secondary'
            />
            <div className='font-light text-secondary text-sm text-center sm:text-left'>
              모든 독서생활은 이제 책모음과 함께하세요.
            </div>
          </div>
          <FiInstagram className='w-6 h-6 text-secondary' />
        </div>
        <div className='text-grey-200 font-light text-xs text-center pt-4 sm:pt-6'>
          © 책모음 2024. All right reserved.
        </div>
      </div>
    </div>
  );
}