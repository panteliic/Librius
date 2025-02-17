import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice";
import userReducer from "./userSlice"; 
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer, 
    message:messageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
