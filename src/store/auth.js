import { createSlice } from "@reduxjs/toolkit";
import endpoints from "~/constants/endpoints";
import http from "~/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const updateAccessToken = createAsyncThunk(
  "auth/UPDATE_ACCESS_TOKEN",
  async (loginForm) => {
    const result = await http.post(endpoints.signIn, loginForm);
    return result.data;
  }
);

export const auth = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAccessToken.fulfilled, (state, { payload }) => {
      state.accessToken = payload;
      state.loading = false;
    });
    builder.addCase(updateAccessToken.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(updateAccessToken.rejected, (state, { payload }) => {
      state.accessToken = "";
      state.loading = false;
    });
  },
});
export default auth.reducer;
