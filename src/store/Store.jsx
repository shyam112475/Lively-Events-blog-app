import { configureStore } from "@reduxjs/toolkit";
import AuthorSlice from '../slices/AuthorSlice';
import PostSlice from '../slices/PostSlice';
import LikeSlice from '../slices/LikeSlice';
import CommentSlice from '../slices/CommentSlice';

const Store = configureStore({
  reducer: {
    authors: AuthorSlice,
    posts: PostSlice,
    likes: LikeSlice,
    comments: CommentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the warning
    }),
});

export default Store;
