interface DescriptionSectionProps {
  description: string;
}

export default function DescriptionSection({
  description,
}: DescriptionSectionProps) {
  return (
    <div className='flex-col justify-start items-start gap-4 md:gap-6 inline-flex w-full'>
      <div className='text-primary text-base font-medium'>책소개</div>
      <div className='text-primary text-xs font-light'>{description}</div>
    </div>
  );
}
