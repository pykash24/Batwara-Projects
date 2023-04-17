import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from './slice/HomeSlice'
import { userDetailReducer } from './slice/UserDetailSlice'

export const store = configureStore({
  reducer: {
    home:homeReducer,
    user:userDetailReducer

  },
})