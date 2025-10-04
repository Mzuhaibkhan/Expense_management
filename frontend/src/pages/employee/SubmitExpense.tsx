import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addExpense } from '@/store/slices/expensesSlice';
import { useGetExchangeRatesQuery } from '@/store/services/apiSlice';
import { useToast } from '@/components/ui/use-toast';
import type { ExpenseCategory, PaymentMethod } from '@/types';

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

export default function SubmitExpense() {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [paidBy, setPaidBy] = useState<PaymentMethod>('cash');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [remarks, setRemarks] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const { company } = useAppSelector((state) => state.settings);
  
  const { data: exchangeRates } = useGetExchangeRatesQuery(company?.baseCurrency || 'USD');

  const handleConvert = () => {
    if (!amount || !exchangeRates) return;
    
    const rate = exchangeRates.rates[currency] || 1;
    const converted = parseFloat(amount) / rate;
    setConvertedAmount(converted);
    
    toast({
      title: 'Currency Converted',
      description: `${currency} ${amount} = ${company?.baseCurrency} ${converted.toFixed(2)}`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      
      // Simulate OCR - auto-fill fields
      setTimeout(() => {
        setDescription('Business Lunch Meeting');
        setAmount('125.50');
        setCategory('food');
        toast({
          title: 'Receipt Processed',
          description: 'Fields auto-filled from receipt',
        });
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent, status: 'draft' | 'waiting') => {
    e.preventDefault();
    
    const newExpense = {
      id: 'expense-' + Date.now(),
      userId: user!.id,
      userName: user!.name,
      description,
      date,
      category,
      paidBy,
      amount: parseFloat(amount),
      currency,
      convertedAmount: convertedAmount || undefined,
      remarks: remarks || undefined,
      receiptUrl: receiptFile ? URL.createObjectURL(receiptFile) : undefined,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(addExpense(newExpense));
    
    toast({
      title: status === 'draft' ? 'Saved as Draft' : 'Expense Submitted',
      description: status === 'draft' 
        ? 'Your expense has been saved as draft' 
        : 'Your expense has been submitted for approval',
    });
    
    navigate('/employee/expenses');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submit Expense</h1>
        <p className="text-muted-foreground">Create a new expense report</p>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>Fill in the expense information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Client dinner"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Expense Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(value: ExpenseCategory) => setCategory(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="office_supplies">Office Supplies</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paidBy">Paid By</Label>
                <Select value={paidBy} onValueChange={(value: PaymentMethod) => setPaidBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="company_card">Company Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <div className="flex gap-2">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={handleConvert}>
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Convert to {company?.baseCurrency}
                </Button>
              </div>
              {convertedAmount && (
                <p className="text-sm text-muted-foreground">
                  Converted: {company?.baseCurrency} {convertedAmount.toFixed(2)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receipt Upload</CardTitle>
            <CardDescription>Upload receipt for OCR processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              {receiptFile && (
                <p className="text-sm text-muted-foreground">
                  Uploaded: {receiptFile.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, 'draft')}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={(e) => handleSubmit(e, 'waiting')}
          >
            Submit for Approval
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/employee/expenses')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}