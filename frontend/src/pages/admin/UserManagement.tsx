import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createUser, updateUserAsync, deleteUserAsync, fetchUsers } from '@/store/slices/usersSlice';
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
    password: '',
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { user: currentUser } = useAppSelector((state) => state.auth);

  // Fetch users on component mount
  useEffect(() => {
    if (currentUser?.companyId) {
      dispatch(fetchUsers(currentUser.companyId));
    }
  }, [dispatch, currentUser?.companyId]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Get available managers based on hierarchy
  const managers = users.filter((u) => u.role === 'manager');
  const subManagers = users.filter((u) => u.role === 'sub-manager');
  
  // Function to get possible supervisors based on role
  const getPossibleSupervisors = (role: UserRole) => {
    switch (role) {
      case 'employee':
        // Employees can report to sub-managers or managers
        return [...subManagers, ...managers];
      case 'sub-manager':
        // Sub-managers can only report to managers
        return managers;
      case 'manager':
        // Managers don't have supervisors (or could report to admin, but keeping it simple)
        return [];
      case 'admin':
        // Admins don't have supervisors
        return [];
      default:
        return [];
    }
  };
  
  // Debug: log managers data to see the structure
  console.log('Available managers:', managers.map(m => ({
    id: m.id,
    name: m.name,
    managerId: m.managerId,
    email: m.email
  })));
  console.log('Available sub-managers:', subManagers.map(sm => ({
    id: sm.id,
    name: sm.name,
    managerId: sm.managerId,
    email: sm.email
  })));

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        managerId: user.managerId || '',
        password: '', // Don't pre-fill password for security
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'employee',
        managerId: '',
        password: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for new users
    if (!editingUser && !formData.password) {
      toast({
        title: 'Password Required',
        description: 'Password is required for new users',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      if (editingUser) {
        const updatedUser: User = {
          ...editingUser,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          managerId: formData.role === 'employee' ? formData.managerId : undefined,
        };
        
        // Include password only if provided (for updates)
        const payload = {
          user: updatedUser,
          ...(formData.password && { password: formData.password })
        };
        
        await dispatch(updateUserAsync(payload)).unwrap();
        toast({
          title: 'User Updated',
          description: 'User has been updated successfully in Supabase',
        });
      } else {
        const newUserData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          companyId: currentUser!.companyId,
          managerId: formData.role === 'employee' ? formData.managerId : undefined,
          password: formData.password,
        };
        
        console.log('Creating user with data:', newUserData);
        console.log('Selected managerId from form:', formData.managerId);
        
        await dispatch(createUser(newUserData)).unwrap();
        toast({
          title: 'User Added',
          description: 'New user has been added successfully to Supabase',
        });
      }
      
      setIsDialogOpen(false);
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to save user',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}? This will also remove them from Supabase.`)) {
      try {
        // Use the database primary key for deletion
        const primaryKey = user.databaseId || user.id;
        await dispatch(deleteUserAsync(primaryKey)).unwrap();
        toast({
          title: 'User Deleted',
          description: 'User has been deleted successfully from Supabase',
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: err instanceof Error ? err.message : 'Failed to delete user',
          variant: 'destructive',
        });
      }
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
          {loading && users.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading users...</p>
              </div>
            </div>
          ) : (
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      {user.managerId
                        ? users.find((u) => u.id === user.managerId)?.name || 'N/A'
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(user)}
                          disabled={loading}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user)}
                          disabled={user.email === currentUser?.email || loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No users found. Add your first user to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
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
                  disabled={!!editingUser} // Disable email editing since it's the PK
                  required
                />
                {editingUser && (
                  <p className="text-xs text-muted-foreground">Email cannot be changed (used as unique identifier)</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
                  required={!editingUser} // Required only for new users
                />
                <p className="text-xs text-muted-foreground">
                  {editingUser ? "Only fill if you want to change the password" : "This will be stored securely"}
                </p>
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
                    <SelectItem value="sub-manager">Sub-Manager</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(formData.role === 'employee' || formData.role === 'sub-manager') && (
                <div className="space-y-2">
                  <Label htmlFor="manager">
                    {formData.role === 'employee' ? 'Supervisor (Manager/Sub-Manager)' : 'Manager'}
                  </Label>
                  <Select
                    value={formData.managerId}
                    onValueChange={(value) => setFormData({ ...formData, managerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${formData.role === 'employee' ? 'supervisor' : 'manager'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {getPossibleSupervisors(formData.role).map((supervisor) => (
                        <SelectItem key={supervisor.id} value={supervisor.name}>
                          {supervisor.name} ({supervisor.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}