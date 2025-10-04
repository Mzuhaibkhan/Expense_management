import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export default function EmployeeHome() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { expenses } = useAppSelector((state) => state.expenses);
  
  const myExpenses = expenses.filter((e) => e.userId === user?.id);

  const stats = [
    {
      title: 'Total Expenses',
      value: myExpenses.length,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending',
      value: myExpenses.filter((e) => e.status === 'waiting').length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Approved',
      value: myExpenses.filter((e) => e.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Rejected',
      value: myExpenses.filter((e) => e.status === 'rejected').length,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>
        <Button onClick={() => navigate('/employee/submit-expense')}>
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myExpenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {expense.currency} {expense.amount}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{expense.status}</p>
                </div>
              </div>
            ))}
            {myExpenses.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No expenses yet. Submit your first expense!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}