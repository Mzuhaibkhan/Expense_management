import { NextResponse } from 'next/server';
import { db } from '@/db';
import { expenseApprovals, expenses, users } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { eq, and, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get pending approvals for current user
    const pendingApprovals = await db.select({
      approval: expenseApprovals,
      expense: expenses,
      employee: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(expenseApprovals)
    .innerJoin(expenses, eq(expenseApprovals.expenseId, expenses.id))
    .innerJoin(users, eq(expenses.userId, users.id))
    .where(and(
      eq(expenseApprovals.approverId, currentUser.userId),
      eq(expenseApprovals.status, 'pending')
    ))
    .orderBy(desc(expenseApprovals.createdAt));

    return NextResponse.json({ approvals: pendingApprovals });
  } catch (error) {
    console.error('Get pending approvals error:', error);
    return NextResponse.json({ error: 'Failed to fetch pending approvals' }, { status: 500 });
  }
}