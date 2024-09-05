interface IconButtonProps {
  Icon: React.ElementType;
  iconSize: number;
  iconColor: string;
  bgColor: string;
  onClick?: () => void;
}

export default function IconButton({
  Icon,
  iconSize,
  iconColor,
  bgColor,
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={`rounded-full inline-flex justify-center items-center bg-${bgColor}`}
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
      }}
      onClick={onClick}
    >
      <Icon
        className={`text-${iconColor}`}
        style={{
          width: "70%",
          height: "100%",
        }}
      />
    </button>
  );
}
