import Link from "next/link";
import React from "react";

interface NavButtonProps {
  icon: React.ElementType | string;
  label: string;
  link?: string;
  onClick?: () => void;
}

function NavContent({ icon: Icon, label }: NavButtonProps) {
  return (
    <div className='flex flex-col gap-1 justify-center items-center w-12'>
      {typeof Icon === "string" ? (
        <img src={Icon} alt='icon' className='w-6 h-6' />
      ) : (
        <Icon className='w-6 h-6 text-secondary' />
      )}
      <div className='text-secondary font-regular text-xs'>{label}</div>
    </div>
  );
}

export default function NavButton({ icon, label, link, onClick }: NavButtonProps) {
  return link ? (
    <Link href={link}>
      <NavContent icon={icon} label={label} />
    </Link>
  ) : (
    <button onClick={onClick}>
      <NavContent icon={icon} label={label} />
    </button>
  );
}