import Chip from "@/components/Chips/Chip";

interface DetailSectionProps {
  category: string;
  page: number;
  isbn: string;
  publisher: string;
  pubDate: string;
}

export default function DetailSection({
  category,
  page,
  isbn,
  publisher,
  pubDate,
}: DetailSectionProps) {
  const pageString = page + "p";
  return (
    <div className='inline-flex justify-start items-center gap-4 whitespace-nowrap min-w-max'>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>카테고리</div>
        <Chip label={category} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>페이지</div>
        <Chip label={pageString} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>출판사</div>
        <Chip label={publisher} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>출간일</div>
        <Chip label={pubDate} />
      </div>
      <div className='flex justify-start items-center gap-1'>
        <div className='text-xs text-primary font-medium'>ISBN13</div>
        <Chip label={isbn} />
      </div>
    </div>
  );
}