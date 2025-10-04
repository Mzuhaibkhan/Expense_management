import { db } from '@/db';
import { workflowSteps } from '@/db/schema';

async function main() {
    const sampleWorkflowSteps = [
        // Standard Approval Workflow (ID: 1) - Company 1
        {
            workflowId: 1,
            approverId: 2,  // manager1 (Company 1)
            stepOrder: 1,
            createdAt: new Date('2024-01-10').toISOString(),
        },
        {
            workflowId: 1,
            approverId: 1,  // admin (Company 1)
            stepOrder: 2,
            createdAt: new Date('2024-01-10').toISOString(),
        },
        
        // Conditional Large Expense Workflow (ID: 2) - Company 1
        {
            workflowId: 2,
            approverId: 2,  // manager1 (Company 1)
            stepOrder: 1,
            createdAt: new Date('2024-01-11').toISOString(),
        },
        {
            workflowId: 2,
            approverId: 3,  // manager2/finance (Company 1)
            stepOrder: 2,
            createdAt: new Date('2024-01-11').toISOString(),
        },
        {
            workflowId: 2,
            approverId: 1,  // admin (Company 1)
            stepOrder: 3,
            createdAt: new Date('2024-01-11').toISOString(),
        },
        
        // Standard Approval Workflow (ID: 3) - Company 2
        {
            workflowId: 3,
            approverId: 9,  // manager1 (Company 2)
            stepOrder: 1,
            createdAt: new Date('2024-01-12').toISOString(),
        },
        {
            workflowId: 3,
            approverId: 8,  // admin (Company 2)
            stepOrder: 2,
            createdAt: new Date('2024-01-12').toISOString(),
        },
        
        // Conditional Large Expense Workflow (ID: 4) - Company 2
        {
            workflowId: 4,
            approverId: 9,  // manager1 (Company 2)
            stepOrder: 1,
            createdAt: new Date('2024-01-13').toISOString(),
        },
        {
            workflowId: 4,
            approverId: 10, // manager2/finance (Company 2)
            stepOrder: 2,
            createdAt: new Date('2024-01-13').toISOString(),
        },
        {
            workflowId: 4,
            approverId: 8,  // admin (Company 2)
            stepOrder: 3,
            createdAt: new Date('2024-01-13').toISOString(),
        },
        
        // Standard Approval Workflow (ID: 5) - Company 3
        {
            workflowId: 5,
            approverId: 16, // manager1 (Company 3)
            stepOrder: 1,
            createdAt: new Date('2024-01-14').toISOString(),
        },
        {
            workflowId: 5,
            approverId: 15, // admin (Company 3)
            stepOrder: 2,
            createdAt: new Date('2024-01-14').toISOString(),
        },
        
        // Conditional Large Expense Workflow (ID: 6) - Company 3
        {
            workflowId: 6,
            approverId: 16, // manager1 (Company 3)
            stepOrder: 1,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            workflowId: 6,
            approverId: 17, // manager2/finance (Company 3)
            stepOrder: 2,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            workflowId: 6,
            approverId: 15, // admin (Company 3)
            stepOrder: 3,
            createdAt: new Date('2024-01-15').toISOString(),
        }
    ];

    await db.insert(workflowSteps).values(sampleWorkflowSteps);
    
    console.log('✅ Workflow steps seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});