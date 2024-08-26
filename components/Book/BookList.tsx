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
    <div className='grid grid-cols-6 gap-8 items-end'>
      {searchResults.map((result, index) => (
        <div
          key={index}
          ref={index === searchResults.length - 1 ? lastResultElementRef : null}
        >
          <Link href={`/book/${result.isbn13}`}>
            <BookDescription
              title={result.title}
              author={result.author}
              imageUrl={result.cover}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
