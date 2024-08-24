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
      className={`border-b-2 cursor-pointer ${
        isActive ? "border-b-secondary" : "border-b-primary"
      }`}
      onClick={onClick}
    >
      <Icon
        className={`w-6 h-6 ${isActive ? "text-secondary" : "text-primary"}`}
      />
      <div
        className={`font-medium text-base ${
          isActive ? "text-secondary" : "text-primary"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
