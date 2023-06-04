
  import { createSlice } from "@reduxjs/toolkit";
  //helper functions
  //external packages
  import Toast from "react-native-toast-message";
import { getTrips } from "../thunks/HomeThunks";
  
  const initialState = {
    isLoggedIn: false,
    isAddTab: false,
    userData:[],
    status: {
      getTrips: null,
      home: null,
    },
  };
  
  const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
    
      setIsTab(state, action) {
        console.log('c',state,action);
        const tabStatus = !!action?.payload?.value;
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
  