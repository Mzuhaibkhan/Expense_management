import { apiClient } from './apiClient';
import type {
  WorkflowDefinition,
  CreateWorkflowRequest,
  PaginatedResponse,
} from '@/types';

export const workflowService = {
  /**
   * Create a new workflow definition
   */
  async createWorkflow(data: CreateWorkflowRequest): Promise<WorkflowDefinition> {
    const response = await apiClient.post<WorkflowDefinition>('/workflows', data);
    return response.data;
  },

  /**
   * Get workflow by ID
   */
  async getWorkflow(id: string): Promise<WorkflowDefinition> {
    const response = await apiClient.get<WorkflowDefinition>(`/workflows/${id}`);
    return response.data;
  },

  /**
   * Get all workflows
   */
  async getWorkflows(): Promise<PaginatedResponse<WorkflowDefinition>> {
    const response = await apiClient.get<PaginatedResponse<WorkflowDefinition>>(
      '/workflows'
    );
    return response.data;
  },

  /**
   * Update workflow
   */
  async updateWorkflow(
    id: string,
    data: Partial<CreateWorkflowRequest>
  ): Promise<WorkflowDefinition> {
    const response = await apiClient.patch<WorkflowDefinition>(
      `/workflows/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete workflow
   */
  async deleteWorkflow(id: string): Promise<void> {
    await apiClient.delete(`/workflows/${id}`);
  },

  /**
   * Activate/deactivate workflow
   */
  async toggleWorkflowStatus(id: string, isActive: boolean): Promise<WorkflowDefinition> {
    const response = await apiClient.patch<WorkflowDefinition>(
      `/workflows/${id}/status`,
      { isActive }
    );
    return response.data;
  },

  /**
   * Get active workflow for company
   */
  async getActiveWorkflow(): Promise<WorkflowDefinition | null> {
    const response = await apiClient.get<WorkflowDefinition>('/workflows/active');
    return response.data;
  },

  /**
   * Test workflow with sample data
   */
  async testWorkflow(id: string, sampleExpenseData: any): Promise<any> {
    const response = await apiClient.post(`/workflows/${id}/test`, sampleExpenseData);
    return response.data;
  },
};
