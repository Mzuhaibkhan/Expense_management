# Expense Management & Approvals Platform

A comprehensive expense management system with OCR receipt scanning, multi-level approvals, conditional workflows, and currency localization.

## 🎯 Features

### Core Functionality
- **Authentication System**: Secure signup/login with auto-creation of company and admin user
- **Role-Based Access Control**: Admin, Manager, and Employee roles with specific permissions
- **Expense Submission**: Submit expenses with automatic OCR receipt scanning
- **Currency Conversion**: Multi-currency support with real-time conversion
- **Approval Workflows**: Multi-level sequential and conditional approval flows
- **User Management**: Admin dashboard for managing users and roles
- **Workflow Configuration**: Create custom approval workflows with multiple steps

### Key Features by Role

#### Admin
- Create and manage company settings
- Add/edit/delete users and assign roles
- Configure approval workflows (sequential, conditional, hybrid)
- View all company expenses
- Manage manager relationships
- Override approvals

#### Manager  
- View team member expenses
- Approve/reject expense requests
- View pending approvals queue
- Add comments to approval decisions
- Escalate expenses per workflow rules

#### Employee
- Submit expense claims with receipt upload
- OCR auto-fill from receipt images
- Track expense status (pending/approved/rejected)
- View expense history
- Multi-currency expense submission

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **UI Components**: Shadcn/UI, Tailwind CSS
- **Database**: Turso (SQLite), Drizzle ORM
- **Authentication**: JWT with httpOnly cookies
- **APIs**: RESTful API routes
- **Currency**: Exchange Rate API
- **OCR**: Tesseract.js (mock implementation included)

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   └── signup/page.tsx         # Signup with company creation
│   ├── dashboard/
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── expenses/page.tsx       # Expense management
│   │   ├── approvals/page.tsx      # Approval queue
│   │   ├── users/page.tsx          # User management (admin)
│   │   └── settings/page.tsx       # Company & workflow settings
│   ├── api/
│   │   ├── auth/                   # Authentication endpoints
│   │   ├── users/                  # User CRUD operations
│   │   ├── expenses/               # Expense operations
│   │   ├── approvals/              # Approval actions
│   │   ├── workflows/              # Workflow management
│   │   ├── ocr/                    # OCR processing
│   │   └── currency/               # Currency conversion
│   └── page.tsx                    # Landing/redirect page
├── components/
│   ├── DashboardLayout.tsx         # Main layout with sidebar
│   └── ui/                         # Shadcn UI components
├── db/
│   ├── schema.ts                   # Database schema
│   └── seeds/                      # Sample data seeders
└── lib/
    └── auth.ts                     # Auth utilities

Database Tables:
- companies
- users
- expenses
- approval_workflows
- workflow_steps
- expense_approvals
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Turso account (free tier available)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Environment variables are already configured**
   - Database credentials are in `.env`
   - JWT secret is auto-generated (change in production)

3. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Signup to create a new company and admin account
   - Or login with seeded test accounts (see below)

## 🧪 Test Accounts

The database is pre-seeded with sample data:

### Company: TechCorp Inc (USD)
- **Admin**: admin@techcorp.com / password123
- **Manager**: manager1@techcorp.com / password123
- **Employee**: employee1@techcorp.com / password123

### Company: Global Ventures (EUR)
- **Admin**: admin@globalventures.com / password123
- **Manager**: manager1@globalventures.com / password123
- **Employee**: employee1@globalventures.com / password123

### Company: Asia Dynamics (JPY)
- **Admin**: admin@asiadynamics.com / password123
- **Manager**: manager1@asiadynamics.com / password123
- **Employee**: employee1@asiadynamics.com / password123

## 📋 Usage Guide

### Creating a New Company
1. Navigate to `/signup`
2. Fill in your details and company information
3. Select country (currency auto-populates)
4. Submit to create company and admin account

