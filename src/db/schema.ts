import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const companies = sqliteTable('companies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  country: text('country').notNull(),
  currency: text('currency').notNull(),
  createdAt: text('created_at').notNull(),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').references(() => companies.id).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  managerId: integer('manager_id').references(() => users.id),
  createdAt: text('created_at').notNull(),
});

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').references(() => companies.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull(),
  amountInCompanyCurrency: real('amount_in_company_currency').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  expenseDate: text('expense_date').notNull(),
  receiptUrl: text('receipt_url'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const approvalWorkflows = sqliteTable('approval_workflows', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').references(() => companies.id).notNull(),
  name: text('name').notNull(),
  isManagerApprover: integer('is_manager_approver', { mode: 'boolean' }).default(true),
  approvalType: text('approval_type').notNull(),
  conditionRule: text('condition_rule'),
  createdAt: text('created_at').notNull(),
});

export const workflowSteps = sqliteTable('workflow_steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  workflowId: integer('workflow_id').references(() => approvalWorkflows.id).notNull(),
  approverId: integer('approver_id').references(() => users.id).notNull(),
  stepOrder: integer('step_order').notNull(),
  createdAt: text('created_at').notNull(),
});

export const expenseApprovals = sqliteTable('expense_approvals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  expenseId: integer('expense_id').references(() => expenses.id).notNull(),
  approverId: integer('approver_id').references(() => users.id).notNull(),
  status: text('status').notNull().default('pending'),
  comments: text('comments'),
  stepOrder: integer('step_order').notNull(),
  approvedAt: text('approved_at'),
  createdAt: text('created_at').notNull(),
});