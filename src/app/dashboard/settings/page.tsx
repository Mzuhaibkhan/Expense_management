"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Building2, Workflow } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [workflowForm, setWorkflowForm] = useState({
    name: '',
    isManagerApprover: true,
    approvalType: 'sequential',
    steps: [] as { approverId: string }[],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companyRes, workflowsRes, usersRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/workflows'),
        fetch('/api/users'),
      ]);

      if (companyRes.ok) {
        const data = await companyRes.json();
        setCompany(data.company);
      }

      if (workflowsRes.ok) {
        const data = await workflowsRes.json();
        setWorkflows(data.workflows);
      }

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users.filter((u: any) => u.role !== 'employee'));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorkflowStep = () => {
    setWorkflowForm({
      ...workflowForm,
      steps: [...workflowForm.steps, { approverId: '' }],
    });
  };

  const handleRemoveWorkflowStep = (index: number) => {
    const newSteps = workflowForm.steps.filter((_, i) => i !== index);
    setWorkflowForm({ ...workflowForm, steps: newSteps });
  };

  const handleUpdateStep = (index: number, approverId: string) => {
    const newSteps = [...workflowForm.steps];
    newSteps[index] = { approverId };
    setWorkflowForm({ ...workflowForm, steps: newSteps });
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...workflowForm,
          steps: workflowForm.steps.map(s => ({ approverId: parseInt(s.approverId) })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create workflow');
      }

      toast.success('Workflow created successfully!');
      setWorkflowForm({
        name: '',
        isManagerApprover: true,
        approvalType: 'sequential',
        steps: [],
      });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create workflow');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Toaster />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage company settings and approval workflows
          </p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company">
              <Building2 className="mr-2 h-4 w-4" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="workflows">
              <Workflow className="mr-2 h-4 w-4" />
              Approval Workflows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  View and manage your company details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input value={company?.name || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value={company?.country || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Input value={company?.currency || ''} disabled />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Contact support to update company information
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            {/* Existing Workflows */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Workflows</CardTitle>
                <CardDescription>
                  Approval workflows configured for your company
                </CardDescription>
              </CardHeader>
              <CardContent>
                {workflows.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No workflows configured yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {workflows.map((workflow) => (
                      <div
                        key={workflow.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{workflow.name}</h3>
                            <p className="text-sm text-gray-600">
                              Type: {workflow.approvalType}
                              {workflow.isManagerApprover && ' • Manager approval required'}
                            </p>
                          </div>
                        </div>
                        {workflow.steps && workflow.steps.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Approval Steps:</p>
                            <div className="flex flex-wrap gap-2">
                              {workflow.steps.map((step: any, index: number) => (
                                <span
                                  key={step.id}
                                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
                                >
                                  Step {step.stepOrder}: Approver ID {step.approverId}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Create New Workflow */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Workflow</CardTitle>
                <CardDescription>
                  Define a new approval workflow with multiple steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateWorkflow} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="workflowName">Workflow Name *</Label>
                    <Input
                      id="workflowName"
                      placeholder="e.g., Standard Expense Approval"
                      value={workflowForm.name}
                      onChange={(e) => setWorkflowForm({ ...workflowForm, name: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="approvalType">Approval Type *</Label>
                    <Select
                      value={workflowForm.approvalType}
                      onValueChange={(value) => setWorkflowForm({ ...workflowForm, approvalType: value })}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequential">Sequential (step by step)</SelectItem>
                        <SelectItem value="conditional">Conditional (based on rules)</SelectItem>
                        <SelectItem value="hybrid">Hybrid (combination)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Manager Must Approve First</Label>
                    <Select
                      value={workflowForm.isManagerApprover.toString()}
                      onValueChange={(value) => setWorkflowForm({ ...workflowForm, isManagerApprover: value === 'true' })}
                      disabled={submitting}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Approval Steps</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddWorkflowStep}
                        disabled={submitting}
                      >
                        Add Step
                      </Button>
                    </div>

                    {workflowForm.steps.map((step, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1">
                          <Select
                            value={step.approverId}
                            onValueChange={(value) => handleUpdateStep(index, value)}
                            disabled={submitting}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`Select approver for step ${index + 1}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id.toString()}>
                                  {user.name} ({user.role})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveWorkflowStep(index)}
                          disabled={submitting}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Workflow...
                      </>
                    ) : (
                      'Create Workflow'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}