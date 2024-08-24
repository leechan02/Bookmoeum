interface TabItemProps {
  label: string;
  Icon: React.ElementType;
}

export default function TabItem({ label, Icon }: TabItemProps) {
  return (
    <div className="border-b-2 border-b-primary">
      <Icon className='w-6 h-6' />
      <div className="text-primary font-medium text-base">{label}</div>
    </div>
  );
}

