import Chip from "@/components/Chips/Chip";

interface DetailSectionProps {
  category: string;
  page: number;
  isbn13: string;
}

export default function DetailSection({
  category,
  page,
  isbn13,
}: DetailSectionProps) {
  const pageString = page + "p";
  return (
    <div className='inline-flex justify-start items-center gap-4'>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>카테고리</div>
        <Chip label={category} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>페이지</div>
        <Chip label={pageString} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>ISBN13</div>
        <Chip label={isbn13} />
      </div>
    </div>
  );
}
