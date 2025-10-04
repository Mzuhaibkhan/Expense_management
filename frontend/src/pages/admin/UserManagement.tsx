import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUser, updateUser, deleteUser } from '@/store/slices/usersSlice';
import { useToast } from '@/components/ui/use-toast';
import type { User, UserRole } from '@/types';

export default function UserManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee' as UserRole,
    managerId: '',
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { users } = useAppSelector((state: any) => state.users);
  const { user: currentUser } = useAppSelector((state: any) => state.auth);

  const managers = users.filter((u: any) => u.role === 'manager');
  const submanagers = users.filter((u: any) => u.role === 'submanager');

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        managerId: user.managerId || '',
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'employee',
        managerId: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      const updatedUser: User = {
        ...editingUser,
        ...formData,
        managerId: formData.role === 'employee' ? formData.managerId : undefined,
      };
      dispatch(updateUser(updatedUser));
      toast({
        title: 'User Updated',
        description: 'User has been updated successfully',
      });
    } else {
      const newUser: User = {
        id: 'user-' + Date.now(),
        ...formData,
        companyId: currentUser!.companyId,
        managerId: formData.role === 'employee' ? formData.managerId : undefined,
      };
      dispatch(addUser(newUser));
      toast({
        title: 'User Added',
        description: 'New user has been added successfully',
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
      toast({
        title: 'User Deleted',
        description: 'User has been deleted successfully',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and manager relationships</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    {user.managerId
                      ? users.find((u: any) => u.id === user.managerId)?.name || 'N/A'
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                        disabled={user.id === currentUser?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user information' : 'Create a new user account'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="submanager">Submanager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.role === 'employee' && (
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager / Submanager</Label>
                  <Select
                    value={formData.managerId}
                    onValueChange={(value: string) => setFormData({ ...formData, managerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manager or submanager" />
                    </SelectTrigger>
                    <SelectContent>
                      <optgroup label="Managers">
                        {managers.map((manager: any) => (
                          <SelectItem key={manager.id} value={manager.id}>
                            {manager.name}
                          </SelectItem>
                        ))}
                      </optgroup>
                      <optgroup label="Submanagers">
                        {submanagers.map((sm: any) => (
                          <SelectItem key={sm.id} value={sm.id}>
                            {sm.name}
                          </SelectItem>
                        ))}
                      </optgroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.role === 'submanager' && (
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager (assign parent manager)</Label>
                  <Select
                    value={formData.managerId}
                    onValueChange={(value: string) => setFormData({ ...formData, managerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {managers.map((manager: any) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingUser ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}