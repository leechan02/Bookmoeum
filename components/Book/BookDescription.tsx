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
    <div className='flex-col justify-center items-start gap-2'>
      <Book imageUrl={imageUrl} width={160} />
      <div className='text-sm font-medium text-primary'>{title}</div>
      <div className='text-sx font-light text-primary'>{author}</div>
    </div>
  );
}
