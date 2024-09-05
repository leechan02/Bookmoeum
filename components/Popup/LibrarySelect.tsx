import React from "react";
import { LibraryResult } from "./LibrarySelectPopup";
import Button from "../Button/Button";

interface LibrarySelectProps {
  library: LibraryResult;
  onSelect: () => void;
}

export default function LibrarySelect({ library, onSelect }: LibrarySelectProps) {
  return (
    <div className="flex justify-center items-center w-[288px]">
      <div className="text-lg font-medium text-primary truncate flex-grow mt-1">{library.libraryName}</div>
      <Button label='선택' onClick={onSelect} small={true} />
    </div>
  );
}
