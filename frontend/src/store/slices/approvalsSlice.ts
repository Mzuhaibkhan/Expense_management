import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApprovalRule } from '../../types';

interface ApprovalsState {
  rules: ApprovalRule[];
}

const initialState: ApprovalsState = {
  rules: localStorage.getItem('approvalRules') ? JSON.parse(localStorage.getItem('approvalRules')!) : [],
};

const approvalsSlice = createSlice({
  name: 'approvals',
  initialState,
  reducers: {
    setRules: (state, action: PayloadAction<ApprovalRule[]>) => {
      state.rules = action.payload;
      localStorage.setItem('approvalRules', JSON.stringify(action.payload));
    },
    addRule: (state, action: PayloadAction<ApprovalRule>) => {
      state.rules.push(action.payload);
      localStorage.setItem('approvalRules', JSON.stringify(state.rules));
    },
    updateRule: (state, action: PayloadAction<ApprovalRule>) => {
      const index = state.rules.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.rules[index] = action.payload;
        localStorage.setItem('approvalRules', JSON.stringify(state.rules));
      }
    },
    deleteRule: (state, action: PayloadAction<string>) => {
      state.rules = state.rules.filter((r) => r.id !== action.payload);
      localStorage.setItem('approvalRules', JSON.stringify(state.rules));
    },
  },
});

export const { setRules, addRule, updateRule, deleteRule } = approvalsSlice.actions;
export default approvalsSlice.reducer;