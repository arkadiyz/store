import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, PageStatus, ProductType } from '../../types/Product';

const initialState: AppState = {
  productTypes: Array<ProductType>(),
  pageStatus: {
    pageNum: 1,
    pageSize: 10,
    totalPages: 0,
    totalProducts: 0,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProductTypes(state, action: PayloadAction<Array<ProductType>>) {
      state.productTypes = action.payload;
    },
    setStartPage(state, action: PayloadAction<PageStatus>) {
      state.pageStatus = {
        ...state.pageStatus,
        ...action.payload,
      };
    },
    setNewPage(state, action: PayloadAction<number>) {
      state.pageStatus.pageNum = action.payload;
    },

    setTotalRowsInPage(state, action: PayloadAction<number>) {
      state.pageStatus.pageSize = action.payload;
    },
  },
});

export const { setProductTypes, setStartPage, setNewPage, setTotalRowsInPage } = appSlice.actions;

export default appSlice.reducer;
