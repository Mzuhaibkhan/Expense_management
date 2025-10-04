export type UserRole = 'admin' | 'manager' | 'submanager' | 'employee';

export type ExpenseStatus = 'draft' | 'waiting' | 'approved' | 'rejected';

export type ExpenseCategory = 'travel' | 'food' | 'office_supplies' | 'utilities' | 'entertainment' | 'other';

export type PaymentMethod = 'cash' | 'credit_card' | 'company_card' | 'bank_transfer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  managerId?: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  baseCurrency: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  userName: string;
  description: string;
  date: string;
  category: ExpenseCategory;
  paidBy: PaymentMethod;
  amount: number;
  currency: string;
  convertedAmount?: number;
  remarks?: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface ApprovalRule {
  id: string;
  name: string;
  sequence: number;
  approverIds: string[];
  percentageRequired?: number;
  specificApprover?: string;
  isHybrid: boolean;
}

export interface Country {
  name: {
    common: string;
  };
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface ExchangeRates {
  base: string;
  rates: {
    [currency: string]: number;
  };
}