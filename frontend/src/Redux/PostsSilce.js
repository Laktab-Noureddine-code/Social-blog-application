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
    // paginatePost: (state, action) => {
    //   // Append new posts to the end of the existing posts array
    //   state.posts = [...state.posts, ...action.payload];
    // },
    paginatePost: (state, action) => {
      const existingIds = new Set(state.posts.map((post) => post.id));
      const newUniquePosts = action.payload.filter(
        (post) => !existingIds.has(post.id)
      );
      state.posts = [...state.posts, ...newUniquePosts];
    },

    NewPosts: (state, action) => {
      state.NewPosts = action.payload;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((page) => page.id !== action.payload.id);
    },
    updateComments: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        post.comments = response; // mutate directly thanks to Immer
      }
    },
    addSaves: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        // Add user only if not already saved
        const alreadySaved = post.saved_by_users?.some(
          (user) => user.id === response.id
        );
        if (!alreadySaved) {
          post.saved_by_users = [...(post.saved_by_users || []), response];
        }
      }
    },
    addhiddenByUsers: (state, action) => {
      const { idPost, response } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === idPost);
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        const alreadyHidden = post.hidden_by_users?.some(
          (user) => user.id === response.id
        );

        if (!alreadyHidden) {
          const updatedPost = {
            ...post,
            hidden_by_users: [...(post.hidden_by_users || []), response],
          };
          state.posts[postIndex] = updatedPost;
        }
      }
    },

    removeHide: (state, action) => {
      const { idPost, response } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === idPost);
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        const updatedPost = {
          ...post,
          hidden_by_users:
            post.hidden_by_users?.filter((user) => user.id !== response.id) ||
            [],
        };
        state.posts[postIndex] = updatedPost;
      }
    },
    addRapport: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        // Add user only if not already saved
        const reports = post.reports?.some((user) => user.id === response.id);
        if (!reports) {
          post.reports = [...(post.reports || []), response];
        }
      }
    },

    removeSaves: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        post.saved_by_users = post.saved_by_users?.filter(
          (user) => user.id !== response.id
        );
      }
    },
    // removeHide: (state, action) => {
    //   const { idPost, response } = action.payload;
    //   const post = state.posts.find((post) => post.id === idPost);
    //   if (post) {
    //     post.hidden_by_users = post.hidden_by_users?.filter(
    //       (user) => user.id !== response.id
    //     );
    //   }
    // },
    removeRapport: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        post.reports = post.reports?.filter((user) => user.id !== response.id);
      }
    },
    updateReports: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) {
        post.reports = response; // mutate directly thanks to Immer
      }
    },
    updateLikes: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) post.likes = response;
    },
    hide: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) post.hide = response;
    },
    UnHide: (state, action) => {
      const { idPost, response } = action.payload;
      const post = state.posts.find((post) => post.id === idPost);
      if (post) post.hide = response;
    },
  },
});

export const {
  uploadPosts,
  NewPosts,
  addNewPost,
  updateComments,
  updateLikes,
  updateReports,
  addSaves,
  removeSaves,
  addRapport,
  removeRapport,
  hide,
  addhiddenByUsers,
  removeHide,
  UnHide,
  removePost,
  paginatePost,
} = PostsSlice.actions;

export default PostsSlice.reducer;
