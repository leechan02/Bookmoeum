import { SearchResult } from "@/app/(normal)/search/page";
import BookDescription from "./BookDescription";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "@/store/bookSlice";
import { FiTrash2 } from "react-icons/fi";
import { useState, useCallback } from "react";

interface BookListProps<T extends SearchResult> {
  searchResults: T[];
  onRemove?: (isbn: string) => void;
  showRemoveButton?: boolean;
}

export default function BookList<T extends SearchResult>({ searchResults: initialSearchResults, onRemove, showRemoveButton }: BookListProps<T>) {
  const dispatch = useDispatch();
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<T[]>(initialSearchResults);

  const handleRemove = useCallback((isbn: string) => {
    setSearchResults(prevResults => prevResults.filter(book => (book.isbn || book.isbn13) !== isbn));
    onRemove && onRemove(isbn);
  }, [onRemove]);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1 md:gap-8 w-full items-end'>
      {searchResults.map((result, index) => (
        <div 
          key={index} 
          className='w-full relative'
          onMouseEnter={() => setHoveredBook(result.isbn || result.isbn13 || '')}
          onMouseLeave={() => setHoveredBook(null)}
        >
          {showRemoveButton ? (
            <div 
              className='flex justify-center items-center cursor-pointer'
              onClick={() => dispatch(setSelectedBook(result))}
            >
              <BookDescription
                title={result.title}
                author={result.author}
                imageUrl={result.image || result.cover || ""}
              />
              {hoveredBook === (result.isbn || result.isbn13) && onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(result.isbn || result.isbn13 || '');
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white"
                >
                  <FiTrash2 size={24} />
                </button>
              )}
            </div>
          ) : (
            <Link
              href={`/book/${result.isbn || result.isbn13}`}
              className='flex justify-center items-center'
              onClick={() => dispatch(setSelectedBook(result))}
            >
              <BookDescription
                title={result.title}
                author={result.author}
                imageUrl={result.image || result.cover || ""}
              />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}