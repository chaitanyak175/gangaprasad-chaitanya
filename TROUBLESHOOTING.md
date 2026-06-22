# Troubleshooting Guide

## Common Issues & Solutions

### Authentication Issues

#### "Unauthorized" Error on Dashboard
**Problem**: Can't access dashboard even after login
**Solution**:
1. Clear browser cookies/cache
2. Try signing out and signing back in
3. Check if session is expired
4. Verify NEXTAUTH_URL matches current domain

#### Google OAuth Not Working
**Problem**: Google sign-in button not working
**Solution**:
1. Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local
2. Check authorized redirect URIs in Google Cloud Console
3. Ensure URI matches: `{NEXTAUTH_URL}/api/auth/callback/google`
4. For localhost: `http://localhost:3000/api/auth/callback/google`
5. For production: `https://yourdomain.com/api/auth/callback/google`

#### Password Reset Not Working
**Problem**: Can't reset password
**Solution**:
1. Check if reset email is being sent
2. Verify email service configuration (future feature)
3. Check spam folder for reset email

### Database Connection Issues

#### "MongooseConnectionError" or Connection Timeout
**Problem**: Can't connect to MongoDB
**Solution**:
1. Verify DATABASE_URL format
2. Check MongoDB username and password
3. Ensure IP address is whitelisted in MongoDB Atlas
4. Test connection string in MongoDB Compass
5. Verify database name is correct in URL

```bash
# Test connection
npx prisma db push
```

#### "ENOTFOUND mongodb+srv://..."
**Problem**: Can't resolve MongoDB server
**Solution**:
1. Check internet connection
2. Verify DNS resolution:
   ```bash
   nslookup mongodb.net
   ```
3. Disable VPN if using one
4. Check firewall settings

#### Database Schema Out of Sync
**Problem**: "Unknown field" errors or schema mismatches
**Solution**:
```bash
# Regenerate Prisma client
pnpm prisma generate

# Sync database schema
pnpm prisma db push

# Or reset completely
pnpm prisma migrate reset
```

### Friend Management Issues

#### Can't Find Friends
**Problem**: User search returns no results
**Solution**:
1. Ensure friend is registered in system
2. Try searching by exact email
3. Check if friend's account is active
4. Wait 5 seconds after signup (user indexing)

#### Friend Request Stuck as Pending
**Problem**: Friend request not accepting
**Solution**:
1. Refresh dashboard
2. Have friend check notifications
3. Check database:
   ```bash
   pnpm prisma studio
   ```
4. Manually update if needed

#### Can't Remove Friends
**Problem**: No option to remove friend
**Solution**:
1. This feature is planned (not yet implemented)
2. Workaround: Contact administrator
3. Alternative: Block user (future feature)

### Question/Progress Issues

#### Questions Not Showing
**Problem**: Questions tab is empty
**Solution**:
1. Run seed script to populate questions:
   ```bash
   pnpm seed
   ```
2. Check if questions exist in database:
   ```bash
   pnpm prisma studio
   ```
3. Verify API endpoint:
   ```bash
   curl http://localhost:3000/api/questions
   ```

#### Can't Mark Question as Solved
**Problem**: Progress not saving
**Solution**:
1. Check internet connection
2. Verify user is logged in
3. Check browser console for errors
4. Try refreshing page
5. Check if question exists in database

#### Progress Not Updating
**Problem**: Marked question but status doesn't change
**Solution**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check if API is responding:
   ```bash
   curl -X POST http://localhost:3000/api/progress \
     -H "Content-Type: application/json" \
     -d '{"questionId":"1","solved":true}'
   ```

### Performance Issues

#### Dashboard Loading Slowly
**Problem**: Page takes long time to load
**Solution**:
1. Check network speed (F12 > Network tab)
2. Verify MongoDB connection speed
3. Check if database has many questions
4. Implement pagination (coming soon)

#### Too Many API Calls
**Problem**: Browser making excessive API requests
**Solution**:
1. Reduce search frequency
2. Implement debouncing (coming soon)
3. Check for duplicate requests

### UI/Display Issues

#### Layout Broken on Mobile
**Problem**: Dashboard not responsive
**Solution**:
1. Check browser zoom (should be 100%)
2. Try different mobile device
3. Use responsive design mode in DevTools (F12)
4. Report issue if still broken

#### Dark Mode Not Working
**Problem**: Page shows light theme
**Solution**:
1. Check browser dark mode settings
2. Force dark mode in browser settings
3. Clear CSS cache: `Ctrl+Shift+R`

#### Buttons Not Clickable
**Problem**: Can't click buttons
**Solution**:
1. Check z-index issues in DevTools
2. Try different browser
3. Disable browser extensions
4. Clear browser cache

### API Endpoint Issues

#### 401 Unauthorized on API Calls
**Problem**: API returns unauthorized error
**Solution**:
1. Verify user is logged in
2. Check session cookie exists
3. Verify NEXTAUTH_SECRET is set
4. Check if session is expired

#### 404 Not Found Errors
**Problem**: API endpoint not found
**Solution**:
1. Verify endpoint URL spelling
2. Check file exists in `/app/api/`
3. Verify route parameter names match
4. Restart dev server

#### 500 Internal Server Error
**Problem**: Server error on API call
**Solution**:
1. Check terminal for error logs
2. Verify database connection
3. Check Prisma schema validity
4. Enable debug logging:
   ```bash
   DEBUG=* pnpm dev
   ```

### Build and Deployment Issues

#### Build Failing
**Problem**: `pnpm build` fails
**Solution**:
1. Clear node_modules:
   ```bash
   rm -rf node_modules
   pnpm install
   ```
2. Regenerate Prisma:
   ```bash
   pnpm prisma generate
   ```
3. Check for TypeScript errors:
   ```bash
   pnpm tsc --noEmit
   ```

#### Deployment Fails on Vercel
**Problem**: Vercel deployment fails
**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all environment variables set
3. Ensure Git history is clean
4. Check file permissions

#### Environment Variables Not Loading
**Problem**: Config not reading from .env.local
**Solution**:
1. Verify `.env.local` file exists
2. Check file permissions
3. Restart dev server after editing
4. Verify variable names exactly match

### Performance Optimization

#### Slow Database Queries
**Problem**: Dashboard loads slowly
**Solution**:
1. Add database indexes (in Prisma schema)
2. Optimize queries with `include`/`select`
3. Implement query caching
4. Use pagination for large datasets

#### High Memory Usage
**Problem**: App consuming too much RAM
**Solution**:
1. Check for memory leaks in browser
2. Reduce dataset size
3. Implement pagination
4. Profile with DevTools

## Debug Mode

### Enable Debug Logging
```bash
DEBUG=* pnpm dev
```

### Database Studio
```bash
pnpm prisma studio
```

### Check Environment
```bash
echo $DATABASE_URL
echo $NEXTAUTH_URL
```

## Getting Help

### Resources
1. **Documentation**: See README.md, SETUP.md
2. **Code Examples**: Check `/app/api/` for patterns
3. **GitHub Issues**: Search existing issues
4. **Discord/Community**: Join developer communities

### When Reporting Issues
Include:
- Error message (exact text)
- Steps to reproduce
- Browser and OS version
- Relevant logs from terminal
- Screenshot if UI issue

## Known Limitations

- ⚠️ Real-time notifications not yet implemented
- ⚠️ Email reminders coming soon
- ⚠️ Code collaboration editor planned
- ⚠️ Mobile app in development
- ⚠️ Streaming sessions under planning

---

Last Updated: 2024
