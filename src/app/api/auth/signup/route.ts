import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { companies, users } from '@/db/schema';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, companyName, country, currency } = body;

    // Validate required fields
    if (!name || !email || !password || !companyName || !country || !currency) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create company
    const [newCompany] = await db.insert(companies).values({
      name: companyName,
      country,
      currency,
      createdAt: new Date().toISOString(),
    }).returning();

    // Create admin user
    const hashedPassword = await hashPassword(password);
    const [newUser] = await db.insert(users).values({
      companyId: newCompany.id,
      email,
      password: hashedPassword,
      name,
      role: 'admin',
      managerId: null,
      createdAt: new Date().toISOString(),
    }).returning();

    // Generate token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      companyId: newUser.companyId,
    });

    // Set auth cookie
    await setAuthCookie(token);

    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        companyId: newUser.companyId,
      },
      company: {
        id: newCompany.id,
        name: newCompany.name,
        country: newCompany.country,
        currency: newCompany.currency,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}