import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Root state type (use this for proper typing)
export type RootState = ReturnType<typeof store.getState>;

// Dispatch type
export type AppDispatch = typeof store.dispatch;
