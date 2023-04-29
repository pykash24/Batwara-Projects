import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from './slice/HomeSlice'
import { userDetailReducer } from './slice/UserDetailSlice'
import { expenseReducer } from './slice/ExpenseDetailSlice'
export const store = configureStore({
  reducer: {
    home:homeReducer,
    user:userDetailReducer,
    expense:expenseReducer
  },
})