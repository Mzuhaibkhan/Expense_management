import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const amount = parseFloat(searchParams.get('amount') || '0');

    if (!from || !to || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Fetch exchange rates
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();

    if (!data.rates || !data.rates[to]) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }

    const rate = data.rates[to];
    const convertedAmount = amount * rate;

    return NextResponse.json({
      from,
      to,
      amount,
      rate,
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    return NextResponse.json({ error: 'Failed to convert currency' }, { status: 500 });
  }
}