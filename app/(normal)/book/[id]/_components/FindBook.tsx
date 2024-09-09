import React from 'react';
import BookStoreIcon from "@/components/Icon/BookStoreIcon";
import { FiPlus } from "react-icons/fi";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";

interface FindBookProps {
  selectedLibraries: LibraryResult[];
  onAddLibrary: () => void;
}

const FindBook: React.FC<FindBookProps> = ({ selectedLibraries, onAddLibrary }) => {
  return (
    <div className='flex-col justify-start items-center md:items-start gap-2 inline-flex w-full'>
      <div className='text-xs font-regular text-grey-200'>
        읽을 수 있는 곳
      </div>
      <div className='flex flex-wrap justify-center md:justify-start items-center gap-4 w-full'>
        <BookStoreIcon imageUrl='/IconAladdin.svg' width={40} />
        <BookStoreIcon imageUrl='/IconKyobo.svg' width={40} />
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
};

export default FindBook;