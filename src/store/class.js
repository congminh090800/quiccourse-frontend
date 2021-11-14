import endpoints from "~/constants/endpoints";
import http from "~/utils/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const classes = createSlice({
  name: "classes",
  initialState: {
    info: null,
  },
  reducers: {
    setClassInfo: (state, { payload }) => {
      state.info = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const ClassesAction = classes.actions;

export const ClassesReducer = classes.reducer;

export default classes.reducer;
