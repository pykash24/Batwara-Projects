//redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../shared/AxiosCall";
import { create_expense, create_group, get_all_users, get_user_group } from "../../shared/ConfigUrl";

export const AddExpense = createAsyncThunk(
    "addExpense",
    async (payload, thunkAPI) => {
        console.log('addExpensethunk',payload);
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        try {
            const response= await fetchApi(create_expense, payload,token)
            .then(res => {
                if (res?.data?.status == "success") {
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
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        console.log('createGroup',payload,token);
        try {
            const response= await fetchApi(create_group, payload,token)
            .then(res => {
                if (res?.data?.status == "success") {
                    return res
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
export const GetUserGroupList = createAsyncThunk(
    "GetUserGroupList",
    async (payload, thunkAPI) => {
        console.log('createGroup',payload);
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        try {
            const response= await fetchApi(get_user_group, payload,token)
            .then(res => {
                if (res?.data?.status == "success") {
                    return res
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

export const GetAllUsers = createAsyncThunk(
    "GetAllUsers",
    async (payload, thunkAPI) => {
        console.log('createGroup',payload);
        const state = thunkAPI.getState();
        const token=state?.register?.loginData?.token
        try {
            const response= await fetchApi(get_all_users, {},token?token:"")
            .then(res => {
                console.log('create_group res:', res);
                if (res?.data?.status == "success") {
                    return res
                }
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
