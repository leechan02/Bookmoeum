import { ProcessedBookData } from "../page";
import DetailSection from "./DetailSection";
import CategoryTabs from "./CategoryTabs";
import DescriptionSection from "./DescriptionSection";

interface SecondSectionProps {
  bookData: ProcessedBookData;
}

export default function SecondSection({ bookData }: SecondSectionProps) {
  return (
    <div className='flex justify-center items-start min-h-screen py-14'>
      <div className='flex-col justify-center items-start gap-6 inline-flex w-[900px]'>
        <CategoryTabs />
        <DetailSection
          category={bookData.processedCategory}
          page={bookData.subInfo[0]?.itemPage ?? 0}
          isbn13={bookData.isbn13}
        />
        <DescriptionSection description={bookData.description} />
      </div>
    </div>
  );
}
