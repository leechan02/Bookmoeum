import Link from "next/link";
import React from "react";

interface NavButtonProps {
  icon: React.ElementType | string;
  label: string;
  link: string;
}

export default function NavButton({ icon: Icon, label, link }: NavButtonProps) {
  return (
    <Link
      href={link}
      className='flex flex-col gap-1 justify-center items-center'
    >
      {typeof Icon === "string" ? (
        <img src={Icon} alt='icon' className='w-6 h-6' />
      ) : (
        <Icon className='w-6 h-6 text-white' />
      )}
      <div className='text-secondary font-regular text-xs'>{label}</div>
    </Link>
  );
}
