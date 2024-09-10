import Image from "next/image";

interface BookStoreIconProps {
  imageUrl: string;
  width: number;
}

export default function BookStoreIcon({ imageUrl, width }: BookStoreIconProps) {
  return (
    <div className={`rounded-full inline-flex justify-center items-center drop-shadow`}>
      <Image src={imageUrl} alt="Book store icon" className={`object-cover rounded-full`} width={width} height={width} />
    </div>
  );
}