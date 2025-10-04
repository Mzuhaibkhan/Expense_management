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
import { addRule, updateRule, deleteRule } from '@/store/slices/approvalsSlice';
import { useToast } from '@/components/ui/use-toast';
import type { ApprovalRule } from '@/types';

export default function ApprovalRules() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<ApprovalRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sequence: 1,
    approverIds: [] as string[],
    percentageRequired: 100,
    specificApprover: '',
    isHybrid: false,
  });

  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { rules } = useAppSelector((state) => state.approvals);
  const { users } = useAppSelector((state) => state.users);

  const managers = users.filter((u) => u.role === 'manager' || u.role === 'admin');

  const handleOpenDialog = (rule?: ApprovalRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        sequence: rule.sequence,
        approverIds: rule.approverIds,
        percentageRequired: rule.percentageRequired || 100,
        specificApprover: rule.specificApprover || '',
        isHybrid: rule.isHybrid,
      });
    } else {
      setEditingRule(null);
      setFormData({
        name: '',
        sequence: rules.length + 1,
        approverIds: [],
        percentageRequired: 100,
        specificApprover: '',
        isHybrid: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRule) {
      const updatedRule: ApprovalRule = {
        ...editingRule,
        ...formData,
      };
      dispatch(updateRule(updatedRule));
      toast({
        title: 'Rule Updated',
        description: 'Approval rule has been updated successfully',
      });
    } else {
      const newRule: ApprovalRule = {
        id: 'rule-' + Date.now(),
        ...formData,
      };
      dispatch(addRule(newRule));
      toast({
        title: 'Rule Added',
        description: 'New approval rule has been added successfully',
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (ruleId: string) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      dispatch(deleteRule(ruleId));
      toast({
        title: 'Rule Deleted',
        description: 'Approval rule has been deleted successfully',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Approval Rules</h1>
          <p className="text-muted-foreground">Configure multi-level approval workflows</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sequence</TableHead>
                <TableHead>Rule Name</TableHead>
                <TableHead>Approvers</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.sort((a, b) => a.sequence - b.sequence).map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.sequence}</TableCell>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>
                    {rule.approverIds.length} approver(s)
                  </TableCell>
                  <TableCell>
                    {rule.isHybrid ? 'Hybrid' : rule.specificApprover ? 'Specific' : 'Percentage'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(rule)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {rules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No approval rules configured
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
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Add New Rule'}</DialogTitle>
            <DialogDescription>
              Configure approval workflow rules
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Manager Approval"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sequence">Sequence</Label>
                <Input
                  id="sequence"
                  type="number"
                  min="1"
                  value={formData.sequence}
                  onChange={(e) => setFormData({ ...formData, sequence: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Approvers</Label>
                <Select
                  value={formData.approverIds[0] || ''}
                  onValueChange={(value) => setFormData({ ...formData, approverIds: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select approvers" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name} ({manager.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage">Percentage Required (%)</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.percentageRequired}
                  onChange={(e) => setFormData({ ...formData, percentageRequired: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specific">Specific Approver (Optional)</Label>
                <Input
                  id="specific"
                  value={formData.specificApprover}
                  onChange={(e) => setFormData({ ...formData, specificApprover: e.target.value })}
                  placeholder="e.g., CFO"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingRule ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}