import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IPost } from '../../models';

export const fetchPostsData = createAsyncThunk('post/fetchPostsData', async () => {
  const { data } = await axios.get<IPost[]>('/post');
  return data;
});

export const fetchRemovePosts = createAsyncThunk('post/fetchRemovePosts', async (id: string) => {
  await axios.delete<IPost>(`/post/${id}`);
});

interface PostsState {
  posts: IPost[];
  statuse: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  statuse: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsData.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchPostsData.fulfilled, (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
      state.statuse = 'succeeded';
    });
    builder.addCase(fetchPostsData.rejected, (state) => {
      state.statuse = 'failed';
    });
    // remove post
    builder.addCase(fetchRemovePosts.pending, (state, action) => {
      state.posts = state.posts.filter((item) => item._id !== action.meta.arg);
    });
  },
});

export default postsSlice.reducer;
