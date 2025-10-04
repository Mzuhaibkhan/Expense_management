import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Company } from '../../types';

interface SettingsState {
  company: Company | null;
}

const mockCompany: Company = {
  id: 'company-1',
  name: 'ExpenseFlow Demo Inc.',
  baseCurrency: 'USD',
  createdAt: new Date().toISOString(),
};

const initialState: SettingsState = {
  company: localStorage.getItem('company') ? JSON.parse(localStorage.getItem('company')!) : mockCompany,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
      localStorage.setItem('company', JSON.stringify(action.payload));
    },
    updateCompany: (state, action: PayloadAction<Partial<Company>>) => {
      if (state.company) {
        state.company = { ...state.company, ...action.payload };
        localStorage.setItem('company', JSON.stringify(state.company));
      }
    },
  },
});

export const { setCompany, updateCompany } = settingsSlice.actions;
export default settingsSlice.reducer;