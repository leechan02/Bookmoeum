interface DescriptionSectionProps {
  description: string;
}

export default function DescriptionSection({
  description,
}: DescriptionSectionProps) {
  return (
    <div className='flex-col justify-start items-start gap-6 inline-flex'>
      <div className='text-primary text-base font-medium'>책소개</div>
      <div className='text-primary text-xs font-light'>{description}</div>
    </div>
  );
}
