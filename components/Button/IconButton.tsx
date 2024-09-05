import React from 'react';

interface IconButtonProps {
  icon: React.ElementType | string;
  iconSize: number;
  iconColor: string;
  bgColor: string;
  onClick?: () => void;
}

export default function IconButton({
  icon,
  iconSize,
  iconColor,
  bgColor,
  onClick,
}: IconButtonProps) {
  const isString = typeof icon === 'string';
  const firstLetter = isString ? icon.charAt(0) : '';
  const IconComponent = isString ? null : icon as React.ElementType;

  return (
    <button
      className={`rounded-full inline-flex justify-center items-center bg-${bgColor}`}
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
      }}
      onClick={onClick}
    >
      {isString ? (
        <span 
          className={`text-${iconColor} font-semibold flex items-center justify-center`}
          style={{
            fontSize: `${iconSize * 0.5}px`,
            width: '100%',
            height: '100%',
            lineHeight: 0,
            paddingTop: `${iconSize * 0.05}px`, // 미세 조정
          }}
        >
          {firstLetter}
        </span>
      ) : IconComponent && (
        <IconComponent
          className={`text-${iconColor}`}
          style={{
            width: "70%",
            height: "100%",
          }}
        />
      )}
    </button>
  );
}