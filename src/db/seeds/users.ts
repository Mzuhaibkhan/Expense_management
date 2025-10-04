import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const sampleUsers = [
        // TechCorp (Company ID: 1)
        {
            companyId: 1,
            email: 'admin@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Sarah Johnson',
            role: 'admin',
            managerId: null,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            companyId: 1,
            email: 'manager1@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Michael Chen',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            companyId: 1,
            email: 'manager2@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Jennifer Williams',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            companyId: 1,
            email: 'employee1@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'David Martinez',
            role: 'employee',
            managerId: 2, // Reports to Michael Chen (manager1)
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            companyId: 1,
            email: 'employee2@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Lisa Thompson',
            role: 'employee',
            managerId: 2, // Reports to Michael Chen (manager1)
            createdAt: new Date('2024-01-19').toISOString(),
        },
        {
            companyId: 1,
            email: 'employee3@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Robert Kim',
            role: 'employee',
            managerId: 3, // Reports to Jennifer Williams (manager2)
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            companyId: 1,
            email: 'employee4@techcorp.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Amanda Rodriguez',
            role: 'employee',
            managerId: 3, // Reports to Jennifer Williams (manager2)
            createdAt: new Date('2024-01-21').toISOString(),
        },

        // GlobalVentures (Company ID: 2)
        {
            companyId: 2,
            email: 'admin@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'James Patterson',
            role: 'admin',
            managerId: null,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            companyId: 2,
            email: 'manager1@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Emily Davis',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            companyId: 2,
            email: 'manager2@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Thomas Anderson',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            companyId: 2,
            email: 'employee1@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Kevin Brown',
            role: 'employee',
            managerId: 9, // Reports to Emily Davis (manager1)
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            companyId: 2,
            email: 'employee2@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Rachel Green',
            role: 'employee',
            managerId: 9, // Reports to Emily Davis (manager1)
            createdAt: new Date('2024-01-19').toISOString(),
        },
        {
            companyId: 2,
            email: 'employee3@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Christopher Lee',
            role: 'employee',
            managerId: 10, // Reports to Thomas Anderson (manager2)
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            companyId: 2,
            email: 'employee4@globalventures.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Nicole Taylor',
            role: 'employee',
            managerId: 10, // Reports to Thomas Anderson (manager2)
            createdAt: new Date('2024-01-21').toISOString(),
        },

        // AsiaDynamics (Company ID: 3)
        {
            companyId: 3,
            email: 'admin@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Hiroshi Tanaka',
            role: 'admin',
            managerId: null,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            companyId: 3,
            email: 'manager1@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Li Wei',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-16').toISOString(),
        },
        {
            companyId: 3,
            email: 'manager2@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Priya Sharma',
            role: 'manager',
            managerId: null,
            createdAt: new Date('2024-01-17').toISOString(),
        },
        {
            companyId: 3,
            email: 'employee1@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Yuki Sato',
            role: 'employee',
            managerId: 16, // Reports to Li Wei (manager1)
            createdAt: new Date('2024-01-18').toISOString(),
        },
        {
            companyId: 3,
            email: 'employee2@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Chen Ming',
            role: 'employee',
            managerId: 16, // Reports to Li Wei (manager1)
            createdAt: new Date('2024-01-19').toISOString(),
        },
        {
            companyId: 3,
            email: 'employee3@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Raj Patel',
            role: 'employee',
            managerId: 17, // Reports to Priya Sharma (manager2)
            createdAt: new Date('2024-01-20').toISOString(),
        },
        {
            companyId: 3,
            email: 'employee4@asiadynamics.com',
            password: '$2b$10$rOZvs9Z8YfHyPj7QvQwJHOxKj5K4XhQ8vPzLmNpWxYzKjF6GhEqLG', // hashed "password123"
            name: 'Maya Nakamura',
            role: 'employee',
            managerId: 17, // Reports to Priya Sharma (manager2)
            createdAt: new Date('2024-01-21').toISOString(),
        },
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});