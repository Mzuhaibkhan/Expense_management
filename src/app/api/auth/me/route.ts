import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/db';
import { users, companies } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get full user details
    const [user] = await db.select().from(users).where(eq(users.id, currentUser.userId)).limit(1);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get company details
    const [company] = await db.select().from(companies).where(eq(companies.id, user.companyId)).limit(1);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        managerId: user.managerId,
      },
      company: company ? {
        id: company.id,
        name: company.name,
        country: company.country,
        currency: company.currency,
      } : null,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
}