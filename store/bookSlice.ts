import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from "@/app/(normal)/search/page";

export interface BookData extends SearchResult {
  processedTitle: string;
  processedAuthor: string;
  subTitle: string;
  translator: string;
  category: string;
  page: number;
}

interface BookState {
  selectedBook: BookData | null;
}

const initialState: BookState = {
  selectedBook: null,
};

const processTitle = (title: string): { processedTitle: string; subTitle: string } => {
  const match = title.match(/^(.+?)\s*(\(.+\))?$/);
  if (match && match[2]) {
    return {
      processedTitle: match[1].trim(),
      subTitle: match[2].slice(1, -1).trim()  // 괄호 제거
    };
  }
  return { processedTitle: title, subTitle: "" };
};

const processAuthor = (author: string): string => {
  return author.replace(/\^/g, ", ");
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<SearchResult>) => {
      const { title, author } = action.payload;
      const { processedTitle, subTitle } = processTitle(title);
      const processedAuthor = processAuthor(author);

      state.selectedBook = {
        ...action.payload,
        processedTitle,
        processedAuthor,
        subTitle,
        translator: '',
        category: '',
        page: 0,
      };
    },
    updateBookData: (state, action: PayloadAction<Partial<BookData>>) => {
      if (state.selectedBook) {
        state.selectedBook = { ...state.selectedBook, ...action.payload };
      }
    },
  },
});

export const { setSelectedBook, updateBookData } = bookSlice.actions;

export default bookSlice.reducer;