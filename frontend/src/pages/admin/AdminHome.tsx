import { Users, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';

export default function AdminHome() {
  const { users } = useAppSelector((state) => state.users);
  const { expenses } = useAppSelector((state) => state.expenses);
  const { company } = useAppSelector((state) => state.settings);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Expenses',
      value: expenses.length,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Approved',
      value: expenses.filter((e) => e.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Pending',
      value: expenses.filter((e) => e.status === 'waiting').length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to {company?.name || 'your company'} expense management system
        </p>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {expense.currency} {expense.amount}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{expense.status}</p>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No expenses yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Company Name</p>
              <p className="text-sm font-medium">{company?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Base Currency</p>
              <p className="text-sm font-medium">{company?.baseCurrency || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-sm font-medium">
                {users.filter((u) => u.role === 'employee').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Managers</p>
              <p className="text-sm font-medium">
                {users.filter((u) => u.role === 'manager').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}