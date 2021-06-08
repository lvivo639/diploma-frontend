import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import apiClient from '../common/apiClient';
import { AuthState, RootState, Token } from '../common/types';

const initialState: AuthState = {
  token: null,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state: AuthState) {
      state.token = initialState.token;
    },
    setToken(state: AuthState, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
  },
});

export const { setToken, resetState } = actions;

export const sendRequest =
  (
    method: string,
    url: string,
    payload: any = null,
    query: any = {},
    options: any = {},
  ) =>
  async (dispatch: Dispatch<any>, getState: () => RootState): Promise<any> => {
    try {
      const {
        auth: { token },
      } = getState();

      const finalUrl = query ? url + '?' + new URLSearchParams(query) : url;

      const optionsFinal = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      if (method === 'post') {
        return apiClient.post(finalUrl, payload, optionsFinal);
      }
      if (method === 'put') {
        return apiClient.put(finalUrl, payload, optionsFinal);
      }
      if (method === 'delete') {
        return apiClient.delete(finalUrl, optionsFinal);
      }
      return apiClient.get(finalUrl, optionsFinal);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const resetAuthState =
  () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    dispatch(resetState());
  };

export default reducer;
