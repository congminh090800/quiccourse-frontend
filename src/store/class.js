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
    setGradeStructure: (state, { payload }) => {
      state.info.gradeStructure = payload;
    },
    addGradeStructure: (state, { payload }) => {
      state.info.gradeStructure = [
        ...(state.info.gradeStructure || []),
        payload,
      ];
    },
    removeGradeStructure: (state, { payload }) => {
      state.info.gradeStructure = state.info.gradeStructure.filter(
        (data) => data._id !== payload._id
      );
    },
  },
  extraReducers: (builder) => {},
});

export const ClassesAction = classes.actions;

export const ClassesReducer = classes.reducer;

export default classes.reducer;
