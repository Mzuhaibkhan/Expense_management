import { apiClient } from './apiClient';
import type {
  ApprovalTask,
  ApprovalDecisionRequest,
  ApprovalFilters,
  PaginatedResponse,
} from '@/types';

export const approvalService = {
  /**
   * Get pending approvals for current user
   */
  async getPendingApprovals(
    filters?: ApprovalFilters
  ): Promise<PaginatedResponse<ApprovalTask>> {
    const response = await apiClient.get<PaginatedResponse<ApprovalTask>>(
      '/approvals/pending',
      {
        params: filters,
      }
    );
    return response.data;
  },

  /**
   * Get all approvals (admin/manager view)
   */
  async getAllApprovals(
    filters?: ApprovalFilters
  ): Promise<PaginatedResponse<ApprovalTask>> {
    const response = await apiClient.get<PaginatedResponse<ApprovalTask>>(
      '/approvals',
      {
        params: filters,
      }
    );
    return response.data;
  },

  /**
   * Get approval task by ID
   */
  async getApprovalTask(id: string): Promise<ApprovalTask> {
    const response = await apiClient.get<ApprovalTask>(`/approvals/${id}`);
    return response.data;
  },

  /**
   * Make approval decision (approve/reject)
   */
  async makeDecision(
    taskId: string,
    decision: ApprovalDecisionRequest
  ): Promise<ApprovalTask> {
    const response = await apiClient.post<ApprovalTask>(
      `/approvals/${taskId}/decision`,
      decision
    );
    return response.data;
  },

  /**
   * Get approval history for an expense
   */
  async getExpenseApprovalHistory(expenseId: string): Promise<ApprovalTask[]> {
    const response = await apiClient.get<ApprovalTask[]>(
      `/approvals/expense/${expenseId}/history`
    );
    return response.data;
  },

  /**
   * Get approval statistics
   */
  async getApprovalStatistics() {
    const response = await apiClient.get('/approvals/statistics');
    return response.data;
  },

  /**
   * Escalate approval to next level or backup approver
   */
  async escalateApproval(taskId: string, reason?: string): Promise<ApprovalTask> {
    const response = await apiClient.post<ApprovalTask>(
      `/approvals/${taskId}/escalate`,
      { reason }
    );
    return response.data;
  },
};
