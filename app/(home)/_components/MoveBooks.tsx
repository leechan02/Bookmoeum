import Book from "@/components/Book/Book";
import BookSlider from "@/components/Book/BookSlider";
import { useQuery } from "@tanstack/react-query";

interface Book {
  title: string;
  cover: string;
  pubDate: string;
  isbn13: string;
}

interface BestsellerResponse {
  item: Book[];
}

async function getBestseller(): Promise<BestsellerResponse> {
  const response = await fetch('/api/getBestseller');

  if (!response.ok) {
    throw new Error("서버에서 데이터를 가져오지 못했습니다.");
  }

  const data = await response.json();
  return data as BestsellerResponse;
}

export default function MoveBooks() {
  const {data} = useQuery<BestsellerResponse>({
    queryKey: ['bestseller'],
    queryFn: getBestseller,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  })

  const books = data?.item.map((book) => ({cover: book.cover, isbn: book.isbn13})) ?? [];

  return (
    <section className='py-4 md:py-14 flex flex-col gap-6 overflow-hidden'>
      <BookSlider books={books} />
      <BookSlider books={books} reverse />
    </section>
  );
}
