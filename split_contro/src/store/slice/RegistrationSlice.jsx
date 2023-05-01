import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { signUp_send_otp } from "../thunks/UserDetailThunk";

const initialState = {
    // isLoggedIn: false,
    // accessToken: null,
    // isAddTab: false,
    // userData:[],
    // date:null,
    // status: {
    //   getTrips: null,
    //   prodileDetail: null,
    // },
  };

  const registrationSlice = createSlice({
    name: "registration",
    initialState,
    // reducers: {
    //   setUserData(state, action) {
    //       const userdata = action.payload;
    //     console.log('user data slice called',userdata);
    //     state.userData = userdata;
    //   }
    // },

    extraReducers: (builder) => {
      builder.addCase(signUp_send_otp.pending, (state, action) => {
        state.status.signUp_send_otp = "pending";
        console.log('-------signUp_send_otp in slice1',state);
      });
      builder.addCase(signUp_send_otp.fulfilled, (state, action) => {
        state.status.signUp_send_otp = "fulfilled";
        console.log('-------signUp_send_otp in slice2',state);
      });
      builder.addCase(signUp_send_otp.rejected, (state, action) => {
        state.status.signUp_send_otp = "rejected";
        console.log("REJECTED");
      });
     
    },
  });
  
  export const registrationSlice = registrationSlice.reducer;
  export const registrationSlice = registrationSlice.actions;