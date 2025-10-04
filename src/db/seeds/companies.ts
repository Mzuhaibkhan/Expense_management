import { db } from '@/db';
import { companies } from '@/db/schema';

async function main() {
    const sampleCompanies = [
        {
            name: 'TechCorp Inc',
            country: 'USA',
            currency: 'USD',
            createdAt: new Date('2024-03-15').toISOString(),
        },
        {
            name: 'Global Ventures',
            country: 'Germany',
            currency: 'EUR',
            createdAt: new Date('2024-02-20').toISOString(),
        },
        {
            name: 'Asia Dynamics',
            country: 'Japan',
            currency: 'JPY',
            createdAt: new Date('2024-01-25').toISOString(),
        }
    ];

    await db.insert(companies).values(sampleCompanies);
    
    console.log('✅ Companies seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});