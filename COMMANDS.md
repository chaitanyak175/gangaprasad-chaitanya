# Command Reference Guide

## 🚀 Quick Start Commands

### Initial Setup
```bash
cd /workspaces/gangaprasad-chaitanya
pnpm install
```

### Database Setup
```bash
# Generate Prisma client
pnpm prisma generate

# Push schema to MongoDB
pnpm prisma db push

# Seed sample questions (optional)
pnpm seed

# Open database GUI (optional)
pnpm prisma studio
```

### Environment Configuration
```bash
# Copy template
cp .env.local.example .env.local

# Edit with your credentials
nano .env.local
```

### Development Server
```bash
# Start on default port 3000
pnpm dev

# Start on custom port
pnpm dev -- -p 3001

# Run with debug logging
DEBUG=* pnpm dev
```

---

## 🔨 Development Commands

### Building
```bash
# Production build
pnpm build

# Start production server
pnpm start

# Check for TypeScript errors
pnpm tsc --noEmit
```

### Code Quality
```bash
# Lint code
pnpm lint

# Lint with fix
pnpm lint --fix

# Format code
prettier --write .
```

### Database Management
```bash
# Generate Prisma client
pnpm prisma generate

# Sync schema with DB
pnpm prisma db push

# Reset database (WARNING: deletes data)
pnpm prisma migrate reset

# Open Prisma Studio (GUI)
pnpm prisma studio

# View database logs
pnpm prisma db execute --stdin < queries.sql

# Create migration
pnpm prisma migrate dev --name [migration_name]
```

---

## 📦 Dependency Management

### Install Dependencies
```bash
pnpm install
# or
npm install
```

### Update Dependencies
```bash
pnpm update

# Update specific package
pnpm update package-name

# Check for outdated packages
pnpm outdated
```

### Add New Package
```bash
pnpm add package-name

# Add as dev dependency
pnpm add -D package-name
```

---

## 🌐 Testing URLs (Development)

```
Landing Page:      http://localhost:3000
Dashboard:         http://localhost:3000/dashboard
Sign In:           http://localhost:3000/auth/signin
Sign Up:           http://localhost:3000/auth/signup
API Questions:     http://localhost:3000/api/questions
API Friends:       http://localhost:3000/api/friends
Prisma Studio:     Local GUI (run: pnpm prisma studio)
```

---

## 🐛 Debugging Commands

### View Console Output
```bash
# With all logs
DEBUG=* pnpm dev

# With specific module logs
DEBUG=prisma:* pnpm dev
DEBUG=next:* pnpm dev
```

### Check Environment
```bash
# View all env vars
env | grep DATABASE_URL
env | grep NEXTAUTH

# Test API endpoint
curl http://localhost:3000/api/questions

# Test with authentication
curl -H "Cookie: [sessionCookie]" http://localhost:3000/api/friends
```

### Database Debugging
```bash
# Check if database is accessible
pnpm prisma db execute --stdin << 'EOF'
show dbs;
EOF

# Count questions
pnpm prisma db execute --stdin << 'EOF'
db.Question.countDocuments()
EOF

# View all users
pnpm prisma db execute --stdin << 'EOF'
db.User.find().pretty()
EOF
```

---

## 🚀 Deployment Commands

### Build for Production
```bash
# Build optimized version
pnpm build

# Test production build locally
pnpm build
pnpm start
```

### Vercel Deployment
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### AWS EC2 Deployment
```bash
# SSH into server
ssh -i your-key.pem ubuntu@your-ip

# Install Node
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Install pnpm
npm install -g pnpm

# Clone repo
git clone your-repo-url
cd your-repo

# Install and setup
pnpm install
pnpm build

# Run with PM2
npm install -g pm2
pm2 start "pnpm start" --name "dsa-dashboard"
pm2 save
```

---

## 🔄 Git Commands

### Version Control
```bash
# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push to remote
git push origin main

# View status
git status

# View log
git log --oneline

# Revert changes
git reset --hard HEAD~1
```

