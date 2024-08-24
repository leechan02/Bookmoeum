import { IconType } from "react-icons";

interface WhereInfoProps {
  count: number | string;
  label: string;
  Icon: IconType;
}

export default function WhereInfo({ count, label, Icon }: WhereInfoProps) {
  return (
    <div className='flex justify-center items-center gap-1'>
      <div className='text-primary text-5xl font-bold'>
        {count} {label}
      </div>
      <Icon className='w-12 h-12 text-primary' />
    </div>
  );
}
