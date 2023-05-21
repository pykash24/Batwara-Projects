import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { sign_up_otp_verification, sign_up_send_otp } from "../../shared/ConfigUrl";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const signUp_send_otp = createAsyncThunk(
    "signUp_send_otp",
    async (payload, thunkAPI) => {
        console.log('payloadaa',payload);
        // const state = thunkAPI.getState();
        // const token=state?.home?.accessToken
        try {
            const response= await fetchApi(sign_up_send_otp, payload)
            .then(res => {
                console.log("inside thunk res:",res)
                console.log("inside thunk res?.data?.status ",res?.data?.status == "success")
                if (res?.data?.status == "success") {
                    // dispatch(homeActions.setIsTab(false));
                    return res?.data
                }
                console.log('signUp_send_otp res in thunk:', res);
            })
            .catch(err => {
                console.log('signUp_send_otp err:', err.message);
                Toast.show({
                    type: "error",
                    text1: `${err.message} 😞`,
                    text2: "try again!",
                  });
            });
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);

export const fial_signUp_otpVerification = createAsyncThunk(
    "fial_signUp_otpVerification",
    async (payload, thunkAPI) => {
        console.log('payloadaa',payload);
        const url=''
        const state = thunkAPI.getState();
        const token=state?.home?.accessToken
        try {
            const response= await fetchApi(sign_up_otp_verification, payload)
            .then(res => {
                if (res?.data?.status == "success") {
                    // dispatch(homeActions.setIsTab(false));
                    return res?.data
                }
                console.log('fial_signUp_otpVerification res:', res);
            })
            .catch(err => {
                console.log('fial_signUp_otpVerification err:', err);
            });
           
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);