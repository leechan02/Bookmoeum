import Book from "./Book";

interface BookDescriptionProps {
  title: string;
  author: string;
  imageUrl: string;
}

export default function BookDescription({
  title,
  author,
  imageUrl,
}: BookDescriptionProps) {
  return (
    <div className='flex flex-col justify-center items-start gap-2 w-40'>
      <Book imageUrl={imageUrl} width={160} />
      <div className='flex flex-col justify-center items-start gap-1 w-40'>
        <div className='text-sm font-medium text-primary truncate w-full'>
          {title}
        </div>
        <div className='text-xs font-light text-primary truncate w-full'>
          {author}
        </div>
      </div>
    </div>
  );
}
