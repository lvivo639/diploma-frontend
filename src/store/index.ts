import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: 'tokens',
        storage,
      },
      authReducer,
    ),
    user: persistReducer({ key: 'user', storage }, userReducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