---

## 📊 Performance & Monitoring

### Check Build Size
```bash
# Analyze bundle
pnpm add -D @next/bundle-analyzer
# Then configure in next.config.ts
```

### Monitor Performance
```bash
# Check if server is running
curl -i http://localhost:3000

# Monitor real-time logs
tail -f /var/log/your-app.log

# Check memory usage
top

# Check disk space
df -h
```

---

## 🛠️ Troubleshooting Commands

### Common Fixes
```bash
# Clear build cache
rm -rf .next

# Clear node modules
rm -rf node_modules
pnpm install

# Restart development server
# Stop (Ctrl+C), then:
pnpm dev

# Reset database
pnpm prisma migrate reset

# Update schema
pnpm prisma db push

# Regenerate Prisma client
pnpm prisma generate
```

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 [PID]

# Or use different port
pnpm dev -- -p 3001
```

### Clear Environment
```bash
# Remove everything and start fresh
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm dev
```

---

## 🔒 Security Commands

### Generate Secrets
```bash
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Alternative
openssl rand -base64 32
```

### Check for Vulnerabilities
```bash
# Audit dependencies
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

---

## 📱 Database Commands (MongoDB)

### Using MongoDB Atlas CLI
```bash
# Connect to cluster
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/database"

# View databases
show databases

# Select database
use dsa-dashboard

# View collections
show collections

# Query documents
db.Question.find().pretty()

# Count documents
db.User.countDocuments()

# Find specific user
db.User.findOne({ email: "user@example.com" })

# Update document
db.User.updateOne(
  { _id: ObjectId("...") },
  { $set: { name: "New Name" } }
)

# Delete document
db.Question.deleteOne({ _id: ObjectId("...") })

# Bulk operations
db.UserQuestion.insertMany([...])
```

---

## 📝 Useful Aliases

### Add to ~/.bashrc or ~/.zshrc
```bash
alias dsa-dev="cd /workspaces/gangaprasad-chaitanya && pnpm dev"
alias dsa-build="cd /workspaces/gangaprasad-chaitanya && pnpm build"
alias dsa-test="cd /workspaces/gangaprasad-chaitanya && pnpm lint"
alias dsa-seed="cd /workspaces/gangaprasad-chaitanya && pnpm seed"
alias dsa-studio="cd /workspaces/gangaprasad-chaitanya && pnpm prisma studio"
alias dsa-migrate="cd /workspaces/gangaprasad-chaitanya && pnpm prisma migrate reset"
```

### Usage
```bash
dsa-dev      # Start development server
dsa-build    # Build for production
dsa-test     # Run linting
dsa-seed     # Seed database
dsa-studio   # Open Prisma Studio
dsa-migrate  # Reset database
```

---

## 🎯 Continuous Deployment (GitHub Actions)

### Create .github/workflows/deploy.yml
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install -g vercel pnpm
      - run: pnpm install
      - run: pnpm build
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 📋 Daily Development Routine

```bash
# Morning: Start development
pnpm dev

# During work: Make changes, test locally

# Before commit: Check code quality
pnpm lint
pnpm tsc --noEmit

# Commit and push
git add .
git commit -m "Feature: ..."
git push origin main

# Check deployment
# Vercel auto-deploys, wait for success

# End of day: Document changes
# Update CHANGELOG.md
```

---

## 🚨 Emergency Commands

```bash
# Stop dev server
# Ctrl + C

# Kill all Node processes
killall node

# Hard reset git
git reset --hard origin/main

# Delete all local changes
git checkout -- .

# Emergency database reset (caution!)
pnpm prisma migrate reset --force
```

---

## 📖 Man Pages & Help

```bash
# Next.js CLI help
pnpm next --help

# Prisma help
pnpm prisma --help

# pnpm help
pnpm --help

# Node version
node --version

# npm version
npm --version
```

---

**Last Updated**: 2024-06-22
**For more help**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
