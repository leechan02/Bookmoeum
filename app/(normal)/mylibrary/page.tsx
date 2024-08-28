"use client";

import CharacterMsg from "@/components/Message/CharacterMsg";
import { withAuth } from "@/contexts/WithAuth";

function MylibraryPage() {
  return (
    <div className='flex justify-center h-screen'>
      <CharacterMsg
        msg='앗! 지금 만들고 있는 중이에요!'
        imageUrl='/FixCat.svg'
      />
    </div>
  );
}

export default withAuth(MylibraryPage);
