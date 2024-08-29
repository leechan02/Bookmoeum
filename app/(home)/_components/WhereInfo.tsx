interface WhereInfoProps {
  count: number | string;
  label: string;
  Icon: React.ElementType;
}

export default function WhereInfo({ count, label, Icon }: WhereInfoProps) {
  return (
    <div className='flex justify-center items-center gap-2 md:gap-4'>
      <div className='text-primary text-3xl md:text-5xl font-bold text-center md:text-left'>
        {count} {label}
      </div>
      <Icon className='w-8 h-8 md:w-12 md:h-12' />
    </div>
  );
}
