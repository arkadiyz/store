import { createSlice } from '@reduxjs/toolkit';
import { LoaderState } from '../../types/Product';

const initialState: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
