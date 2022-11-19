import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { IComment } from '../../models';

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (id: string) => {
    const { data } = await axios.get<IComment[]>(`/comment/${id}`);

    return data;
  },
);

export const addPostComments = createAsyncThunk(
  'comments/addPostComments',
  async ({ text, id }: { text: string; id: string }) => {
    const { data } = await axios.post<IComment>(`/comment/`, { text, postId: id });

    return data;
  },
);

interface CommentsState {
  postComments: IComment[];
  statuse: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CommentsState = {
  postComments: [],
  statuse: 'idle',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearPostComments(state) {
      state.postComments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.statuse = 'pending';
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
      state.postComments = action.payload;
      state.statuse = 'succeeded';
    });
    builder.addCase(fetchPostComments.rejected, (state, action) => {
      state.statuse = 'failed';
    });
    builder.addCase(addPostComments.fulfilled, (state, action: PayloadAction<IComment>) => {
      const a = {};
      state.postComments.unshift(action.payload);
    });
  },
});

export default commentsSlice.reducer;

export const { clearPostComments } = commentsSlice.actions;
