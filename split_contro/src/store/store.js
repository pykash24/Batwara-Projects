import { configureStore } from '@reduxjs/toolkit'
import { homeReducer } from './slice/HomeSlice'
import { userDetailReducer } from './slice/UserDetailSlice'
import { expenseReducer } from './slice/ExpenseDetailSlice'
import { registrationReducer } from './slice/RegistrationSlice'

export const store = configureStore({
  reducer: {
    home:homeReducer,
    user:userDetailReducer,
    expense:expenseReducer,
    register:registrationReducer
  },
})