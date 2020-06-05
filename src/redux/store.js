import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { dashboardSlice } from './reducers/dashboardReducer';
import { userSlice } from './reducers/userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

const rootReducer = combineReducers({
  [userSlice.name]: persistedReducer,
  [dashboardSlice.name]: dashboardSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export const persistor = persistStore(store);
