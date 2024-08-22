import { useEffect, useState } from "react";

export default function Book({
  imageUrl,
  width,
}: {
  imageUrl: string;
  width: number;
}): JSX.Element {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setHeight(width / aspectRatio);
    };
  }, [imageUrl, width]);

  return (
    <div
      className='flex justify-center items-center'
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img src={imageUrl} alt='Book Cover' className='w-full h-full' />
    </div>
  );
}
