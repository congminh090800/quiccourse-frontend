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
    changeStudentPoint: (state, { payload }) => {
      state.info.enrolledStudents.map((student) => {
        return student.studentId == payload.studentId
          ? student.grades.find(
              (grade) => grade.gradeComponentId == payload.gradeComponentId
            )
            ? student.grades.map((grade) =>
                grade.gradeComponentId == payload.gradeComponentId
                  ? (grade.point = payload.point)
                  : grade
              )
            : student.grades.push({
                point: payload.point,
                gradeComponentId: payload.gradeComponentId,
              })
          : student;
      });
    },
    finalizeUpdate: (state, { payload }) => {
      state.info.enrolledStudents = payload.enrolledStudents;
      state.info.gradeStructure = payload.gradeStructure;
    },
  },
  extraReducers: (builder) => {},
});

export const ClassesAction = classes.actions;

export const ClassesReducer = classes.reducer;

export default classes.reducer;
