interface WhereInfoProps {
  count: number | string;
  label: string;
  Icon: React.ElementType;
}

export default function WhereInfo({ count, label, Icon }: WhereInfoProps) {
  return (
    <div className='flex justify-center items-center gap-2'>
      <div className='text-primary text-5xl font-bold'>
        {count} {label}
      </div>
      <Icon className='w-12 h-12' />
    </div>
  );
}
