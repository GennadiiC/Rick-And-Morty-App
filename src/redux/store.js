import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import rickMortyReducer from './rickMortySlice'
import { rickMortyApi } from './rickMortyApi';

export const store = configureStore({
  reducer: {
    rickMorty: rickMortyReducer,
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickMortyApi.middleware),
})

setupListeners(store.dispatch)