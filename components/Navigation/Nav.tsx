import Link from "next/link";

export default function Nav() {
  return (
    <div className='sticky top-0 h-[92px] flex px-28 py-4 justify-start items-center gap-6'>
      <Link href='/' className="flex grow shrink basis-0">
        <img src='/Logo.svg' alt='logo' />
      </Link>
      <Link href='/mylibrary' className="font-medium">내 서재</Link>
      <Link href='/login' className="font-medium">로그인</Link>
    </div>
  );
}
