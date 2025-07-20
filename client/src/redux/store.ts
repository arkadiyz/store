import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import errorReducer from './slices/errorSlice';
import loaderReducer from './slices/loaderSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    error: errorReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
