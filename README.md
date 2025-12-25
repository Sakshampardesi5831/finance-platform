# Finance Platform - Modern Full-Stack Starter

🚀 **Get a head start on your next project with the latest tech stack!** 

This is a production-ready finance management application that serves as a comprehensive starter template. Built with cutting-edge technologies, you can fork this project, customize it to your needs, and scale it as much as you want. Whether you're building a finance app, dashboard, or any data-driven application - this foundation has you covered.

## 🎯 Why Use This Starter?

- ✅ **Latest Tech Stack** - Next.js 16, TypeScript, Tailwind CSS, and more
- ✅ **Production Ready** - Authentication, database, API routes all configured
- ✅ **Fully Customizable** - Modify any component, add features, or pivot the entire concept
- ✅ **Best Practices** - Clean architecture, type safety, and modern patterns
- ✅ **Scalable Foundation** - Built to grow with your project needs

## 🛠 What You Get Out of the Box

A complete financial management application featuring transaction tracking, account management, and data import capabilities. But more importantly - a solid foundation you can build upon!

## Features

- **Account Management**: Create, edit, and delete financial accounts
- **Transaction Tracking**: Record and categorize financial transactions
- **Category Management**: Organize transactions with custom categories
- **CSV Import**: Bulk import transactions from CSV files with column mapping
- **Data Visualization**: Interactive charts and analytics
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Database
- **Hono** - Fast web framework for API routes
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Database** - Serverless PostgreSQL
- **Clerk** - Authentication and user management

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **Zustand** - Client state management

### Additional Libraries
- **Papa Parse** - CSV parsing
- **Date-fns** - Date manipulation
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── accounts/      # Account management
│   │   ├── categories/    # Category management
│   │   └── transactions/  # Transaction management
│   └── api/               # API routes
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── features/             # Feature-based modules
│   ├── accounts/         # Account-related logic
│   ├── categories/       # Category-related logic
│   └── transactions/     # Transaction-related logic
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # React context providers
└── db/                   # Database configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm/bun
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-platform/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following variables:
```env
# Database
DATABASE_URL=your_neon_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## Key Features

### Transaction Management
- Create, edit, and delete transactions
- Categorize transactions for better organization
- Bulk operations for multiple transactions
- Advanced filtering and search capabilities

### CSV Import
- Upload CSV files with transaction data
- Interactive column mapping interface
- Data validation and error handling
- Preview imported data before saving

### Account Management
- Multiple account support
- Account balance tracking
- Account-specific transaction filtering

### Data Visualization
- Interactive charts and graphs
- Financial analytics and insights
- Responsive chart components

## API Routes

The application uses Hono for API routes with the following endpoints:

- `/api/accounts` - Account CRUD operations
- `/api/categories` - Category CRUD operations  
- `/api/transactions` - Transaction CRUD operations

## Authentication

Authentication is handled by Clerk, providing:
- Secure user registration and login
- Session management
- Protected routes
- User profile management

## Database Schema

The application uses Drizzle ORM with PostgreSQL, featuring:
- Users table (managed by Clerk)
- Accounts table
- Categories table
- Transactions table

## 📝 How to Make It Yours

1. **Fork & Clone** - Start with this solid foundation
2. **Customize the UI** - Change colors, layouts, components to match your vision
3. **Modify Features** - Adapt the finance logic to your domain (e-commerce, inventory, etc.)
4. **Add New Modules** - Extend with your own features and functionality
5. **Scale Up** - The architecture supports growth from MVP to enterprise

### 🎆 Perfect Starting Point For:
- Financial applications
- Dashboard projects
- Data management systems
- Admin panels
- SaaS applications
- Any CRUD-heavy application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects!