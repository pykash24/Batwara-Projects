//redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { GetUserDetails } from "../../shared/ConfigUrl";

export const getUserDetails = createAsyncThunk(
    "getUserDetails",
    async (payload, thunkAPI) => {
        console.log('payloadaa',payload);
        const url=''
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        try {
            const response= await fetchApi(GetUserDetails, payload,token)
            .then(res => {
                if (res?.data?.status == "success") {
                    // dispatch(homeActions.setIsTab(false));
                    return res?.data
                }
                console.log('GetUserDetails res:', res);
            })
            .catch(err => {
                console.log('GetUserDetails err:', err);
            });
           
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);
