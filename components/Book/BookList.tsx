import { SearchResult } from "@/app/(normal)/search/page";
import BookDescription from "./BookDescription";
import Link from "next/link";

interface BookListProps {
  searchResults: SearchResult[];
  lastResultElementRef: (node: HTMLDivElement | null) => void;
}

export default function BookList({
  searchResults,
  lastResultElementRef,
}: BookListProps) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 md:gap-8 w-full items-end'>
      {searchResults.map((result, index) => (
        <div
          key={index}
          ref={index === searchResults.length - 1 ? lastResultElementRef : null}
          className='w-full'
        >
          {/* <Link href={`/book/${result.isbn13}`} className="flex justify-center items-center"> */}
          <Link href={`/book/${result.isbn}`} className="flex justify-center items-center">
            <BookDescription
              title={result.title}
              author={result.author}
              // imageUrl={result.cover}
              imageUrl={result.image}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
