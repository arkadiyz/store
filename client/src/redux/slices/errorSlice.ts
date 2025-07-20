import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../../types/Product';

const initialState: ErrorState = {
  errMessage: '',
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ errMessage: string }>) {
      state.errMessage = action.payload.errMessage;
    },
    clearError(state) {
      state.errMessage = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
