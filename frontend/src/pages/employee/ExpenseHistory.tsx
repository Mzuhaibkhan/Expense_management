import { useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteExpense } from '@/store/slices/expensesSlice';
import { useToast } from '@/components/ui/use-toast';
import type { Expense } from '@/types';

export default function ExpenseHistory() {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const { expenses } = useAppSelector((state) => state.expenses);

  const myExpenses = expenses.filter((e) => e.userId === user?.id);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      draft: 'secondary',
      waiting: 'outline',
      approved: 'default',
      rejected: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const handleView = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDelete = (expenseId: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(expenseId));
      toast({
        title: 'Expense Deleted',
        description: 'Expense has been deleted successfully',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Expenses</h1>
        <p className="text-muted-foreground">View and manage your expense history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell className="capitalize">{expense.category.replace('_', ' ')}</TableCell>
                  <TableCell className="capitalize">{expense.paidBy.replace('_', ' ')}</TableCell>
                  <TableCell>
                    {expense.currency} {expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(expense)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {expense.status === 'draft' && (
                        <>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {myExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No expenses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Expense Details</DialogTitle>
            <DialogDescription>View complete expense information</DialogDescription>
          </DialogHeader>
          {selectedExpense && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedExpense.status)}</div>
                </div>
              </div>
              {selectedExpense.convertedAmount && (
                <div>
                  <p className="text-sm text-muted-foreground">Converted Amount</p>
                  <p className="text-sm font-medium">
                    {selectedExpense.convertedAmount.toFixed(2)}
                  </p>
                </div>
              )}
              {selectedExpense.remarks && (
                <div>
                  <p className="text-sm text-muted-foreground">Remarks</p>
                  <p className="text-sm font-medium">{selectedExpense.remarks}</p>
                </div>
              )}
              {selectedExpense.rejectionReason && (
                <div>
                  <p className="text-sm text-muted-foreground">Rejection Reason</p>
                  <p className="text-sm font-medium text-destructive">
                    {selectedExpense.rejectionReason}
                  </p>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}