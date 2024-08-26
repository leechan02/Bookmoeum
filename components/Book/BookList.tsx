import BookDescription from "./BookDescription";

interface SearchResult {
  title: string;
  author: string;
  cover: string;
}

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
          <BookDescription
            title={result.title}
            author={result.author}
            imageUrl={result.cover}
          />
        </div>
      ))}
    </div>
  );
}
