import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

// GET single expense
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const [expense] = await db.select().from(expenses)
      .where(and(
        eq(expenses.id, parseInt(id)),
        eq(expenses.companyId, currentUser.companyId)
      ))
      .limit(1);

    if (!expense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }

    return NextResponse.json({ expense });
  } catch (error) {
    console.error('Get expense error:', error);
    return NextResponse.json({ error: 'Failed to fetch expense' }, { status: 500 });
  }
}

// DELETE expense
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const expenseId = parseInt(id);

    // Only allow deletion of own expenses if employee, or any if admin
    const condition = currentUser.role === 'admin'
      ? and(eq(expenses.id, expenseId), eq(expenses.companyId, currentUser.companyId))
      : and(
          eq(expenses.id, expenseId),
          eq(expenses.companyId, currentUser.companyId),
          eq(expenses.userId, currentUser.userId)
        );

    const [deleted] = await db.delete(expenses)
      .where(condition)
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Expense not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}