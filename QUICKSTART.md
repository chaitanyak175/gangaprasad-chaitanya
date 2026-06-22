# Quick Start Guide - 5 Minutes to Dashboard

## 1️⃣ Install Dependencies (1 min)
```bash
cd /workspaces/gangaprasad-chaitanya
pnpm install
```

## 2️⃣ Set Up Database (2 min)

### MongoDB Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free tier cluster
3. Create database user
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dsa`

### Configure Environment
```bash
# Create .env.local
cp .env.local.example .env.local

# Edit .env.local with:
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dsa-dashboard"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))""
```

## 3️⃣ Initialize Database (1 min)
```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# Optional: Seed sample questions
pnpm seed
```

## 4️⃣ Start Development Server (1 min)
```bash
pnpm dev
```

🎉 **Open http://localhost:3000**

---

## Quick Test Walkthrough

### 1. Create Account
- Click "Get Started"
- Fill signup form
- Verify account

### 2. Explore Dashboard
- View overview stats
- Browse questions
- Check leaderboard

### 3. Add Friend
- Go to Friends tab
- Search user by email
- Send request

### 4. Solve Question
- Go to Questions tab
- Click "Solve" button
- Mark as solved when done

---

## Essential Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Run production build

# Database
pnpm seed             # Populate sample questions
pnpm prisma studio   # Open database GUI

# Code Quality
pnpm lint            # Run ESLint
pnpm tsc --noEmit   # Check TypeScript

# Cleanup
pnpm prisma generate # Regenerate Prisma client
rm -rf .next         # Clear build cache
```

---

## Environment Variables Quick Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | MongoDB connection | `mongodb+srv://...` |
| `NEXTAUTH_URL` | App URL for auth | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Session encryption | `[random-hex-string]` |
| `GOOGLE_CLIENT_ID` | Google OAuth (optional) | `xxx.apps.google...` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth (optional) | `GOCSPX-xxx` |

---

## File Structure Overview

```
Root
├── /app                    # Next.js app directory
│   ├── /api               # API endpoints
│   ├── /auth              # Auth pages (signin/signup)
│   ├── /dashboard         # Main dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── /components            # React components (reusable)
├── /lib                   # Utilities & config
├── /prisma               # Database schema
├── /scripts              # Helper scripts (seed.ts)
├── /public               # Static assets
├── package.json          # Dependencies
├── README.md             # Full documentation
├── SETUP.md             # Setup instructions
├── DEPLOYMENT.md        # Deployment guide
├── FEATURES.md          # Feature documentation
└── TROUBLESHOOTING.md   # Common issues
```

---

## Next Steps

1. **Customize Questions**
   - Edit `/scripts/seed.ts` to add/modify questions
   - Run `pnpm seed` to update database

2. **Add Google OAuth** (Optional)
   - Get credentials from Google Cloud Console
   - Add to .env.local
   - Test sign-in with Google

3. **Deploy**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Vercel recommended (1 click deployment)

4. **Customize UI**
   - Edit colors in Tailwind config
   - Modify component styling
   - Add your branding

---

## Troubleshooting Quick Fixes

**Database connection error?**
```bash
pnpm prisma db push
```

**TypeScript errors?**
```bash
pnpm prisma generate
```

**Can't find questions?**
```bash
pnpm seed
```

**Port 3000 already in use?**
```bash
pnpm dev -- -p 3001
```

---

## Common Questions

**Q: How do I add more questions?**
A: Edit `scripts/seed.ts` and run `pnpm seed`

**Q: How do I deploy?**
A: See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Q: Can I use a different database?**
A: Yes! Modify `prisma/schema.prisma` and update DATABASE_URL

**Q: How do I reset the database?**
A: Run `pnpm prisma migrate reset`

---

## Support Resources

- 📖 [Full README](./README.md)
- 🛠️ [Setup Guide](./SETUP.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- ✨ [Features Guide](./FEATURES.md)
- 🐛 [Troubleshooting](./TROUBLESHOOTING.md)

---

**Happy coding! 🚀**

Need help? Check TROUBLESHOOTING.md or review the code comments.
