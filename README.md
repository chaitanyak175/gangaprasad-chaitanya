# DSA Practice Dashboard 🚀

A modern, collaborative platform for practicing Data Structures and Algorithms with friends. Track progress, share approaches, and compete on leaderboards!

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: Secure email/password and Google OAuth sign-in
- **Friend Management**: Search and add friends, accept/reject requests
- **Question Tracking**: Browse curated DSA problems, mark as solved
- **Progress Dashboard**: Visualize your learning journey
- **Code Sharing**: Share your solution approaches with friends
- **Friend Progress Monitoring**: See which friends have solved each question
- **Daily Goals**: Set target questions per day
- **Leaderboard**: Track friend rankings by solve count
- **LeetCode Integration**: Direct links to problem statements

### 🎨 Design Features
- Modern dark theme with gradient accents
- Responsive design (desktop & mobile ready)
- Smooth animations and transitions
- Intuitive navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Deployment Ready**: Vercel, AWS, or any Node.js hosting

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- pnpm package manager

### Installation

1. **Clone and Install**
```bash
cd /workspaces/gangaprasad-chaitanya
pnpm install
```

2. **Set Up Environment**
```bash
cp .env.local.example .env.local
```

3. **Configure Variables** (see SETUP.md for detailed instructions)
Edit `.env.local` with:
- MongoDB connection string
- NextAuth secret
- Google OAuth credentials (optional)

4. **Initialize Database**
```bash
pnpm prisma generate
pnpm prisma db push
```

5. **Run Development Server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
/app
  /api                      # Backend API routes
    /auth                  # Authentication endpoints
    /friends               # Friend management
    /questions             # Question retrieval
    /progress              # Question progress tracking
    /stats                 # User statistics
    /daily-goals           # Daily practice goals
  
  /auth
    /signin               # Sign in page
    /signup               # Sign up page
  
  /dashboard
    /page.tsx            # Main dashboard
    /layout.tsx          # Dashboard layout
    /question
      /[questionId]      # Individual question page

/components               # Reusable React components

/lib
  /auth.ts               # NextAuth configuration
  /prisma.ts             # Prisma client
  /utils.ts              # Helper functions

/prisma
  /schema.prisma         # Database schema
```

## 🔐 Authentication

### Email/Password
- Sign up with email and password
- Passwords securely hashed with bcryptjs
- Session managed by NextAuth

### Google OAuth
- Social login integration
- Automatic account creation on first login
- Profile picture sync

## 📊 Database Schema

### User
- Basic profile information
- Email, name, profile image
- Timestamps for account creation

### FriendRequest
- Manages friend request workflow
- Status: pending, accepted, rejected
- Bidirectional relationships

### Friendship
- Establishes mutual friend connections
- Enables friend filtering

### Question
- DSA problems metadata
- Difficulty level, category, LeetCode URL
- Topic tags

### UserQuestion
- Tracks individual user progress
- Solved status, code approach, notes
- Timestamps

### DailyGoal
- Daily practice targets
- Questions per day setting
- Selected questions for the day

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)

### Friends
- `GET /api/friends` - Get user's friends list
- `POST /api/friends/requests` - Send friend request
- `GET /api/friends/requests` - Get pending requests
- `POST /api/friends/requests/[id]` - Accept/reject request

### Questions
- `GET /api/questions` - Get all questions (with filters)
- `GET /api/questions/[questionId]/friends-progress` - See friends' progress

### Progress
- `POST /api/progress` - Update question progress
- `GET /api/daily-goals` - Get today's goal
- `POST /api/daily-goals` - Set daily goal

### Utilities
- `GET /api/users/search` - Search users
- `GET /api/stats` - Get user statistics and leaderboard

## 🎮 Usage Guide

### Dashboard Overview
1. View your stats: questions solved, progress percentage
2. Check pending friend requests
3. Browse recent questions

### Adding Friends
1. Navigate to Friends tab
2. Search user by name or email
3. Click "Add" to send request
4. Friend receives notification
5. Once accepted, appear in friend list

### Solving Questions
1. Click on any question
2. Review problem details (difficulty, category, tags)
3. Click "Solve on LeetCode" to attempt problem
4. Return to dashboard
5. Paste your approach in the code field
6. Mark as solved and save

### Tracking Progress
- Overview tab shows overall stats
- Questions tab displays all problems with solve status
- Leaderboard shows you vs friends rankings
- View specific question to see which friends solved it

## 🔗 LeetCode Integration

All problems link directly to LeetCode:
- Click "Solve on LeetCode" button
- Problem opens in new tab
- Return to dashboard to save progress

## 🎯 Daily Goals

Set your daily practice target:
1. Go to dashboard settings
2. Select questions per day (e.g., 2 questions)
3. Choose specific questions
4. Track daily completion

## 📈 Leaderboard

Competitive element showing:
- Friend rankings
- Total questions solved
- Progress percentage
- Consistency metrics

## 📚 Additional Resources

- [Detailed Setup Guide](./SETUP.md)
- [Environment Variables Guide](./.env.local.example)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Guide](https://docs.mongodb.com)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

---

Happy coding! 🎉 Start solving problems with your friends today!
