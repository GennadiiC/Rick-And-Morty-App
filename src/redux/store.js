import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rickMortyReducer from './rickMortySlice'
import { rickMortyApi } from './rickMortyApi';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rickMortyReducer)

export const store = configureStore({
  reducer: {
    rickMorty: persistedReducer,
    [rickMortyApi.reducerPath]: rickMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([thunk, rickMortyApi.middleware]),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)