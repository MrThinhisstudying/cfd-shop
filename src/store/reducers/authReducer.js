import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE } from "../../contant/localStorage";
import { authService } from "../../services/authService";
import { getCart } from "./cartReducer";

const initialState = {
  profile: null,
};

export const { reducer: authReducer, actions: authAction } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.token);
      localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      state.profile = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await authService.login(payload);
      console.log("res: ", res);
      const { token, refreshToken } = res?.data?.data || {};
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);
      const profileRes = await authService.getProfile();
      console.log("Profile: ", profileRes);
      thunkAPI.dispatch(authAction.setProfile(profileRes?.data?.data));
      thunkAPI.dispatch(getCart());
      return profileRes?.data?.data;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  }
);
