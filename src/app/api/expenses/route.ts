import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { expenses, expenseApprovals, users } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { eq, and, desc } from 'drizzle-orm';

// GET expenses (filtered by role)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    let expensesList;

    if (currentUser.role === 'admin') {
      // Admin sees all company expenses
      expensesList = await db.select().from(expenses)
        .where(eq(expenses.companyId, currentUser.companyId))
        .orderBy(desc(expenses.createdAt));
    } else if (currentUser.role === 'manager') {
      // Manager sees their team's expenses
      const teamMembers = await db.select().from(users)
        .where(and(
          eq(users.companyId, currentUser.companyId),
          eq(users.managerId, currentUser.userId)
        ));

      const teamIds = teamMembers.map(m => m.id);
      teamIds.push(currentUser.userId); // Include manager's own expenses

      expensesList = await db.select().from(expenses)
        .where(and(
          eq(expenses.companyId, currentUser.companyId),
        ))
        .orderBy(desc(expenses.createdAt));

      // Filter in memory (more complex filters)
      expensesList = expensesList.filter(e => teamIds.includes(e.userId));
    } else {
      // Employee sees only their own expenses
      expensesList = await db.select().from(expenses)
        .where(and(
          eq(expenses.companyId, currentUser.companyId),
          eq(expenses.userId, currentUser.userId)
        ))
        .orderBy(desc(expenses.createdAt));
    }

    // Apply status filter
    if (filter && filter !== 'all') {
      expensesList = expensesList.filter(e => e.status === filter);
    }

    return NextResponse.json({ expenses: expensesList });
  } catch (error) {
    console.error('Get expenses error:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

// POST create new expense
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, currency, amountInCompanyCurrency, category, description, expenseDate, receiptUrl } = body;

    if (!amount || !currency || !category || !description || !expenseDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [newExpense] = await db.insert(expenses).values({
      companyId: currentUser.companyId,
      userId: currentUser.userId,
      amount,
      currency,
      amountInCompanyCurrency: amountInCompanyCurrency || amount,
      category,
      description,
      expenseDate,
      receiptUrl: receiptUrl || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning();

    // Get user's manager for approval workflow
    const [user] = await db.select().from(users).where(eq(users.id, currentUser.userId)).limit(1);
    
    if (user.managerId) {
      // Create approval request for manager
      await db.insert(expenseApprovals).values({
        expenseId: newExpense.id,
        approverId: user.managerId,
        status: 'pending',
        comments: null,
        stepOrder: 1,
        approvedAt: null,
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      message: 'Expense submitted successfully',
      expense: newExpense,
    });
  } catch (error) {
    console.error('Create expense error:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}