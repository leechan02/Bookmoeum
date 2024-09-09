import DetailSection from "./DetailSection";
import CategoryTabs from "./CategoryTabs";
import DescriptionSection from "./DescriptionSection";
import { BookData } from "@/store/bookSlice";

interface SecondSectionProps {
  bookData: BookData;
}

export default function SecondSection({ bookData }: SecondSectionProps) {
  return (
    <div className='flex justify-center items-start py-8 md:py-14 flex-grow px-8'>
      <div className='flex-col justify-center items-start gap-4 md:gap-6 inline-flex w-full max-w-[900px]'>
        <CategoryTabs />
        <div className='w-full overflow-x-auto scrollbar-hide'>
          <DetailSection
            category={bookData.category}
            page={bookData.page}
            isbn={bookData.isbn}
            publisher={bookData.publisher}
            pubDate={bookData.pubdate}
          />
        </div>
        <DescriptionSection description={bookData.description} />
      </div>
    </div>
  );
}
