
import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { signUp_send_otp } from "../thunks/RegistrationThunk";

const initialState = {
  status: {
    signUp_send_otp: null,
  },
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
   
   
  },
  extraReducers: (builder) => {
    builder.addCase(signUp_send_otp.pending, (state, action) => {
      state.status.signUp_send_otp = "pending";
    });
    builder.addCase(signUp_send_otp.fulfilled, (state, action) => {
      state.status.signUp_send_otp = "fulfilled";
      console.log('-------userdataslfulfilled',state);
    });
    builder.addCase(signUp_send_otp.rejected, (state, action) => {
      state.status.signUp_send_otp = "rejected";
      console.log("REJECTED");
    });
   
  },
});

export const registrationReducer = registrationSlice.reducer;
export const registrationActions = registrationSlice.actions;
