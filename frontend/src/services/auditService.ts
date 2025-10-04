import { apiClient } from './apiClient';
import type { AuditEvent, PaginatedResponse } from '@/types';

export const auditService = {
  /**
   * Get audit events
   */
  async getAuditEvents(params?: {
    entityType?: string;
    entityId?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<AuditEvent>> {
    const response = await apiClient.get<PaginatedResponse<AuditEvent>>('/audit', {
      params,
    });
    return response.data;
  },

  /**
   * Get audit events for a specific entity
   */
  async getEntityAuditTrail(
    entityType: string,
    entityId: string
  ): Promise<AuditEvent[]> {
    const response = await apiClient.get<AuditEvent[]>(
      `/audit/${entityType}/${entityId}`
    );
    return response.data;
  },

  /**
   * Export audit log to CSV
   */
  async exportAuditLog(params?: {
    startDate?: Date;
    endDate?: Date;
    entityType?: string;
  }): Promise<Blob> {
    const response = await apiClient.get('/audit/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
