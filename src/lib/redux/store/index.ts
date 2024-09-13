import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import coincapReducer from './slices/coincapSlice'
import { coinsApi } from './services/coinsApi'

export const makeStore = () => configureStore({
  reducer: {
    coincap: coincapReducer,
    [coinsApi.reducerPath]: coinsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export const useAppDisparch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']