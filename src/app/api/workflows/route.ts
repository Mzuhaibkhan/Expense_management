import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { approvalWorkflows, workflowSteps } from '@/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { eq } from 'drizzle-orm';

// GET workflows for company
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const workflows = await db.select()
      .from(approvalWorkflows)
      .where(eq(approvalWorkflows.companyId, currentUser.companyId));

    // Get steps for each workflow
    const workflowsWithSteps = await Promise.all(
      workflows.map(async (workflow) => {
        const steps = await db.select()
          .from(workflowSteps)
          .where(eq(workflowSteps.workflowId, workflow.id));
        
        return {
          ...workflow,
          steps,
        };
      })
    );

    return NextResponse.json({ workflows: workflowsWithSteps });
  } catch (error) {
    console.error('Get workflows error:', error);
    return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
  }
}

// POST create new workflow (admin only)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin only' }, { status: 403 });
    }

    const body = await request.json();
    const { name, isManagerApprover, approvalType, conditionRule, steps } = body;

    if (!name || !approvalType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create workflow
    const [newWorkflow] = await db.insert(approvalWorkflows).values({
      companyId: currentUser.companyId,
      name,
      isManagerApprover: isManagerApprover ?? true,
      approvalType,
      conditionRule: conditionRule ? JSON.stringify(conditionRule) : null,
      createdAt: new Date().toISOString(),
    }).returning();

    // Create workflow steps
    if (steps && steps.length > 0) {
      const stepValues = steps.map((step: any, index: number) => ({
        workflowId: newWorkflow.id,
        approverId: step.approverId,
        stepOrder: index + 1,
        createdAt: new Date().toISOString(),
      }));

      await db.insert(workflowSteps).values(stepValues);
    }

    return NextResponse.json({
      message: 'Workflow created successfully',
      workflow: newWorkflow,
    });
  } catch (error) {
    console.error('Create workflow error:', error);
    return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
  }
}