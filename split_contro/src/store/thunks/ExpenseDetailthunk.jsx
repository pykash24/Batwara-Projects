//redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { create_expense, create_group } from "../../shared/ConfigUrl";

export const AddExpense = createAsyncThunk(
    "addExpense",
    async (payload, thunkAPI) => {
        console.log('addExpensethunk',payload);
        const url=''
        const state = thunkAPI.getState();
        const token=state?.home?.accessToken
        try {
            const response= await fetchApi(create_expense, payload)
            .then(res => {
                if (res?.data?.status == "success") {
                    // dispatch(homeActions.setIsTab(false));
                    return res?.data
                }
                console.log('create_expense res:', res);
            })
            .catch(err => {
                console.log('create_expense err:', err);
            });
           
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);
export const CreateGroup = createAsyncThunk(
    "createGroup",
    async (payload, thunkAPI) => {
        console.log('createGroup',payload);
        const url=''
        const state = thunkAPI.getState();
        const token=state?.home?.accessToken
        try {
            const response= await fetchApi(create_group, payload)
            .then(res => {
                if (res?.data?.status == "success") {
                    // dispatch(homeActions.setIsTab(false));
                    return res?.data
                }
                console.log('create_group res:', res);
            })
            .catch(err => {
                console.log('create_group err:', err);
            });
           
            return response;
        } catch (error) {
            console.log("ERROR MESSAGE", error);
            return thunkAPI.rejectWithValue("error");
        }
    }
);
