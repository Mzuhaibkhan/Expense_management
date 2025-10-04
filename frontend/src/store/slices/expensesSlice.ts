import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')!) : [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
      localStorage.setItem('expenses', JSON.stringify(action.payload));
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;