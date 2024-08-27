interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: React.ElementType | string;
  variant?: "primary" | "secondary";
  width?: number | string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  label,
  onClick,
  icon: Icon,
  variant = "primary",
  width,
  type = "button",
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const baseClasses =
    "inline-flex justify-center items-center gap-2 py-2 px-4 rounded-full";
  const colorClasses = isPrimary
    ? "bg-primary text-white"
    : "bg-transparent border-secondary border-2 text-primary";

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
          <img src={Icon} className='w-6 h-6 flex-shrink-0' alt='' />
        ) : (
          <Icon className='w-6 h-6 flex-shrink-0' />
        ))}
      <span className='font-medium text-base mt-0.5'>{label}</span>
    </button>
  );
}
