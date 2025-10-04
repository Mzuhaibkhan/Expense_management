import { apiClient } from './apiClient';
import type {
  Expense,
  CreateExpenseRequest,
  UpdateExpenseRequest,
  ExpenseFilters,
  PaginatedResponse,
  OCRData,
} from '@/types';

export const expenseService = {
  /**
   * Create a new expense
   */
  async createExpense(data: CreateExpenseRequest): Promise<Expense> {
    const formData = new FormData();

    // Add text fields
    formData.append('amountOriginal', data.amountOriginal.toString());
    formData.append('currencyOriginal', data.currencyOriginal);
    formData.append('category', data.category);
    formData.append('description', data.description);
    formData.append('date', data.date.toISOString());

    if (data.merchant) {
      formData.append('merchant', data.merchant);
    }

    if (data.useOCR !== undefined) {
      formData.append('useOCR', data.useOCR.toString());
    }

    // Add files
    if (data.receiptFiles && data.receiptFiles.length > 0) {
      data.receiptFiles.forEach((file) => {
        formData.append('receipts', file);
      });
    }

    // Add expense lines
    if (data.expenseLines) {
      formData.append('expenseLines', JSON.stringify(data.expenseLines));
    }

    const response = await apiClient.post<Expense>('/expenses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Get expense by ID
   */
  async getExpense(id: string): Promise<Expense> {
    const response = await apiClient.get<Expense>(`/expenses/${id}`);
    return response.data;
  },

  /**
   * Get all expenses with filters
   */
  async getExpenses(filters?: ExpenseFilters): Promise<PaginatedResponse<Expense>> {
    const response = await apiClient.get<PaginatedResponse<Expense>>('/expenses', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get user's own expenses
   */
  async getMyExpenses(filters?: ExpenseFilters): Promise<PaginatedResponse<Expense>> {
    const response = await apiClient.get<PaginatedResponse<Expense>>('/expenses/my', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Update expense
   */
  async updateExpense(id: string, data: UpdateExpenseRequest): Promise<Expense> {
    const response = await apiClient.patch<Expense>(`/expenses/${id}`, data);
    return response.data;
  },

  /**
   * Delete expense
   */
  async deleteExpense(id: string): Promise<void> {
    await apiClient.delete(`/expenses/${id}`);
  },

  /**
   * Resubmit a rejected expense
   */
  async resubmitExpense(id: string): Promise<Expense> {
    const response = await apiClient.post<Expense>(`/expenses/${id}/resubmit`);
    return response.data;
  },

  /**
   * Upload receipt and get OCR data
   */
  async uploadReceipt(file: File): Promise<OCRData> {
    const formData = new FormData();
    formData.append('receipt', file);

    const response = await apiClient.post<OCRData>('/expenses/ocr/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Get expense statistics
   */
  async getExpenseStatistics(filters?: { startDate?: Date; endDate?: Date }) {
    const response = await apiClient.get('/expenses/statistics', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Export expenses to CSV
   */
  async exportExpenses(filters?: ExpenseFilters): Promise<Blob> {
    const response = await apiClient.get('/expenses/export', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },
};
