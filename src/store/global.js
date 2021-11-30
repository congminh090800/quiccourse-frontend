import endpoints from "~/constants/endpoints";
import http from "~/utils/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const global = createSlice({
  name: "global",
  initialState: {
    snackbarSuccess: null,
    snackbarError: null,
  },
  reducers: {
    setSnackbarSuccess: (state, { payload }) => {
      state.snackbarSuccess = payload;
    },
    setSnackbarError: (state, { payload }) => {
      state.snackbarError = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const GlobalActions = global.actions;

export const GlobalReducer = global.reducer;

export default global.reducer;
