# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with repo pushed
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial DSA Dashboard commit"
git push origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com/new
- Import your GitHub repository
- Select the project root

3. **Configure Environment Variables**
In Vercel project settings, add:
- `DATABASE_URL` - MongoDB connection string
- `NEXTAUTH_URL` - Your domain (e.g., https://yourdomain.vercel.app)
- `NEXTAUTH_SECRET` - Generated secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

4. **Deploy**
- Click "Deploy"
- Vercel will build and deploy automatically

## AWS Deployment

### Using EC2

1. **Create EC2 Instance**
- Launch Ubuntu 22.04 LTS instance
- Configure security groups (allow ports 80, 443, 3000)

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm git

# Install pnpm
npm install -g pnpm
```

3. **Clone and Setup**
```bash
git clone <your-repo>
cd <repo>
pnpm install
pnpm prisma generate
pnpm prisma db push
```

4. **Create .env.local**
```bash
nano .env.local
# Add all environment variables
```

5. **Build**
```bash
pnpm build
```

6. **Run with PM2**
```bash
npm install -g pm2
pm2 start "pnpm start" --name "dsa-dashboard"
pm2 save
```

7. **Configure Nginx Reverse Proxy**
```nginx
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}
```

## Railway Deployment

1. **Push to GitHub**

2. **Create Railway Account** at railway.app

3. **Connect GitHub Repository**
- Link your repo in Railway dashboard

4. **Configure Variables**
- Add all environment variables from .env.local

5. **Deploy**
- Railway auto-deploys on push

## Production Checklist

- [ ] Update NEXTAUTH_URL to production domain
- [ ] Generate new NEXTAUTH_SECRET for production
- [ ] Configure MongoDB production database
- [ ] Set up Google OAuth for production domain
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Configure email notifications
- [ ] Test authentication flow
- [ ] Verify all API endpoints
- [ ] Test friend connections and progress tracking
- [ ] Load test the application
- [ ] Set up CI/CD pipeline

## Environment Variables for Production

```env
DATABASE_URL="mongodb+srv://prod-user:prod-password@prod-cluster.mongodb.net/dsa-production"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="[generate-new-secret]"
GOOGLE_CLIENT_ID="[prod-google-id]"
GOOGLE_CLIENT_SECRET="[prod-google-secret]"
NODE_ENV="production"
```

## Monitoring

### Set Up Error Tracking
- Consider using Sentry for error tracking
- Set up log aggregation with LogRocket

### Performance Monitoring
- Use Next.js analytics
- Monitor database performance
- Track API response times

## Database Backups

### MongoDB Atlas
- Enable automated backups (in Free tier or higher)
- Configure backup retention period
- Test restoration regularly

## Security Best Practices

1. **API Security**
- Rate limiting on API routes
- CORS configuration
- Input validation

2. **Authentication**
- Secure password hashing (already implemented)
- Rate limiting on auth endpoints
- Session timeout

3. **Database**
- Use strong database credentials
- Enable network access only from app
- Regular security audits

4. **Secrets Management**
- Never commit .env.local
- Use platform's secret management
- Rotate secrets regularly

## Troubleshooting Deployment

### Build Failures
```bash
# Clear build cache
rm -rf .next
pnpm build

# Check Prisma generation
pnpm prisma generate
```

### Database Connection Issues
- Verify IP whitelist in MongoDB
- Check connection string syntax
- Test connection locally before deploying

### Environmental Variables Not Loading
- Verify variable names match exactly
- Check for typos in Vercel/platform dashboard
- Restart deployment after changing variables

## Scaling Considerations

As user base grows:
1. Consider database optimization
2. Implement caching (Redis)
3. Use CDN for static assets
4. Consider read replicas for database
5. Implement background job queue for notifications

## Rollback Procedure

### Vercel
- Use Vercel dashboard to rollback to previous deployment

### AWS/Railway
```bash
# Revert to previous commit
git revert <commit-hash>
git push

# Redeploy
# Platform will auto-deploy
```

---

For detailed help with specific platforms, refer to their documentation:
- [Vercel Deployment](https://vercel.com/docs)
- [AWS Documentation](https://docs.aws.amazon.com)
- [Railway Documentation](https://docs.railway.app)
