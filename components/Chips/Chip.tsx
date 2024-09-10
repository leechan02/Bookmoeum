interface ChipProps {
  label: string;
  textColor?: string;
  backgroundColor?: string;
}

export default function Chip({ 
  label, 
  textColor = 'text-primary', 
  backgroundColor = 'bg-secondary' 
}: ChipProps) {
  return (
    <div className={`inline-flex justify-center items-center py-1 px-2 rounded-full ${backgroundColor}`}>
      <div className={`text-xs font-medium ${textColor} whitespace-nowrap`}>{label}</div>
    </div>
  );
}