"use client";

import CharacterMsg from "@/components/Message/CharacterMsg";
import { withAuth } from "@/contexts/WithAuth";

export default function MylibraryPage() {
  return (
    <div className='flex justify-center items-center flex-grow'>
      <CharacterMsg
        msg='앗! 지금 만들고 있는 중이에요!'
        imageUrl='/FixCat.svg'
      />
    </div>
  );
}
