"use client";

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExpenses: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    totalAmount: 0,
  });
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/expenses', {
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        const expenses = data.expenses;

        const approved = expenses.filter((e: any) => e.status === 'approved').length;
        const rejected = expenses.filter((e: any) => e.status === 'rejected').length;
        const pending = expenses.filter((e: any) => e.status === 'pending').length;
        const totalAmount = expenses.reduce((sum: number, e: any) => sum + e.amountInCompanyCurrency, 0);

        setStats({
          totalExpenses: expenses.length,
          approved,
          rejected,
          pending,
          totalAmount,
        });

        setRecentExpenses(expenses.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Expenses', value: stats.totalExpenses, icon: Receipt, color: 'text-blue-600' },
    { title: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-green-600' },
    { title: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
    { title: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-600' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of your expense management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Amount Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Expense Amount</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div className="text-3xl font-bold text-primary">
                ${stats.totalAmount.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : recentExpenses.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No expenses yet</p>
            ) : (
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-500">
                        {expense.category} • {new Date(expense.expenseDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${expense.amountInCompanyCurrency.toFixed(2)}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          expense.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : expense.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {expense.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}