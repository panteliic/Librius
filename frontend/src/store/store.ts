import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apiSlice";
import userReducer from "./userSlice"; // Import the userSlice reducer

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer, // Add userSlice reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
