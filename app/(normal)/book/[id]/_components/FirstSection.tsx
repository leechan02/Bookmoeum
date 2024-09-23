"use client";

import React, { useEffect, useState } from "react";
import Book from "@/components/Book/Book";
import Chip from "@/components/Chips/Chip";
import { FiBook, FiHeart } from "react-icons/fi";
import Button from "@/components/Button/Button";
import { LibraryResult } from "@/components/Popup/LibrarySelectPopup";
import IconButton from "@/components/Button/IconButton";
import FindBook from "./FindBook";
import { BookData } from "@/store/bookSlice";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

interface FirstSectionProps {
  bookData: BookData;
  onClick: () => void;
  onClick2?: () => void;
  selectedLibraries: LibraryResult[];
  onRemoveLibrary?: (library: LibraryResult) => void;
}

export default function FirstSection({
  bookData,
  onClick,
  onClick2,
  selectedLibraries,
}: FirstSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        checkIfLiked(currentUser.uid);
      } else {
        setIsLiked(false);
      }
    });

    return () => unsubscribe();
  }, [bookData.isbn]);

  const checkIfLiked = async (userId: string) => {
    try {
      const likeRef = doc(db, `users/${userId}/likes/${bookData.isbn}`);
      const likeSnap = await getDoc(likeRef);
      setIsLiked(likeSnap.exists());
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLikeClick = async () => {
    if (!user) {
      console.log("User not logged in");
      // Here you might want to redirect to login page or show a login prompt
      return;
    }

    const likeRef = doc(db, `users/${user.uid}/likes/${bookData.isbn}`);

    try {
      if (isLiked) {
        await deleteDoc(likeRef);
      } else {
        await setDoc(likeRef, {
          title: bookData.processedTitle,
          author: bookData.processedAuthor,
          image: bookData.image,
          isbn: bookData.isbn,
          publisher: bookData.publisher,
          description: bookData.description,
          pubdate: bookData.pubdate,
          timestamp: new Date()
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!user) {
      console.log("User not logged in");
      // Here you might want to redirect to login page or show a login prompt
      return;
    }

    const likeRef = doc(db, `users/${user.uid}/books/${bookData.isbn}`);

    try {
      if (isLiked) {
        await deleteDoc(likeRef);
      } else {
        await setDoc(likeRef, {
          title: bookData.processedTitle,
          author: bookData.processedAuthor,
          image: bookData.image,
          isbn: bookData.isbn,
          publisher: bookData.publisher,
          description: bookData.description,
          pubdate: bookData.pubdate,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center py-8 md:py-14 px-8'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full max-w-[900px] gap-8'>
        <div className='flex justify-center'>
          <Book imageUrl={bookData.image} width={240} />
        </div>
        <div className='flex-col justify-start items-start gap-10 md:gap-20 inline-flex w-full md:w-auto'>
          <div className='flex-col justify-center items-start gap-4 md:gap-6 inline-flex w-full'>
            <div className='text-xl md:text-3xl font-medium text-primary text-center md:text-left w-full'>
              {bookData.processedTitle}
            </div>
            <div className='inline-flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 px-1 w-full'>
              <div className='inline-flex justify-start items-center gap-1'>
                <span className='text-sm font-medium text-primary'>
                  {bookData.processedAuthor}
                </span>
                <span className='text-sm font-light text-grey-200'>저</span>
              </div>
              {bookData.translator && (
                <div className='inline-flex justify-start items-center gap-1'>
                  <span className='text-sm font-medium text-primary'>
                    {bookData.translator}
                  </span>
                  <span className='text-sm font-light text-grey-200'>역</span>
                </div>
              )}
            </div>
            <div className='inline-flex flex-wrap justify-center md:justify-start items-center gap-1 w-full'>
              <Chip label={bookData.publisher} />
              <Chip label={bookData.pubdate} />
              {bookData.category && <Chip label={bookData.category} />}
            </div>
          </div>
          <div className='flex-col justify-start items-center md:items-start gap-4 md:gap-6 inline-flex w-full'>
            <FindBook selectedLibraries={selectedLibraries} onAddLibrary={onClick} />
            <div className='flex justify-center md:justify-start items-center gap-2 w-full'>
              <IconButton
                icon={FiHeart}
                iconSize={40}
                iconColor={isLiked ? '#FF3D3D' : 'white'}
                bgColor='secondary'
                onClick={handleLikeClick}
                isFilled={isLiked}
              />
              <Button icon={FiBook} label='내 서재에 담기' onClick={handleButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
