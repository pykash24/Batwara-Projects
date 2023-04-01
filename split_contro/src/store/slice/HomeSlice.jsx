
  import { createSlice } from "@reduxjs/toolkit";
  //helper functions
  //external packages
  import Toast from "react-native-toast-message";
import { getTrips } from "../thunks/HomeThunks";
  
  const initialState = {
    isLoggedIn: false,
    accessToken: null,
    isAddTab: false,
    status: {
      getTrips: null,
      home: null,
    },
  };
  
  const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
      setIsLogin(state, action) {
        const status = action.payload;
        state.isLoggedIn = status;
        if (status) {
          Toast.show({
            type: "success",
            text1: "connexion réussie",
            text2: "content de te revoir",
          });
        } else {
        //   clearSession();
          Toast.show({
            type: "success",
            text1: "déconnexion réussie",
          });
        }
      },
      setIsTab(state, action) {
        const tabStatus = action.payload;
        console.log('ttttt',tabStatus);
        state.isAddTab = tabStatus;
      },
     
    },
    extraReducers: (builder) => {
      builder.addCase(getTrips.pending, (state, action) => {
        state.status.getTrips = "pending";
      });
      builder.addCase(getTrips.fulfilled, (state, action) => {
        state.status.getTrips = "fulfilled";
        // const accessToken = action.payload.getTrips.access_token;
        // if (accessToken) {
        //   state.accessToken = accessToken;
        // }
      });
      builder.addCase(getTrips.rejected, (state, action) => {
        state.status.getTrips = "rejected";
        console.log("REJECTED");
      });
     
    },
  });
  
  export const homeReducer = homeSlice.reducer;
  export const homeActions = homeSlice.actions;
  