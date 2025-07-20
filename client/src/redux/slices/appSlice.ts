import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, PageStatus, ProductType } from '../../types/Product';

const initialState: AppState = {
  productTypes: Array<ProductType>(),
  pageStatus: {
    currentPage: 1,
    pageSize: 10,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProductTypes(state, action: PayloadAction<Array<ProductType>>) {
      state.productTypes = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<PageStatus>) {},
  },
});

export const { setProductTypes } = appSlice.actions;

export default appSlice.reducer;
