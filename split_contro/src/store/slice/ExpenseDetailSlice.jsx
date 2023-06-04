
import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { AddExpense, GetAllUsers, GetUserGroupList } from "../thunks/ExpenseDetailthunk";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  date: new Date(),
  adddContactList: [],
  allContacts: [],
  userGroups: [],
  status: {
    AddExpense: null,
    GetUserGroupList: null,
    GetAllUsers:null
  },
  groupsData: [{
    title: "Vrindavan Group",
    members: [
      {
        id: 0,
        name: 'Anu Borkar',
        nickname: "Anu",
        gender: "F",
        contact: "9011459254"
      },
      {
        id: 1,
        name: 'Anupama Borkar',
        nickname: "Anu",
        gender: "F",
        contact: "9657568612"
      },
      {
        id: 2,
        name: 'Akshay Borkar',
        nickname: "Akki",
        gender: "M",
        contact: "7276864642"
      },
    ]
  }]
};

const expenseSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setDate(state, action) {
      // const data = action?.payload;
      console.log('tttttdate', action);
      try {
        // state.date = new Date(data);
      } catch (error) {
        console.log('date eror', error);

      }
    },
    setAllContacts(state, action) {
      const data = action?.payload;
      console.log('added friends11', data?.contacts);
      state.allContacts = data?.contacts;
    },
    setSelectedContact(state, action) {
      const data = action?.payload;
      console.log('added friends', data?.contact);
      state.addedFriendsList = data?.contact;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddExpense.pending, (state, action) => {
      state.status.AddExpense = "pending";
    });
    builder.addCase(AddExpense.fulfilled, (state, action) => {
      state.status.AddExpense = "fulfilled";
      console.log('-------AddExpense slice----', state);
    });
    builder.addCase(AddExpense.rejected, (state, action) => {
      state.status.AddExpense = "rejected";
      console.log("REJECTED");
    });

  // get user groups
    builder.addCase(GetUserGroupList.pending, (state, action) => {
      state.status.GetUserGroupList = "pending";
    });
    builder.addCase(GetUserGroupList.fulfilled, (state, action) => {
      state.status.GetUserGroupList = "fulfilled";
      console.log('-------GetUserGroupList slice----', state);
    });
    builder.addCase(GetUserGroupList.rejected, (state, action) => {
      state.status.GetUserGroupList = "rejected";
      console.log("REJECTED");
    })
  
    builder.addCase(GetAllUsers.pending, (state, action) => {
      state.status.GetAllUsers = "pending";
    });
    builder.addCase(GetAllUsers.fulfilled, (state, action) => {
      state.status.GetAllUsers = "fulfilled";
      console.log('-------GetAllUsers slice----', state);
    });
    builder.addCase(GetAllUsers.rejected, (state, action) => {
      state.status.GetAllUsers = "rejected";
      console.log("REJECTED");
    });
  },


});

export const expenseReducer = expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
