import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { ENV } from "../contant/environments";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});
export default store;
