import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import filterSlice from './slices/filterSlice'
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchSlice,
    filter: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
