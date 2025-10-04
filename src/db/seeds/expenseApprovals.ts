import { db } from '@/db';
import { expenseApprovals } from '@/db/schema';

async function main() {
    const sampleExpenseApprovals = [
        // Approved expenses - Step 1 (Manager approval)
        {
            expenseId: 1,
            approverId: 5,
            status: 'approved',
            comments: 'Legitimate business meal with client. Approved.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-16T10:30:00Z').toISOString(),
            createdAt: new Date('2024-01-16T09:00:00Z').toISOString(),
        },
        // Approved expenses - Step 2 (Admin/Finance approval)
        {
            expenseId: 1,
            approverId: 6,
            status: 'approved',
            comments: 'Receipt verified, amount reasonable. Final approval.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-17T14:15:00Z').toISOString(),
            createdAt: new Date('2024-01-16T10:30:00Z').toISOString(),
        },
        
        // Expense 3 - Approved workflow
        {
            expenseId: 3,
            approverId: 5,
            status: 'approved',
            comments: 'Conference attendance pre-approved. Valid expense.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-18T11:45:00Z').toISOString(),
            createdAt: new Date('2024-01-18T08:30:00Z').toISOString(),
        },
        {
            expenseId: 3,
            approverId: 6,
            status: 'approved',
            comments: 'Educational expense within budget. Approved.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-19T09:20:00Z').toISOString(),
            createdAt: new Date('2024-01-18T11:45:00Z').toISOString(),
        },

        // Expense 5 - Approved workflow
        {
            expenseId: 5,
            approverId: 5,
            status: 'approved',
            comments: 'Office supplies purchase justified. Approved.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-20T13:30:00Z').toISOString(),
            createdAt: new Date('2024-01-20T10:15:00Z').toISOString(),
        },
        {
            expenseId: 5,
            approverId: 6,
            status: 'approved',
            comments: 'Within office supplies budget. Final approval.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-21T08:45:00Z').toISOString(),
            createdAt: new Date('2024-01-20T13:30:00Z').toISOString(),
        },

        // Expense 8 - Approved workflow
        {
            expenseId: 8,
            approverId: 11,
            status: 'approved',
            comments: 'Marketing event expense pre-approved. Valid.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-22T15:20:00Z').toISOString(),
            createdAt: new Date('2024-01-22T12:00:00Z').toISOString(),
        },
        {
            expenseId: 8,
            approverId: 12,
            status: 'approved',
            comments: 'Marketing budget allows this expense. Approved.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-23T10:30:00Z').toISOString(),
            createdAt: new Date('2024-01-22T15:20:00Z').toISOString(),
        },

        // Expense 12 - Approved workflow
        {
            expenseId: 12,
            approverId: 11,
            status: 'approved',
            comments: 'Client dinner expense reasonable. Approved.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-24T16:45:00Z').toISOString(),
            createdAt: new Date('2024-01-24T14:30:00Z').toISOString(),
        },
        {
            expenseId: 12,
            approverId: 12,
            status: 'approved',
            comments: 'Entertainment expense within limits. Final approval.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-25T11:15:00Z').toISOString(),
            createdAt: new Date('2024-01-24T16:45:00Z').toISOString(),
        },

        // Expense 15 - Approved workflow
        {
            expenseId: 15,
            approverId: 17,
            status: 'approved',
            comments: 'Training course beneficial for role. Approved.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-26T12:30:00Z').toISOString(),
            createdAt: new Date('2024-01-26T09:45:00Z').toISOString(),
        },
        {
            expenseId: 15,
            approverId: 18,
            status: 'approved',
            comments: 'Professional development expense approved.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-27T14:20:00Z').toISOString(),
            createdAt: new Date('2024-01-26T12:30:00Z').toISOString(),
        },

        // Expense 20 - Approved workflow
        {
            expenseId: 20,
            approverId: 17,
            status: 'approved',
            comments: 'Project-related travel expense. Approved.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-28T10:15:00Z').toISOString(),
            createdAt: new Date('2024-01-28T08:00:00Z').toISOString(),
        },
        {
            expenseId: 20,
            approverId: 18,
            status: 'approved',
            comments: 'Travel expense within policy. Final approval.',
            stepOrder: 2,
            approvedAt: new Date('2024-01-29T13:45:00Z').toISOString(),
            createdAt: new Date('2024-01-28T10:15:00Z').toISOString(),
        },

        // Rejected expenses - Step 1 rejections
        {
            expenseId: 4,
            approverId: 5,
            status: 'rejected',
            comments: 'Personal meal expense not covered by company policy. Amount too high for business meal.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-19T14:30:00Z').toISOString(),
            createdAt: new Date('2024-01-19T11:15:00Z').toISOString(),
        },

        {
            expenseId: 7,
            approverId: 5,
            status: 'rejected',
            comments: 'No prior approval for this software purchase. Please get approval before making such purchases.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-21T16:20:00Z').toISOString(),
            createdAt: new Date('2024-01-21T13:45:00Z').toISOString(),
        },

        {
            expenseId: 11,
            approverId: 11,
            status: 'rejected',
            comments: 'Expense lacks proper documentation. Receipt unclear and amount seems excessive.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-23T15:10:00Z').toISOString(),
            createdAt: new Date('2024-01-23T12:30:00Z').toISOString(),
        },

        {
            expenseId: 16,
            approverId: 17,
            status: 'rejected',
            comments: 'Travel expense not pre-approved and exceeds policy limits for this type of trip.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-26T17:45:00Z').toISOString(),
            createdAt: new Date('2024-01-26T15:20:00Z').toISOString(),
        },

        {
            expenseId: 25,
            approverId: 23,
            status: 'rejected',
            comments: 'Equipment purchase requires IT department approval first. Please follow proper procurement process.',
            stepOrder: 1,
            approvedAt: new Date('2024-01-30T11:30:00Z').toISOString(),
            createdAt: new Date('2024-01-30T09:15:00Z').toISOString(),
        },

        {
            expenseId: 28,
            approverId: 23,
            status: 'rejected',
            comments: 'Marketing expense not aligned with current campaign budget. Needs marketing director approval.',
            stepOrder: 1,
            approvedAt: new Date('2024-02-01T14:15:00Z').toISOString(),
            createdAt: new Date('2024-02-01T11:45:00Z').toISOString(),
        },

        {
            expenseId: 32,
            approverId: 29,
            status: 'rejected',
            comments: 'Meal expense appears to be personal rather than business-related. Missing business justification.',
            stepOrder: 1,
            approvedAt: new Date('2024-02-03T13:20:00Z').toISOString(),
            createdAt: new Date('2024-02-03T10:30:00Z').toISOString(),
        },

        // Pending expenses - Step 1 pending approvals
        {
            expenseId: 2,
            approverId: 5,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-17T14:20:00Z').toISOString(),
        },

        {
            expenseId: 6,
            approverId: 5,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-20T16:30:00Z').toISOString(),
        },

        {
            expenseId: 9,
            approverId: 11,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-22T09:45:00Z').toISOString(),
        },

        {
            expenseId: 10,
            approverId: 11,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-23T08:15:00Z').toISOString(),
        },

        {
            expenseId: 13,
            approverId: 11,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-24T17:30:00Z').toISOString(),
        },

        {
            expenseId: 14,
            approverId: 17,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-25T13:45:00Z').toISOString(),
        },

        {
            expenseId: 17,
            approverId: 17,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-27T10:20:00Z').toISOString(),
        },

        {
            expenseId: 18,
            approverId: 17,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-28T15:10:00Z').toISOString(),
        },

        {
            expenseId: 19,
            approverId: 17,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-29T11:35:00Z').toISOString(),
        },

        {
            expenseId: 22,
            approverId: 23,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-30T14:50:00Z').toISOString(),
        },

        {
            expenseId: 24,
            approverId: 23,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-01-31T12:25:00Z').toISOString(),
        },

        {
            expenseId: 26,
            approverId: 23,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-02-01T09:40:00Z').toISOString(),
        },

        {
            expenseId: 30,
            approverId: 29,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-02-02T16:15:00Z').toISOString(),
        },

        {
            expenseId: 34,
            approverId: 29,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-02-04T13:30:00Z').toISOString(),
        },

        {
            expenseId: 36,
            approverId: 29,
            status: 'pending',
            comments: null,
            stepOrder: 1,
            approvedAt: null,
            createdAt: new Date('2024-02-05T10:45:00Z').toISOString(),
        },
    ];

    await db.insert(expenseApprovals).values(sampleExpenseApprovals);
    
    console.log('✅ Expense approvals seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});