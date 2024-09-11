import { SearchResult } from "@/app/(normal)/search/page";
import BookDescription from "./BookDescription";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "@/store/bookSlice";

interface BookListProps {
  searchResults: SearchResult[];
}

export default function BookList({ searchResults }: BookListProps) {
  const dispatch = useDispatch();

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 md:gap-8 w-full items-end'>
      {searchResults.map((result, index) => (
        <div key={index} className='w-full'>
          <Link
            href={`/book/${result.isbn}`}
            className='flex justify-center items-center'
            onClick={() => dispatch(setSelectedBook(result))}
          >
            <BookDescription
              title={result.title}
              author={result.author}
              imageUrl={result.image}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}