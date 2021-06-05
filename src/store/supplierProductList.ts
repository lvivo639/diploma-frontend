import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import errorToString from '../common/errorToString';
import { SupplierProductListState } from '../common/types';
import { sendRequest } from './auth';

const initialState: SupplierProductListState = {
  productList: [],
  isLoading: false,
  error: '',
};

const startLoading = (state: SupplierProductListState) => {
  state.isLoading = true;
  state.error = '';
};

const loadingFailed = (
  state: SupplierProductListState,
  action: PayloadAction<any>,
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const { actions, reducer } = createSlice({
  name: 'supplierProductList',
  initialState,
  reducers: {
    resetError(state) {
      state.error = '';
    },
    resetState(state) {
      state.productList = initialState.productList;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },

    getProductListRequest: startLoading,
    getProductListSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = '';
      state.productList = action.payload;
    },
    getProductListFailure: loadingFailed,
  },
});

export const {
  resetError,
  resetState,
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
} = actions;

export const resetAllErrors =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetError());
  };

export const resetSupplierProductListState =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetState());
  };

export const getSupplierProductList =
  (supplier_setting_id: number | undefined) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      if (supplier_setting_id === undefined) {
        dispatch(getProductListFailure('supplier_setting_id is undefined'));
        return;
      }

      dispatch(getProductListRequest());

      const filterParams = new URLSearchParams({
        supplier_setting: supplier_setting_id.toString(),
      });

      const response: any = await dispatch(
        sendRequest('get', `/products?${filterParams}`),
      );
      dispatch(getProductListSuccess(response.data || []));
    } catch (error) {
      dispatch(getProductListFailure(errorToString(error)));
    }
  };

export default reducer;
