import { createSlice } from "@reduxjs/toolkit";

const rickMortySlice = createSlice({
  name: 'rickMorty',
  initialState: {
    page: 1,
  },
  reducers: {
    flipPage: (state, action) => {
      state.page = state.page += action.payload
    }
  }
})

export const { flipPage } = rickMortySlice.actions;

export default rickMortySlice.reducer