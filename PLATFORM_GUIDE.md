# Chesspure Academy - Full-Stack Chess Learning Platform

A complete chess learning platform inspired by ab-chess.com with user authentication, payment processing, progressive learning stages, interactive puzzles, and admin management.

## 🎯 Features

### User Authentication
- ✅ Secure signup and login with NextAuth.js
- ✅ JWT-based session management
- ✅ Role-based access control (Admin & Student)
- ✅ Password encryption with bcrypt

### Payment Integration
- ✅ Stripe payment gateway integration
- ✅ One-time course enrollment payments
- ✅ Automatic access grant on successful payment
- ✅ Payment tracking and history

### Learning Progression System
- ✅ Three learning stages: Beginner, Intermediate, Advanced
- ✅ Stage-based content access control
- ✅ Locked/unlocked course indicators
- ✅ User progress tracking per puzzle
- ✅ Completion statistics

### Interactive Chess Puzzles
- ✅ Interactive chessboard (react-chessboard + chess.js)
- ✅ Move validation and feedback
- ✅ Hints system
- ✅ Solution checking
- ✅ Progress tracking (attempts, completion status)

### Admin Panel
- ✅ Create, edit, and delete puzzles
- ✅ View all users and enrollments
- ✅ Manually upgrade user stages
- ✅ Track payment status
- ✅ User management dashboard

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean card-based layouts
- ✅ Stage headers with lock indicators
- ✅ Chess-themed color palette
- ✅ Smooth animations with Framer Motion

## 🚀 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Radix UI
- **Chess**: react-chessboard, chess.js
- **Animation**: Framer Motion

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js (JWT strategy)
- **Database ORM**: Prisma
- **Database**: PostgreSQL (Neon)
- **Payments**: Stripe

### Security
- **Password Hashing**: bcryptjs
- **Authentication**: JWT tokens
- **Route Protection**: Middleware-based protection
- **Role-based Access**: Admin/Student roles

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (provided by Replit)
- Stripe account (for payments)

### Environment Variables
Already configured in Replit Secrets:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `STRIPE_SECRET_KEY` - Stripe API secret key

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Generate Prisma Client**
```bash
npx prisma generate
```

3. **Push Database Schema**
```bash
npm run db:push
```

4. **Seed Database with Sample Data**
```bash
npm run db:seed
```

5. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 👤 Test Credentials

### Admin Account
- **Email**: admin@chesspure.com
- **Password**: admin123
- **Access**: Full admin panel access

### Sample Puzzles
The seed script creates 4 sample puzzles across different stages:
- 2 Beginner puzzles (Back Rank Mate, Fork the King and Queen)
- 1 Intermediate puzzle (Pin and Win)
- 1 Advanced puzzle (Sacrifice to Checkmate)

## 🗄️ Database Schema

### User
- `id` - Unique identifier
- `name` - User's name
- `email` - Unique email address
- `password` - Hashed password
- `role` - ADMIN | STUDENT
- `stage` - NONE | BEGINNER | INTERMEDIATE | ADVANCED
- Relations: enrollments, payments, progress

### Puzzle
- `id` - Unique identifier
- `title` - Puzzle title
- `description` - Puzzle description
- `fen` - Chess position in FEN notation
- `solution` - Solution moves (e.g., "e2e4")
- `stage` - BEGINNER | INTERMEDIATE | ADVANCED
- `difficulty` - 1-10 rating
- `category` - Tactics, Checkmate, etc.
- `order` - Display order

### Enrollment
- `id` - Unique identifier
- `userId` - User ID
- `stage` - Enrolled stage
- Unique constraint: user can only enroll once per stage

### Payment
- `id` - Unique identifier
- `userId` - User ID
- `amount` - Payment amount
- `currency` - USD, etc.
- `status` - PENDING | COMPLETED | FAILED | REFUNDED
- `stripePaymentId` - Stripe payment reference

### Progress
- `id` - Unique identifier
- `userId` - User ID
- `puzzleId` - Puzzle ID
- `completed` - Boolean
- `attempts` - Number of attempts
- `lastAttempt` - Last attempt timestamp

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- `GET /api/auth/session` - Get current session

