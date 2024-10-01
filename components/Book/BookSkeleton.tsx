import React from "react";

interface BookSkeletonProps {
  count?: number;
}

export default function BookSkeleton({ count = 10 }: BookSkeletonProps) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 md:gap-8 w-full items-end'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex flex-col items-start gap-2 w-full'>
          <div className='w-full aspect-[2/3] bg-secondary animate-pulse rounded'></div>
          <div className='w-full h-4 bg-secondary animate-pulse rounded'></div>
          <div className='w-2/3 h-3 bg-secondary animate-pulse rounded'></div>
        </div>
      ))}
    </div>
  );
}
