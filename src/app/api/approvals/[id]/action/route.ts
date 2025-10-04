import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { expenseApprovals, expenses } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { eq, and } from 'drizzle-orm';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, comments } = body; // action: 'approve' or 'reject'

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const approvalId = parseInt(id);

    // Get the approval record
    const [approval] = await db.select()
      .from(expenseApprovals)
      .where(and(
        eq(expenseApprovals.id, approvalId),
        eq(expenseApprovals.approverId, currentUser.userId)
      ))
      .limit(1);

    if (!approval) {
      return NextResponse.json({ error: 'Approval not found or unauthorized' }, { status: 404 });
    }

    if (approval.status !== 'pending') {
      return NextResponse.json({ error: 'Approval already processed' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // Update approval
    await db.update(expenseApprovals)
      .set({
        status: newStatus,
        comments: comments || null,
        approvedAt: new Date().toISOString(),
      })
      .where(eq(expenseApprovals.id, approvalId));

    // Update expense status
    if (action === 'reject') {
      // If rejected, mark expense as rejected
      await db.update(expenses)
        .set({ status: 'rejected' })
        .where(eq(expenses.id, approval.expenseId));
    } else {
      // If approved, check if there are more approvals needed
      const remainingApprovals = await db.select()
        .from(expenseApprovals)
        .where(and(
          eq(expenseApprovals.expenseId, approval.expenseId),
          eq(expenseApprovals.status, 'pending')
        ));

      if (remainingApprovals.length === 0) {
        // No more pending approvals, mark as approved
        await db.update(expenses)
          .set({ status: 'approved' })
          .where(eq(expenses.id, approval.expenseId));
      }
    }

    return NextResponse.json({
      message: `Expense ${action}d successfully`,
      approval: {
        id: approvalId,
        status: newStatus,
        comments,
      },
    });
  } catch (error) {
    console.error('Process approval error:', error);
    return NextResponse.json({ error: 'Failed to process approval' }, { status: 500 });
  }
}