
import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { AddExpense } from "../thunks/ExpenseDetailthunk";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  date:new Date(),
  status: {
    AddExpense: null,
  },
  groupsData:[{
    title:"Vrindavan Group",
    members:[
        {
            id: 0,
            name: 'Anu Borkar',
            nickname: "Anu",
            gender: "F",
            contact:"9011459254"
        },
        {
            id: 1,
            name: 'Anupama Borkar',
            nickname: "Anu",
            gender: "F",
            contact:"9657568612"
        },
        {
          id: 2,
          name: 'Akshay Borkar',
          nickname: "Akki",
          gender: "M",
          contact:"7276864642"
      },
    ]
  }]
};

const expenseSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setDate(state, action) {
      const data = action.payload;
      console.log('ttttt',data);
      state.date = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddExpense.pending, (state, action) => {
      state.status.AddExpense = "pending";
    });
    builder.addCase(AddExpense.fulfilled, (state, action) => {
      state.status.AddExpense = "fulfilled";
      console.log('-------AddExpense slice----',state);
    });
    builder.addCase(AddExpense.rejected, (state, action) => {
      state.status.AddExpense = "rejected";
      console.log("REJECTED");
    });
   
  },
});

export const expenseReducer = expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
