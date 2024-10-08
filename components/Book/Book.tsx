import React, { useState, useEffect } from "react";

export default function Book({
  imageUrl,
  width,
}: {
  imageUrl: string;
  width: number;
}): JSX.Element {
  const [aspectRatio, setAspectRatio] = useState<number>(1.5);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setAspectRatio(img.height / img.width);
      setIsLoaded(true);
    };
    img.onerror = () => setError(true);
  }, [imageUrl]);

  const height = width * aspectRatio;

  const preventDragHandler = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative flex-none inline-flex justify-center items-center overflow-hidden drop-shadow-md"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200"></div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex justify-center items-center">
          <span className="text-gray-500">이미지 오류</span>
        </div>
      )}
      {isLoaded && !error && (
        <img
          src={imageUrl}
          alt="Book Cover"
          className="w-full h-full object-contain rounded-lg shadow-lg select-none"
          onDragStart={preventDragHandler}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
          draggable="false"
        />
      )}
    </div>
  );
}