import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { sign_in_otp_verification, sign_in_send_otp, sign_up_otp_verification, sign_up_send_otp } from "../../shared/ConfigUrl";

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
    "sign_in_send_otpp",
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
            console.log('responsesign_in_send_otpp', response);
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);
export const sign_in_otp_verificationn = createAsyncThunk(
    "sign",
    async (payload, thunkAPI) => {
        try {
            const response = await fetchApi(sign_in_otp_verification, payload)
                .then(res => {
                    console.log('login data:ll', res);
                    return res;
                    //   if (res.status == 200) {
                    //     setLoading(false)
                    //     if (res.data.status === 'success') {
                    //       Toast.show({
                    //         type: "success",
                    //         text1: "success",
                    //         text2: "check message for OTP",
                    //       });
                    //       setTimeout(() => {
                    //         // navigation.navigate('Main');
                    //       }, 1000);
                    //     }
                    //     console.log('login res:', res);
                    //   }
                })
                .catch(err => {
                    console.log('login err:', err);
                });
            return response;
        }

        catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }

)