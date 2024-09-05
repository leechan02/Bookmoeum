import React from "react";
import { LibraryResult } from "./LibrarySelectPopup";
import Button from "../Button/Button";

interface LibrarySelectProps {
  library: LibraryResult;
}

export default function LibrarySelect({ library }: LibrarySelectProps) {
  return (
    <div className="flex justify-center items-center w-[288px]">
      <div className="text-lg font-medium text-primary truncate flex-grow">{library.libraryName}</div>
      <Button label='선택' />
    </div>
  );
}
