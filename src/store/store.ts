import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import expensesReducer from './slices/expensesSlice';
import approvalsReducer from './slices/approvalsSlice';
import settingsReducer from './slices/settingsSlice';
import { apiSlice } from './services/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    expenses: expensesReducer,
    approvals: approvalsReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;