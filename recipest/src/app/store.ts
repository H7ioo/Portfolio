import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
const logger = createLogger();
import userReducer from "../features/user/userSlice";
import appReducer from "../features/app/appSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
