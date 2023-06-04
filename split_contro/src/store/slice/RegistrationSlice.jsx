
import { createSlice } from "@reduxjs/toolkit";
//helper functions
//external packages
import Toast from "react-native-toast-message";
import { signUp_send_otp, sign_in_otp_verificationn, sign_in_send_otpp } from "../thunks/RegistrationThunk";

const initialState = {
  isLoggedIn:false,
  loginData:[],
  status: {
    signUp_send_otp: null,
    sign_in_send_otpp:null,
    sign_in_otp_verificationn:null
  },
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setIsLogin(state, action) {
      const status = action.payload;
      state.isLoggedIn = status;
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(signUp_send_otp.pending, (state, action) => {
      state.status.signUp_send_otp = "pending";
    });
    builder.addCase(signUp_send_otp.fulfilled, (state, action) => {
      state.status.signUp_send_otp = "fulfilled";
      console.log('-------userdataslfulfilled');
    });
    builder.addCase(signUp_send_otp.rejected, (state, action) => {
      state.status.signUp_send_otp = "rejected";
      console.log("REJECTED");
    });

    builder.addCase(sign_in_send_otpp.pending, (state, action) => {
      state.status.sign_in_send_otpp = "pending";
    });
    builder.addCase(sign_in_send_otpp.fulfilled, (state, action) => {
      state.status.sign_in_send_otpp = "fulfilled";
      console.log('-------userdataslfulfilled');
    });
    builder.addCase(sign_in_send_otpp.rejected, (state, action) => {
      state.status.sign_in_send_otpp = "rejected";
      
      console.log("REJECTED");
    });
    //login
    builder.addCase(sign_in_otp_verificationn.pending, (state, action) => {
      state.status.sign_in_otp_verificationn = "pending";
      state.isLoggedIn=false
    });
    builder.addCase(sign_in_otp_verificationn.fulfilled, (state, action) => {
      console.log('nnnnnnnnnnnnn',state,action);
      state.status.sign_in_otp_verificationn = "fulfilled";
      state.isLoggedIn=true;
      state.loginData=action?.payload?.data?.data
      // state.loginData=
      console.log('-------userdataslfulfilled');
    });
    builder.addCase(sign_in_otp_verificationn.rejected, (state, action) => {
      state.status.sign_in_otp_verificationn = "rejected";
      state.isLoggedIn=false;
      state.loginData=[]


      console.log("REJECTED");
    });
   
  },
});

export const registrationReducer = registrationSlice.reducer;
export const registrationActions = registrationSlice.actions;
