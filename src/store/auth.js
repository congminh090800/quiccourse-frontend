import endpoints from "~/constants/endpoints";
import http from "~/utils/http";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    refreshToken: "",
    expiredAt: null,
    loading: false,
    user: {},
  },
  reducers: {
    DELETE_ACCESS_TOKEN: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.expiredAt = null;
      state.user = {};
    },
    REFRESH_ACCESS_TOKEN: (state, { payload }) => {
      state.accessToken = payload;
      state.user.accessToken = payload;
    },
    UPDATE_GOOGLE_ACCOUNT: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.expiredAt = payload.expiredAt;
      state.user = payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAccessToken.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
      state.refreshToken = payload.refreshToken;
      state.expiredAt = payload.expiredAt;
      state.loading = false;
    });
    builder.addCase(updateAccessToken.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(updateAccessToken.rejected, (state, { payload }) => {
      state.accessToken = "";
      state.user = {};
      state.refreshToken = "";
      state.expiredAt = null;
      state.loading = false;
    });
  },
});

export const {
  DELETE_ACCESS_TOKEN,
  REFRESH_ACCESS_TOKEN,
  UPDATE_GOOGLE_ACCOUNT,
} = auth.actions;

export default auth.reducer;
