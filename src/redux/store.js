import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
