import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ElementType | string;
  variant?: "primary" | "secondary";
  width?: number | string;
  type?: "button" | "submit" | "reset";
  small?: boolean;
}

export default function Button({
  label,
  onClick,
  icon: Icon,
  variant = "primary",
  width,
  type = "button",
  small = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const baseClasses = `inline-flex justify-center items-center gap-2 rounded-full flex-shrink-0
    ${small ? 'py-1 px-3 text-sm' : 'py-2 px-4 text-base'}`;
  const colorClasses = isPrimary
    ? "bg-primary text-white hover:bg-hover"
    : "bg-transparent border-secondary border-2 text-primary hover:bg-secondary";

  // width가 제공된 경우에만 스타일을 적용
  const widthStyle = width
    ? { width: typeof width === "number" ? `${width}px` : width }
    : {};

  return (
    <button
      className={`${baseClasses} ${colorClasses}`}
      onClick={onClick}
      style={widthStyle}
      type={type}
    >
      {Icon &&
        (typeof Icon === "string" ? (
          <img src={Icon} className={`${small ? 'w-4 h-4' : 'w-6 h-6'} flex-shrink-0`} alt='' />
        ) : (
          <Icon className={`${small ? 'w-4 h-4' : 'w-6 h-6'} flex-shrink-0`} />
        ))}
      <span className={`font-medium ${small ? 'mt-0.5' : 'mt-0.5'}`}>{label}</span>
    </button>
  );
}