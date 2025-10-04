import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateExpense } from '@/store/slices/expensesSlice';
import { useToast } from '@/components/ui/use-toast';
import type { Expense } from '@/types';

export default function SubmanagerApprovalsQueue() {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state: any) => state.auth);
  const { expenses } = useAppSelector((state: any) => state.expenses);
  const { users } = useAppSelector((state: any) => state.users);
  const { company } = useAppSelector((state: any) => state.settings);

  // team members for submanager are employees that have managerId === submanager.id
  const teamMembers = users.filter((u: any) => u.managerId === user?.id && u.role === 'employee');
  const pendingExpenses = expenses.filter(
    (e: any) => e.status === 'waiting' && teamMembers.some((member: any) => member.id === e.userId)
  );

  const handleApprove = (expense: Expense) => {
    const updatedExpense = {
      ...expense,
      status: 'approved' as const,
      updatedAt: new Date().toISOString(),
    };
    dispatch(updateExpense(updatedExpense));
    toast({
      title: 'Expense Approved',
      description: `${expense.description} has been approved`,
    });
  };

  const handleReject = () => {
    if (!selectedExpense) return;
    const updatedExpense = {
      ...selectedExpense,
      status: 'rejected' as const,
      rejectionReason,
      updatedAt: new Date().toISOString(),
    };
    dispatch(updateExpense(updatedExpense));
    toast({
      title: 'Expense Rejected',
      description: `${selectedExpense.description} has been rejected`,
      variant: 'destructive',
    });
    setIsRejectDialogOpen(false);
    setRejectionReason('');
  };

  const handleView = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsViewDialogOpen(true);
  };

  const openRejectDialog = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsRejectDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submanager Approvals</h1>
        <p className="text-muted-foreground">Review and approve team expense requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals ({pendingExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Owner</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Converted</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingExpenses.map((expense: any) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.userName}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="capitalize">{expense.category.replace('_', ' ')}</TableCell>
                  <TableCell>
                    {expense.currency} {expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {company?.baseCurrency} {expense.convertedAmount?.toFixed(2) || 'N/A'}
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(expense)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleApprove(expense)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => openRejectDialog(expense)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pendingExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No pending approvals
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>Review complete expense information</DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Submitted By</p>
                  <p className="text-sm font-medium">{selectedExpense.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm font-medium">{selectedExpense.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedExpense.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedExpense.category.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid By</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedExpense.paidBy.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-sm font-medium">
                    {selectedExpense.currency} {selectedExpense.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              {selectedExpense.convertedAmount && (
                <div>
                  <p className="text-sm text-muted-foreground">Converted Amount</p>
                  <p className="text-sm font-medium">
                    {company?.baseCurrency} {selectedExpense.convertedAmount.toFixed(2)}
                  </p>
                </div>
              )}
              {selectedExpense.remarks && (
                <div>
                  <p className="text-sm text-muted-foreground">Remarks</p>
                  <p className="text-sm font-medium">{selectedExpense.remarks}</p>
                </div>
              )}
              {selectedExpense.receiptUrl && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Receipt</p>
                  <img
                    src={selectedExpense.receiptUrl}
                    alt="Receipt"
                    className="max-w-full h-auto rounded-lg border"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedExpense && (
              <>
                <Button
                  variant="default"
                  onClick={() => {
                    handleApprove(selectedExpense);
                    setIsViewDialogOpen(false);
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openRejectDialog(selectedExpense);
                  }}
                >
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Expense</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this expense
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
