import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from "@/app/(normal)/search/page";

interface BookState {
  selectedBook: SearchResult | null;
}

const initialState: BookState = {
  selectedBook: null,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<SearchResult>) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;