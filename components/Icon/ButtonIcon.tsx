interface ButtonIconProps {
  Icon: React.ElementType;
  iconSize: number;
  iconColor: string;
  bgColor: string;
}

export default function ButtonIcon({ Icon, iconSize, iconColor, bgColor }: ButtonIconProps) {
  return (
    <div 
      className={`rounded-full inline-flex justify-center items-center bg-${bgColor}`}
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
      }}
    >
      <Icon 
        className={`text-${iconColor}`}
        style={{
          width: '70%',
          height: '100%',
        }}
      />
    </div>
  );
}