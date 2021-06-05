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
  (method: string, url: string, payload: any = null, options: any = {}) =>
  async (dispatch: Dispatch<any>, getState: () => RootState): Promise<any> => {
    try {
      const {
        auth: { token },
      } = getState();

      const optionsFinal = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      if (method === 'post') {
        return apiClient.post(url, payload, optionsFinal);
      }
      if (method === 'put') {
        return apiClient.put(url, payload, optionsFinal);
      }
      if (method === 'delete') {
        return apiClient.delete(url, optionsFinal);
      }
      return apiClient.get(url, optionsFinal);
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
