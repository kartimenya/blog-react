import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slises/auth';
import postsReducer from './slises/posts';
import commentsReducer from './slises/comments';

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer,
    commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
