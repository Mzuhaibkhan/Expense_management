import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // For now, return mock OCR data
    // In production, integrate with Tesseract.js or cloud OCR service
    const mockOCRData = {
      amount: Math.floor(Math.random() * 500) + 50,
      currency: 'USD',
      category: 'Food',
      description: 'Restaurant bill',
      expenseDate: new Date().toISOString().split('T')[0],
      merchant: 'Sample Restaurant',
    };

    return NextResponse.json({
      message: 'Receipt processed successfully',
      data: mockOCRData,
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json({ error: 'Failed to process receipt' }, { status: 500 });
  }
}