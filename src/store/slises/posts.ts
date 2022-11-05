import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IPost } from '../../models';

export const fetchPostsData = createAsyncThunk('fetchPostsData', async () => {
  const { data } = await axios.get('/post');
  return data;
});

interface PostsState {
  posts: IPost[];
  statuse: 'loading' | 'loaded' | 'err';
}

const initialState: PostsState = {
  posts: [],
  statuse: 'loading',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsData.pending, (state) => {});
    builder.addCase(fetchPostsData.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchPostsData.rejected, (state) => {});
  },
});

export default postsSlice.reducer;
