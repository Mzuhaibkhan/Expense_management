import { Clock, CheckCircle, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export default function SubmanagerHome() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state: any) => state.auth);
  const { expenses } = useAppSelector((state: any) => state.expenses);
  const { users } = useAppSelector((state: any) => state.users);

  // team members are employees whose managerId points to this submanager
  const teamMembers = users.filter((u: any) => u.managerId === user?.id && u.role === 'employee');
  const teamExpenses = expenses.filter((e: any) => 
    teamMembers.some((member: any) => member.id === e.userId)
  );
  const pendingApprovals = teamExpenses.filter((e: any) => e.status === 'waiting');

  const stats = [
    {
      title: 'Pending Approvals',
      value: pendingApprovals.length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Approved This Month',
      value: teamExpenses.filter((e: any) => e.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Team Members',
      value: teamMembers.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Expenses',
      value: teamExpenses.length,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submanager Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>
        <Button onClick={() => navigate('/submanager/approvals')}>
          Review Approvals
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat: any) => (
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
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.slice(0, 5).map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {expense.currency} {expense.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending approvals
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member: any) => {
                const memberExpenses = teamExpenses.filter((e: any) => e.userId === member.id);
                return (
                  <div key={member.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{memberExpenses.length} expenses</p>
                      <p className="text-xs text-muted-foreground">
                        {memberExpenses.filter((e: any) => e.status === 'waiting').length} pending
                      </p>
                    </div>
                  </div>
                );
              })}
              {teamMembers.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No team members assigned
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
