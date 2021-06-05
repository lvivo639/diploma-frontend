import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../common/apiClient';
import errorToString from '../common/errorToString';
import { RootState, UserState } from '../common/types';
import { sendRequest, setToken } from './auth';

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  isSignIn: false,
  error: '',
};

const startLoading = (state: UserState) => {
  state.isLoading = true;
  state.error = '';
};

// const loadingSuccess = (state: UserState) => {
//   state.isLoading = false;
//   state.error = '';
// };

const loadingFailed = (state: UserState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      state.error = '';
    },
    resetState(state) {
      state.currentUser = initialState.currentUser;
      state.isLoading = initialState.isLoading;
      state.isSignIn = initialState.isSignIn;
      state.error = initialState.error;
    },

    registerRequest: startLoading,
    registerFailure: loadingFailed,

    signInRequest: startLoading,
    signInSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = '';
      state.isSignIn = true;
      state.currentUser = action.payload;
    },
    signInFailure: loadingFailed,

    getCurrentUserRequest: startLoading,
    getCurrentUserSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = '';
      state.currentUser = action.payload;
    },
    getCurrentUserFailure: loadingFailed,

    logoutFailure: loadingFailed,
  },
});

export const {
  resetError,
  resetState,

  registerRequest,
  registerFailure,

  signInRequest,
  signInSuccess,
  signInFailure,

  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,

  logoutFailure,
} = actions;

export const resetAllErrors =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetError());
  };

export const resetUserState =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(resetState());
  };

export const register =
  (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string,
    password: string,
  ) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(registerRequest());
      const payload = {
        firstName,
        lastName,
        username,
        email,
        role,
        password,
      };

      const response = await apiClient.post('/auth/local/register', payload);
      dispatch(setToken(response.data.jwt));
      dispatch(signInSuccess(response.data.user));
    } catch (error) {
      dispatch(registerFailure(errorToString(error)));
    }
  };

export const signIn =
  (email: string, password: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(signInRequest());
      const payload = {
        identifier: email,
        password,
      };
      const response = await apiClient.post('/auth/local', payload);
      dispatch(setToken(response.data.jwt));
      dispatch(signInSuccess(response.data.user));
    } catch (error) {
      dispatch(signInFailure(errorToString(error)));
    }
  };

export const getCurrentUser =
  () =>
  async (dispatch: Dispatch<any>, getState: () => RootState): Promise<void> => {
    try {
      dispatch(getCurrentUserRequest());
      const url = '/users/me';
      const {
        auth: { token },
      } = getState();

      if (token) {
        const response: any = await dispatch(sendRequest('get', url));
        dispatch(getCurrentUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(getCurrentUserFailure(errorToString(error)));
    }
  };

export default reducer;
