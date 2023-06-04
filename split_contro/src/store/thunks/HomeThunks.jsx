//redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";

export const getTrips = createAsyncThunk(
    "getTrips",
    async (payload, thunkAPI) => {
        const url=''
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        try {
            const response= await fetchApi(url,payload,token)
           
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);
