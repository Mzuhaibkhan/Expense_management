"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Loader2, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function ApprovalsPage() {
  const [loading, setLoading] = useState(true);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const response = await fetch('/api/approvals/pending');
      if (response.ok) {
        const data = await response.json();
        setApprovals(data.approvals);
      }
    } catch (error) {
      console.error('Failed to fetch approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovalAction = (approval: any, actionType: 'approve' | 'reject') => {
    setSelectedApproval(approval);
    setAction(actionType);
    setComments('');
    setDialogOpen(true);
  };

  const submitApprovalAction = async () => {
    if (!selectedApproval || !action) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/approvals/${selectedApproval.approval.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, comments }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process approval');
      }

      toast.success(`Expense ${action}d successfully!`);
      setDialogOpen(false);
      fetchApprovals();
    } catch (error: any) {
      toast.error(error.message || 'Failed to process approval');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <Toaster />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Approval Queue</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and process pending expense approvals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Approvals
              </CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvals.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Approvals List */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : approvals.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {approvals.map((item) => (
                  <div
                    key={item.approval.id}
                    className="border rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{item.expense.description}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                            Step {item.approval.stepOrder}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>
                            <span className="font-medium">Employee:</span> {item.employee.name} ({item.employee.email})
                          </p>
                          <p>
                            <span className="font-medium">Category:</span> {item.expense.category}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span>{' '}
                            {new Date(item.expense.expenseDate).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-medium">Submitted:</span>{' '}
                            {new Date(item.approval.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {item.expense.currency} {item.expense.amount.toFixed(2)}
                        </div>
                        {item.expense.currency !== item.expense.amountInCompanyCurrency && (
                          <div className="text-sm text-gray-500">
                            ≈ {item.expense.amountInCompanyCurrency.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="default"
                        className="flex-1"
                        onClick={() => handleApprovalAction(item, 'approve')}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleApprovalAction(item, 'reject')}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Approval Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve' : 'Reject'} Expense
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (optional)</Label>
              <Textarea
                id="comments"
                placeholder={`Add comments for your ${action}...`}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                disabled={submitting}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant={action === 'approve' ? 'default' : 'destructive'}
                onClick={submitApprovalAction}
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : action === 'approve' ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Approval
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Confirm Rejection
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}