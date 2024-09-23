"use client";
import { FiBook } from "react-icons/fi";
import Button from "../Button/Button";

interface LibrarySelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookAddPopup({
  isOpen,
  onClose,
}: LibrarySelectPopupProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-primary bg-opacity-30 flex items-center justify-center z-50'
      onClick={handleOverlayClick}
    >
      <div
        className='rounded-3xl bg-white p-4 relative flex flex-col justify-center items-center gap-2'
        onClick={(e) => e.stopPropagation()}
      >
        <Button icon={FiBook} label='내 서재에 담기' />
      </div>
    </div>
  );
}
