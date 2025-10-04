import { apiClient } from './apiClient';
import type {
  User,
  CreateUserRequest,
  PaginatedResponse,
} from '@/types';

export const userService = {
  /**
   * Create a new user
   */
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  },

  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Get all users in company
   */
  async getUsers(params?: {
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>('/users', {
      params,
    });
    return response.data;
  },

  /**
   * Update user
   */
  async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },

  /**
   * Update user status
   */
  async updateUserStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}/status`, { status });
    return response.data;
  },

  /**
   * Assign manager to user
   */
  async assignManager(userId: string, managerId: string): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${userId}/manager`, {
      managerId,
    });
    return response.data;
  },

  /**
   * Get users by role
   */
  async getUsersByRole(role: string): Promise<User[]> {
    const response = await apiClient.get<User[]>(`/users/role/${role}`);
    return response.data;
  },

  /**
   * Get managers list
   */
  async getManagers(): Promise<User[]> {
    return this.getUsersByRole('MANAGER');
  },
};
