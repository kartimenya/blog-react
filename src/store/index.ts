import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slises/auth';
import postsReducer from './slises/posts';

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
