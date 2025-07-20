import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ProductType } from '../../types/Product';
// import { Appointment, AppState } from '../../types';
// import { mockDoctors } from '../../utils/mockData';
// import { SupportedLanguage } from '../../translations/index';

const initialState: AppState = {
  productTypes: Array<ProductType>(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProductTypes(state, action: PayloadAction<Array<ProductType>>) {
      console.log('setProductTypes action.payload:', action.payload);
      state.productTypes = action.payload;
    },
  },
});

export const { setProductTypes } = appSlice.actions;

export default appSlice.reducer;