### Puzzles
- `GET /api/puzzles` - Get all puzzles (with user progress if authenticated)
- `GET /api/puzzles?stage=BEGINNER` - Filter by stage
- `POST /api/puzzles` - Create puzzle (admin only)
- `PUT /api/puzzles/[id]` - Update puzzle (admin only)
- `DELETE /api/puzzles/[id]` - Delete puzzle (admin only)

### Progress
- `POST /api/progress` - Update user progress on a puzzle

### Payments
- `POST /api/payments` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment and grant access

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/[id]/stage` - Update user stage (admin only)

## 🎮 Usage Guide

### For Students

1. **Sign Up**
   - Visit `/auth/signup`
   - Create account with email and password

2. **Enroll in a Course**
   - Click "Learn" in navigation
   - Click "Enroll in Beginner Course"
   - Complete payment (demo mode - instant success)

3. **Solve Puzzles**
   - Browse available puzzles by stage
   - Click "Start" on any puzzle
   - Drag and drop pieces to make moves
   - Use "Hint" button if stuck
   - Get instant feedback on moves

4. **Track Progress**
   - View completion status on puzzle cards
   - See your attempt count
   - Track your current learning stage

### For Administrators

1. **Login**
   - Use admin credentials
   - Access admin panel from navigation

2. **Manage Puzzles**
   - Create new puzzles with FEN positions
   - Set difficulty and category
   - Assign to learning stages
   - Delete outdated puzzles

3. **Manage Users**
   - View all registered users
   - See enrollment status
   - Manually upgrade users to next stage
   - Track payment history

## 🏗️ Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── puzzles/        # Puzzle CRUD
│   │   ├── progress/       # Progress tracking
│   │   ├── payments/       # Payment processing
│   │   └── admin/          # Admin endpoints
│   ├── auth/               # Auth pages (signin, signup)
│   ├── learn/              # Learning platform
│   ├── payment/            # Payment pages
│   ├── puzzle/             # Individual puzzle view
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # Navigation header
│   ├── footer.tsx          # Footer
│   └── auth-nav.tsx        # Auth navigation
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── auth.ts             # NextAuth configuration
├── prisma/
│   └── schema.prisma       # Database schema
├── scripts/
│   └── seed.ts             # Database seeder
└── middleware.ts           # Route protection

```

## 💳 Payment Flow

1. User clicks "Enroll" on a stage
2. Payment page displays course details and price
3. User clicks "Enroll Now"
4. System creates Stripe payment intent
5. Payment is simulated as successful (demo mode)
6. System confirms payment and:
   - Updates payment status to COMPLETED
   - Creates enrollment record
   - Updates user stage to enrolled level
7. User is redirected to learning page with access

**Note**: In production, you would integrate Stripe's payment elements for real card processing.

## 🎨 Design System

### Colors
- Primary: `#769656` (chess green)
- Secondary: `#5C1F1C` (dark brown)
- Light: `#eeeed2` (beige)
- Accent: `#baca44` (gold)

### Typography
- Font Family: Geist Sans, Geist Mono
- Base Size: 16px
- Responsive scaling

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🔒 Security Features

1. **Password Security**
   - bcrypt hashing with salt rounds
   - Minimum 6 characters requirement

2. **Authentication**
   - JWT-based sessions
   - Secure HTTP-only cookies
   - CSRF protection

3. **Authorization**
   - Middleware-based route protection
   - Role-based API access control
   - Client-side and server-side validation

4. **Data Protection**
   - Environment variable secrets
   - SQL injection prevention (Prisma)
   - XSS protection (Next.js built-in)

## 🚧 Future Enhancements

- Email verification
- Password reset functionality
- Social authentication (Google, Facebook)
- Real-time multiplayer chess
- Video lessons
- Live coaching sessions
- Achievement badges
- Leaderboards
- Mobile app (React Native)
- Advanced analytics dashboard

## 📄 License

This project is built for educational purposes as part of the Chesspure Academy platform.

## 🙏 Credits

- Chess UI: react-chessboard
- Chess Logic: chess.js
- UI Components: shadcn/ui
- Icons: Lucide React
- Platform Inspiration: ab-chess.com
