import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { sign_in_send_otp, sign_up_otp_verification, sign_up_send_otp } from "../../shared/ConfigUrl";

export const signUp_send_otp = createAsyncThunk(
    "signUp_send_otp",
    async (payload, thunkAPI) => {
        console.log('payloadaa', payload);
        try {
            const response = await fetchApi(sign_up_send_otp, payload)
                .then(res => {
                    console.log("inside thunk res:", res)
                    return res
                })
                .catch(err => {
                    console.log('signUp_send_otp err:', err.message);
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
        console.log('payloadaa', payload);
        try {
            const response = await fetchApi(sign_up_otp_verification, payload)
                .then(res => {
                    return res?.data
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


//signin

export const sign_in_send_otpp = createAsyncThunk(
    "signUp_send_otp",
    async (payload, thunkAPI) => {
        console.log('payloadaa', payload);
        try {
            const response = await fetchApi(sign_in_send_otp, payload)
                .then(res => {
                    return res
                })
                .catch(err => {
                    console.log('sendOtp err:', err);
                });
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);