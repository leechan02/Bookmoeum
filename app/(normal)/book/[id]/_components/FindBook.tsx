import React, { useEffect } from "react";
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiPlus } from "react-icons/fi";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";
import { BookData } from "../page";

interface FindBookProps {
  bookData: BookData;
  selectedLibraries: LibraryResult[];
  onAddLibrary: () => void;
}

interface ExistResult {
  exists: boolean;
  title?: string;
  link?: string;
}

export default function FindBook({
  bookData,
  selectedLibraries,
  onAddLibrary,
}: FindBookProps) {
  const [kyoboResult, setKyoboResult] = React.useState<ExistResult | null>(null);

  useEffect(() => {
    const fetchKyoboData = async () => {
      try {
        const response = await fetch(`/api/bookDetail/kyobo?isbn=${bookData.isbn}`);
        const data = await response.json();
        setKyoboResult(data);
      } catch (error) {
        console.error('Error fetching Kyobo data:', error);
        setKyoboResult({ exists: false });
      }
    };

    fetchKyoboData();
  }, [bookData.isbn]);

  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>읽을 수 있는 곳</div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        <BookStoreIcon imageUrl='/IconAladdin.svg' width={40} />
        {kyoboResult?.exists && kyoboResult.link && (
          <a href={kyoboResult.link} target="_blank" rel="noopener noreferrer">
            <BookStoreIcon imageUrl='/IconKyobo.svg' width={40} />
          </a>
        )}
        <BookStoreIcon imageUrl='/IconYes24.svg' width={40} />
        <BookStoreIcon imageUrl='/IconYP.svg' width={40} />
        <BookStoreIcon imageUrl='/IconMille.svg' width={40} />
        <BookStoreIcon imageUrl='/IconRidi.svg' width={40} />
        {selectedLibraries.map((library) => (
          <IconButton
            key={library.libraryCode}
            icon={library.libraryName}
            iconSize={48}
            iconColor='white'
            bgColor='primary'
          />
        ))}
        <IconButton
          icon={FiPlus}
          iconSize={48}
          iconColor='white'
          bgColor='primary'
          onClick={onAddLibrary}
        />
      </div>
    </div>
  );
}
