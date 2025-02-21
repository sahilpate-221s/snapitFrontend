import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [], // List of posts
  selectedPost:null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setPosts, setSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
