interface BookStoreIconProps {
  imageUrl: string;
  width: number;
}

export default function BookStoreIcon({ imageUrl, width }: BookStoreIconProps) {
  const sizeClass = `w-[${width}px] h-[${width}px]`;

  return (
    <div className={`rounded-full inline-flex justify-center items-center`}>
      <img src={imageUrl} alt="Book store icon" className={`object-cover rounded-full`} />
    </div>
  );
}