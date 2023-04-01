import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from './slice/HomeSlice'

export const store = configureStore({
  reducer: {
    home:homeReducer
  },
})