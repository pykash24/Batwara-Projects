
import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { getUserDetails } from "../thunks/UserDetailThunk";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  isAddTab: false,
  userData:[],
  status: {
    getTrips: null,
    prodileDetail: null,
  },
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    setUserData(state, action) {
        const userdata = action.payload;
      console.log('user data slice called',userdata);
      state.userData = userdata;
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.status.getUserDetails = "pending";
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.status.getUserDetails = "fulfilled";
      console.log('-------userdataslfulfilled',state);
      // const accessToken = action.payload.getUserDetails.access_token;
      // if (accessToken) {
      //   state.accessToken = accessToken;
      // }
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.status.getUserDetails = "rejected";
      console.log("REJECTED");
    });
   
  },
});

export const userDetailReducer = userDetailSlice.reducer;
export const userDetailActions = userDetailSlice.actions;
