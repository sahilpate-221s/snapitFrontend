// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   collections: [],
//   loading: false,
// };

// const collectionsSlice = createSlice({
//   name: 'collections',
//   initialState,
//   reducers: {
//     setCollections(state, action) {
//       state.collections = action.payload;
//     },
//     setLoading(state, action) {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setCollections, setLoading } = collectionsSlice.actions;
// export default collectionsSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
  loading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections(state, action) {
      state.collections = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addPostSuccess(state, action) {
      const { collectionId, post } = action.payload;
      const collectionIndex = state.collections.findIndex(
        (col) => col._id === collectionId
      );

      if (collectionIndex !== -1) {
        state.collections[collectionIndex].posts.push(post);
      }
    },
    addPostFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCollections, setLoading, addPostSuccess, addPostFailure } =
  collectionsSlice.actions;
export default collectionsSlice.reducer;
