# DSA Practice Dashboard - Setup Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
- Google OAuth credentials (optional, for social login)
- GitHub account (for LeetCode question references)

## Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up MongoDB

1. Create a MongoDB Atlas cluster:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free tier cluster
   - Create a database user with read/write permissions
   - Whitelist your IP address
   - Copy the connection string

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dsa-dashboard"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Google OAuth (Optional - for Google Sign In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub Token (Optional - for fetching DSA content)
GITHUB_TOKEN="your-github-token"
```

### 4. Generate Prisma Client

```bash
pnpm prisma generate
pnpm prisma db push
```

### 5. Initialize the Database with Sample Questions

```bash
pnpm seed  # (optional - if seed script is available)
```

### 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### 🎯 Core Features
- **Authentication**: Email/Password and Google OAuth sign-in
- **Friend Management**: Search users, send/accept friend requests
- **Question Tracking**: Mark questions as solved, view progress
- **Code Sharing**: Share your approach/code for each question
- **Progress Dashboard**: Track your DSA learning journey
- **Leaderboard**: See how friends are progressing
- **Daily Goals**: Set target questions per day
- **LeetCode Integration**: Direct links to LeetCode problems

### 📊 Dashboard Sections
1. **Overview**: Quick stats, pending requests, recent questions
2. **Questions**: Browse and track all DSA questions
3. **Friends**: Manage friend connections
4. **Leaderboard**: See friend rankings

## Project Structure

```
/app
  /api              - Backend API routes
  /auth             - Authentication pages
  /dashboard        - Dashboard pages
/components         - React components
/lib                - Utilities and configurations
/prisma            - Database schema
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `GET /api/friends` - Get user's friends
- `POST /api/friends/requests` - Send friend request
- `GET /api/friends/requests` - Get pending requests
- `POST /api/friends/requests/[id]` - Accept/reject request
- `GET /api/questions` - Get all questions
- `POST /api/progress` - Update question progress
- `GET /api/users/search` - Search users
- `GET /api/stats` - Get user statistics

## Troubleshooting

### MongoDB Connection Error
- Verify your connection string in .env.local
- Ensure your IP is whitelisted in MongoDB Atlas
- Check database user credentials

### Prisma Errors
- Run `pnpm prisma generate` to regenerate Prisma client
- Run `pnpm prisma db push` to sync schema with database

### Authentication Issues
- Ensure NEXTAUTH_URL matches your deployment URL
- Verify NEXTAUTH_SECRET is set and consistent
- Check Google OAuth credentials for social login

## Future Enhancements

- [ ] Real-time notifications for solved questions
- [ ] Code collaboration with live editor
- [ ] Interview preparation mode
- [ ] Problem difficulty recommendations based on performance
- [ ] Integration with more coding platforms
- [ ] Mobile app
- [ ] Video tutorials for solutions
- [ ] Streaming/Live sessions for group practice

## Support

For issues or questions, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
