import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UsersSlice"
import ChatReducer from "./slices/ChatSlice";
import ToastReducer from "./slices/ToastSlice"
export const store = configureStore({
  reducer: {
    users: UserReducer,
    chat: ChatReducer,
    toast:ToastReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch;