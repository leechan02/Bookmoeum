interface TabItemProps {
  label: string;
  Icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

export default function TabItem({
  label,
  Icon,
  isActive,
  onClick,
}: TabItemProps) {
  return (
    <div
      className={`cursor-pointer flex items-center justify-center py-2 gap-2 ${
        isActive ? "border-b-primary border-b-2" : ""
      }`}
      onClick={onClick}
    >
      <Icon
        className={`w-6 h-6 ${isActive ? "text-primary" : "text-secondary"}`}
      />
      <div
        className={`font-medium text-base ${
          isActive ? "text-primary" : "text-secondary"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
