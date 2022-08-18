import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./slices/filter/slice";
import cartReducer from "./slices/cart/slice";
import requestReducer from "./slices/request/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = () => useDispatch<AppDispatch>();
