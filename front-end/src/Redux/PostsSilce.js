// Redux Toolkit version of your reducer using createSlice

import { createSlice } from "@reduxjs/toolkit";


const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    new_posts: true,
  },
  reducers: {
    uploadPosts: (state, action) => {
      state.posts = action.payload;
    },
    addNewPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    NewPosts: (state, action) => {
      state.NewPosts = action.payload;
    },
    updateComments: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        post.comments = response; // mutate directly thanks to Immer
      }
    },
    updateLikes: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) post.likes = response;
    },
  },
});

export const {
  uploadPosts,
  NewPosts,
  addNewPost,
  updateComments,
  updateLikes
} = PostsSlice.actions;

export default PostsSlice.reducer;