### Submitting an Expense (Employee)
1. Navigate to "Expenses"
2. Click "New Expense"
3. Optional: Upload receipt for OCR auto-fill
4. Fill in amount, currency, category, description, date
5. Submit for approval
6. Track status in expense history

### Approving Expenses (Manager)
1. Navigate to "Approvals"
2. View pending approval requests
3. Review expense details
4. Approve or Reject with comments
5. Expense moves to next approval step or finalizes

### Managing Users (Admin)
1. Navigate to "Users"
2. Click "Add User"
3. Fill in name, email, password, role
4. Assign manager for employees
5. Edit roles and manager relationships

### Configuring Workflows (Admin)
1. Navigate to "Settings" > "Approval Workflows"
2. Click "Create New Workflow"
3. Name the workflow
4. Choose type: Sequential, Conditional, or Hybrid
5. Set if manager approval is required first
6. Add approval steps with specific approvers
7. Submit to create workflow

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth with httpOnly cookies
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Authorization**: Endpoint protection by user role
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries via Drizzle ORM

## 🌍 Multi-Currency Support

- Expenses can be submitted in any currency
- Automatic conversion to company's default currency
- Real-time exchange rates via Exchange Rate API
- Display both original and converted amounts
- Support for: USD, EUR, GBP, JPY, INR, and more

## 🔄 Approval Workflows

### Sequential Workflow
- Expenses move through predefined steps in order
- Each approver must approve before moving to next
- Example: Manager → Finance → Director

### Conditional Workflow  
- Rules determine approval path
- Percentage-based: e.g., 60% of approvers must approve
- Specific approver: e.g., CFO approval auto-approves
- Amount-based thresholds

### Hybrid Workflow
- Combination of sequential and conditional
- Complex approval logic
- Example: Manager approves, then 60% of finance team OR CFO

## 📊 Dashboard Overview

- **Total Expenses**: Count of all submitted expenses
- **Approved/Pending/Rejected**: Status breakdown
- **Total Amount**: Sum of expenses in company currency
- **Recent Activity**: Latest expense submissions
- **Pending Approvals**: Queue for managers/admins

## 🎨 UI Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode Support**: Automatic theme detection
- **Loading States**: Skeletons and spinners for better UX
- **Toast Notifications**: Success/error feedback
- **Collapsible Sidebar**: Better mobile navigation
- **Status Badges**: Visual expense status indicators

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create company and admin
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - List company users
- `POST /api/users` - Create user (admin only)
- `PUT /api/users` - Update user (admin only)

### Expenses
- `GET /api/expenses` - List expenses (filtered by role)
- `POST /api/expenses` - Create expense
- `GET /api/expenses/[id]` - Get single expense
- `DELETE /api/expenses/[id]` - Delete expense

### Approvals
- `GET /api/approvals/pending` - Get pending approvals
- `POST /api/approvals/[id]/action` - Approve/reject

### Workflows
- `GET /api/workflows` - List workflows
- `POST /api/workflows` - Create workflow (admin only)

### Utilities
- `POST /api/ocr` - Process receipt image
- `GET /api/currency/convert` - Convert currency

## 🚧 Production Considerations

Before deploying to production:

1. **Environment Variables**
   - Set strong JWT_SECRET in .env
   - Use production database credentials
   - Add rate limiting for API routes

2. **Security**
   - Enable HTTPS
   - Add CORS configuration
   - Implement request rate limiting
   - Add email verification for signup

3. **OCR Integration**
   - Replace mock OCR with real service (Tesseract.js, Google Vision, AWS Textract)
   - Add receipt image storage (S3, Cloudinary)

4. **Monitoring**
   - Add error tracking (Sentry)
   - Implement logging
   - Set up analytics

5. **Performance**
   - Add database indexes
   - Implement caching
   - Optimize image uploads
   - Add pagination for large lists

## 📝 License

This project is provided as-is for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For production use, please fork and customize to your needs.

## 📞 Support

For questions or issues, please refer to the code comments and documentation within the source files.

---

**Built with ❤️ using Next.js, Shadcn/UI, and Turso**