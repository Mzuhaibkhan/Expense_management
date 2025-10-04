import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/store/hooks';

export default function TeamExpenses() {
  const { user } = useAppSelector((state) => state.auth);
  const { expenses } = useAppSelector((state) => state.expenses);
  const { users } = useAppSelector((state) => state.users);

  const teamMembers = users.filter((u) => u.managerId === user?.id);
  const teamExpenses = expenses.filter((e) =>
    teamMembers.some((member) => member.id === e.userId)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      draft: 'secondary',
      waiting: 'outline',
      approved: 'default',
      rejected: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const totalAmount = teamExpenses
    .filter((e) => e.status === 'approved')
    .reduce((sum, e) => sum + (e.convertedAmount || e.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Expenses</h1>
        <p className="text-muted-foreground">View all expenses from your team members</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamExpenses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Team Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.userName}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="capitalize">{expense.category.replace('_', ' ')}</TableCell>
                  <TableCell>
                    {expense.currency} {expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {teamExpenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No team expenses found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}