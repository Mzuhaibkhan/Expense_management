import { ExpenseStatus, TaskStatus, UserRole, ExpenseCategory } from '@/types';

/**
 * Get status color for badges
 */
export const getStatusColor = (
  status: ExpenseStatus | TaskStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  switch (status) {
    case ExpenseStatus.APPROVED:
    case TaskStatus.APPROVED:
      return 'success';
    case ExpenseStatus.PENDING:
    case TaskStatus.OPEN:
      return 'warning';
    case ExpenseStatus.REJECTED:
    case TaskStatus.REJECTED:
      return 'error';
    case ExpenseStatus.DRAFT:
      return 'default';
    default:
      return 'info';
  }
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.MANAGER:
      return 'Manager';
    case UserRole.EMPLOYEE:
      return 'Employee';
    default:
      return role;
  }
};

/**
 * Get category display name
 */
export const getCategoryDisplayName = (category: ExpenseCategory): string => {
  switch (category) {
    case ExpenseCategory.TRAVEL:
      return 'Travel';
    case ExpenseCategory.MEALS:
      return 'Meals & Entertainment';
    case ExpenseCategory.OFFICE:
      return 'Office Supplies';
    case ExpenseCategory.SOFTWARE:
      return 'Software & Tools';
    case ExpenseCategory.EQUIPMENT:
      return 'Equipment';
    case ExpenseCategory.OTHER:
      return 'Other';
    default:
      return category;
  }
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category: ExpenseCategory): string => {
  switch (category) {
    case ExpenseCategory.TRAVEL:
      return '✈️';
    case ExpenseCategory.MEALS:
      return '🍽️';
    case ExpenseCategory.OFFICE:
      return '📎';
    case ExpenseCategory.SOFTWARE:
      return '💻';
    case ExpenseCategory.EQUIPMENT:
      return '🖥️';
    case ExpenseCategory.OTHER:
      return '📦';
    default:
      return '📄';
  }
};

/**
 * Check if user has permission
 */
export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy = {
    [UserRole.ADMIN]: 3,
    [UserRole.MANAGER]: 2,
    [UserRole.EMPLOYEE]: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Check if user can approve expense
 */
export const canApproveExpense = (userRole: UserRole): boolean => {
  return userRole === UserRole.ADMIN || userRole === UserRole.MANAGER;
};

/**
 * Check if user can manage workflows
 */
export const canManageWorkflows = (userRole: UserRole): boolean => {
  return userRole === UserRole.ADMIN;
};

/**
 * Check if user can manage users
 */
export const canManageUsers = (userRole: UserRole): boolean => {
  return userRole === UserRole.ADMIN;
};
