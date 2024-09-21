import Image from "next/image";
import { useState } from "react";

interface BookStoreIconProps {
  imageUrl: string;
  width: number;
}

export default function BookStoreIcon({ imageUrl, width }: BookStoreIconProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`rounded-full inline-flex justify-center items-center drop-shadow ${
        !isLoaded ? 'bg-gray-200' : ''
      }`}
      style={{ width: `${width}px`, height: `${width}px` }}
    >
      <Image
        src={imageUrl}
        alt="Book store icon"
        className={`object-cover rounded-full ${isLoaded ? '' : 'invisible'}`}
        width={width}
        height={width}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          MozUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}