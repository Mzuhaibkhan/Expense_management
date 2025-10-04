// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum ExpenseStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum TaskStatus {
  OPEN = 'OPEN',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DecisionType {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export enum AssigneeType {
  ROLE = 'ROLE',
  USER = 'USER',
  MANAGER_OF_SUBMITTER = 'MANAGER_OF_SUBMITTER',
}

export enum ConditionalRuleType {
  PERCENTAGE = 'PERCENTAGE',
  SPECIFIC_APPROVER = 'SPECIFIC_APPROVER',
  HYBRID = 'HYBRID',
}

export enum ExpenseCategory {
  TRAVEL = 'TRAVEL',
  MEALS = 'MEALS',
  OFFICE = 'OFFICE',
  SOFTWARE = 'SOFTWARE',
  EQUIPMENT = 'EQUIPMENT',
  OTHER = 'OTHER',
}

// Base Types
export interface User {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: UserRole;
  managerId?: string;
  manager?: User;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  defaultCurrencyCode: string;
  currencySymbol: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // Country code
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface FXRate {
  base: string;
  quote: string;
  rate: number;
  timestamp: Date;
  source: string;
}

export interface ExpenseLine {
  id?: string;
  description: string;
  amount: number;
  quantity?: number;
  category?: ExpenseCategory;
}

export interface OCRData {
  amount?: number;
  currencyGuess?: string;
  date?: string;
  merchant?: string;
  items?: ExpenseLine[];
  confidenceScores?: {
    amount?: number;
    date?: number;
    merchant?: number;
  };
  rawText?: string;
}

export interface Expense {
  id: string;
  companyId: string;
  employeeId: string;
  employee?: User;
  amountOriginal: number;
  currencyOriginal: string;
  amountCompany: number;
  currencyCompany: string;
  fxRate?: number;
  fxTimestamp?: Date;
  category: ExpenseCategory;
  description: string;
  merchant?: string;
  date: Date;
  status: ExpenseStatus;
  receiptUrl?: string;
  receiptFiles?: File[];
  ocrData?: OCRData;
  expenseLines?: ExpenseLine[];
  workflowDefinitionId?: string;
  createdAt: Date;
  updatedAt: Date;
  approvalTasks?: ApprovalTask[];
  auditEvents?: AuditEvent[];
}

export interface ConditionalRule {
  type: ConditionalRuleType;
  thresholdPct?: number; // For PERCENTAGE type
  specificApproverUserIds?: string[]; // For SPECIFIC_APPROVER type
  operator?: 'OR' | 'AND'; // For HYBRID type
}

export interface WorkflowStep {
  id: string;
  definitionId: string;
  order: number;
  assigneeType: AssigneeType;
  assigneeIds?: string[]; // User IDs or Role names
  isManagerApprover?: boolean; // Shortcut for MANAGER_OF_SUBMITTER
}

export interface WorkflowDefinition {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  steps: WorkflowStep[];
  conditionalRule?: ConditionalRule;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalTask {
  id: string;
  expenseId: string;
  expense?: Expense;
  stepOrder: number;
  assignedUserId: string;
  assignedUser?: User;
  status: TaskStatus;
  decision?: DecisionType;
  comment?: string;
  decidedAt?: Date;
  createdAt: Date;
}

export interface AuditEvent {
  id: string;
  entityType: 'EXPENSE' | 'APPROVAL' | 'WORKFLOW' | 'USER' | 'COMPANY';
  entityId: string;
  action: string;
  metadata?: Record<string, any>;
  userId: string;
  user?: User;
  timestamp: Date;
  ipAddress?: string;
}

// DTOs (Data Transfer Objects)
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  companyName: string;
  countryCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  company: Company;
  token: string;
  refreshToken?: string;
}

export interface CreateExpenseRequest {
  amountOriginal: number;
  currencyOriginal: string;
  category: ExpenseCategory;
  description: string;
  merchant?: string;
  date: Date;
  receiptFiles?: File[];
  expenseLines?: ExpenseLine[];
  useOCR?: boolean;
}

export interface UpdateExpenseRequest {
  amountOriginal?: number;
  currencyOriginal?: string;
  category?: ExpenseCategory;
  description?: string;
  merchant?: string;
  date?: Date;
}

export interface ApprovalDecisionRequest {
  decision: DecisionType;
  comment?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  role: UserRole;
  managerId?: string;
  password?: string;
}

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  steps: Omit<WorkflowStep, 'id' | 'definitionId'>[];
  conditionalRule?: ConditionalRule;
}

export interface FXConversionRequest {
  from: string;
  to: string;
  amount: number;
  date?: Date; // For historical rates
}

export interface FXConversionResponse {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  timestamp: Date;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filters
export interface ExpenseFilters extends PaginationParams {
  status?: ExpenseStatus;
  category?: ExpenseCategory;
  startDate?: Date;
  endDate?: Date;
  employeeId?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ApprovalFilters extends PaginationParams {
  status?: TaskStatus;
  expenseCategory?: ExpenseCategory;
  startDate?: Date;
  endDate?: Date;
}

// Dashboard & Reports
export interface ExpenseStatistics {
  totalExpenses: number;
  totalAmount: number;
  byCategory: Record<ExpenseCategory, { count: number; amount: number }>;
  byStatus: Record<ExpenseStatus, { count: number; amount: number }>;
  byCurrency: Record<string, { count: number; amount: number }>;
  averageApprovalTime?: number; // in hours
}

export interface ApprovalStatistics {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  averageTimeToDecision: number; // in hours
  approvalRate: number; // percentage
}

export interface DashboardData {
  expenseStats: ExpenseStatistics;
  approvalStats: ApprovalStatistics;
  recentExpenses: Expense[];
  pendingApprovals: ApprovalTask[];
}
