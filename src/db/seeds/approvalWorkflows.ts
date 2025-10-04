import { db } from '@/db';
import { approvalWorkflows } from '@/db/schema';

async function main() {
    const sampleWorkflows = [
        {
            companyId: 1,
            name: 'Standard Approval',
            isManagerApprover: true,
            approvalType: 'sequential',
            conditionRule: null,
            createdAt: new Date('2024-01-10').toISOString(),
        },
        {
            companyId: 1,
            name: 'Conditional Large Expense',
            isManagerApprover: true,
            approvalType: 'conditional',
            conditionRule: '{"amount_threshold": 1000, "logic": "and", "requires_finance_approval": true}',
            createdAt: new Date('2024-01-12').toISOString(),
        },
        {
            companyId: 2,
            name: 'Standard Approval',
            isManagerApprover: true,
            approvalType: 'sequential',
            conditionRule: null,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            companyId: 2,
            name: 'Conditional Large Expense',
            isManagerApprover: true,
            approvalType: 'conditional',
            conditionRule: '{"amount_threshold": 1000, "logic": "and", "requires_finance_approval": true}',
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            companyId: 3,
            name: 'Standard Approval',
            isManagerApprover: true,
            approvalType: 'sequential',
            conditionRule: null,
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            companyId: 3,
            name: 'Conditional Large Expense',
            isManagerApprover: true,
            approvalType: 'conditional',
            conditionRule: '{"amount_threshold": 1000, "logic": "and", "requires_finance_approval": true}',
            createdAt: new Date('2024-01-22').toISOString(),
        }
    ];

    await db.insert(approvalWorkflows).values(sampleWorkflows);
    
    console.log('✅ Approval workflows seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});