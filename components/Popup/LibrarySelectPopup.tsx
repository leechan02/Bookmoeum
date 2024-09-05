import { FiX } from "react-icons/fi";
import ButtonIcon from "../Icon/ButtonIcon";
import SearchBar from "../Input/SearchBar";

interface LibrarySelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LibrarySelectPopup({isOpen, onClose}: LibrarySelectPopupProps) {
  if (!isOpen) return null;

  async function searchLibrary(query: string) {
    const response = await fetch(`/api/library?query=${encodeURIComponent(query)}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('검색 실패');
    }
  }

  const handleSubmit = async (query: string) => {
    console.log(query);

    const searchResult = await searchLibrary(query);
    console.log(searchResult);
  }

  return (
    <div className='fixed inset-0 bg-primary bg-opacity-30 flex items-center justify-center z-50'>
      <div className='w-[320px] h-[480px] rounded-3xl bg-white p-4 relative flex justify-center items-end'>
        <div className='absolute top-2 right-2'>
          <ButtonIcon
            Icon={FiX}
            iconSize={32}
            bgColor='primary'
            iconColor='white'
            onClick={onClose}
          />
        </div>
        <SearchBar placeholder="도서관을 검색해보세요" isBook={false} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}
