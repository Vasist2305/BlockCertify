# BlockCertify Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "Cannot find module 'axios'"

**Solution:**
```bash
# Install axios
npm install axios

# Or reinstall all dependencies
npm install
```

### Issue: Browserslist warning

**Solution:**
```bash
# Update caniuse-lite
npm install caniuse-lite --save-dev

# Or ignore the warning (it's not critical)
```

---

## CSS/Styling Issues

### Issue: "@import must precede all other statements"

**Solution:**
Move all `@import` statements to the top of `src/index.css`, before `@tailwind` directives.

**Correct order:**
```css
@import url('...');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: Styles not loading

**Solution:**
```bash
# Restart dev server
# Press Ctrl+C in terminal
npm run dev
```

---

## MongoDB Issues

### Issue: "MongoDB connection failed"

**Solutions:**

1. **Check if MongoDB is running:**
```bash
# Test connection
mongosh

# If fails, start MongoDB:
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

2. **Check connection string:**
```env
# In backend/.env
MONGO_URI=mongodb://localhost:27017/blockcertify
```

3. **Check port 27017:**
```bash
# Windows:
netstat -ano | findstr :27017

# Mac/Linux:
lsof -i :27017
```

### Issue: "Authentication failed"

**Solution:**
If you enabled MongoDB authentication, update connection string:
```env
MONGO_URI=mongodb://username:password@localhost:27017/blockcertify
```

---

## Backend Issues

### Issue: Backend won't start

**Solutions:**

1. **Check .env file exists:**
```bash
cd backend
ls .env  # Should exist
```

2. **Check port 5000 is available:**
```bash
# Windows:
netstat -ano | findstr :5000
# If occupied, kill process:
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

3. **Check dependencies:**
```bash
cd backend
npm install
```

4. **Check for syntax errors:**
```bash
node server.js
# Look for error messages
```

### Issue: "JWT_SECRET is not defined"

**Solution:**
Add to `backend/.env`:
```env
JWT_SECRET=your_secret_key_here
```

### Issue: "Cannot find module"

**Solution:**
```bash
cd backend
npm install
```

---

## Frontend Issues

### Issue: Frontend won't start

**Solutions:**

1. **Check port 5173 is available:**
```bash
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

2. **Clear Vite cache:**
```bash
rm -rf node_modules/.vite
npm run dev
```

3. **Rebuild:**
```bash
npm run build
npm run dev
```

### Issue: "Failed to resolve import"

**Solution:**
```bash
# Install missing dependency
npm install <package-name>

# Or reinstall all
rm -rf node_modules package-lock.json
npm install
```

### Issue: White screen / blank page

**Solutions:**

1. **Check browser console** (F12)
   - Look for error messages
   - Check Network tab for failed requests

2. **Check backend is running:**
```bash
curl http://localhost:5000/api/auth/institutes
```

3. **Check CORS:**
   - Verify `FRONTEND_URL` in backend/.env
   - Should match your frontend URL

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

---

## API Connection Issues

### Issue: "Network Error" or "Failed to fetch"

**Solutions:**

1. **Check backend is running:**
```bash
# Should return JSON
curl http://localhost:5000/api/auth/institutes
```

2. **Check VITE_API_URL:**
```env
# In .env (root directory)
VITE_API_URL=http://localhost:5000/api
```

3. **Restart frontend after .env changes:**
```bash
# Stop dev server (Ctrl+C)
npm run dev
```

4. **Check CORS settings:**
```javascript
// backend/app.js should have:
app.use(cors());
```

### Issue: "401 Unauthorized"

**Solutions:**

1. **Check token is saved:**
```javascript
// In browser console:
localStorage.getItem('token')
```

2. **Login again:**
   - Token may have expired
   - Re-authenticate

3. **Check JWT_SECRET:**
   - Same secret in backend/.env
   - Restart backend after changes

---

## Blockchain Issues

### Issue: "Failed to connect to blockchain"

**Solution:**
This is normal in development mode! The app works in mock mode without blockchain.

To enable real blockchain:
1. Get Infura API key
2. Add to `backend/.env`:
```env
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
```

### Issue: "Transaction failed"

**Solutions:**

1. **Check wallet has Sepolia ETH:**
   - Get from [Sepolia Faucet](https://sepoliafaucet.com)

2. **Check RPC URL:**
   - Verify Infura project is active
   - Check API key is correct

3. **Check contract address:**
   - Verify contract is deployed
   - Check address is correct

---

## Smart Contract Issues

### Issue: "Contract deployment failed"

**Solutions:**

1. **Check wallet balance:**
```bash
# In MetaMask, switch to Sepolia network
# Check you have ETH
```

2. **Check Infura API key:**
```bash
cd blockchain
cat .env
# Verify INFURA_API_KEY is set
```

3. **Check private key:**
```bash
# Verify PRIVATE_KEY is set (without 0x prefix)
```

4. **Try again:**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Issue: "Compilation failed"

**Solutions:**

1. **Install dependencies:**
```bash
cd blockchain
npm install
```

2. **Check Solidity version:**
```javascript
// hardhat.config.ts
solidity: {
  version: "0.8.28"
}
```

3. **Clean and recompile:**
```bash
npx hardhat clean
npx hardhat compile
```

---

## IPFS Issues

### Issue: "Failed to upload to IPFS"

**Solutions:**

1. **Check Pinata JWT:**
```env
# In backend/.env
PINATA_JWT=your_jwt_token
```

2. **Verify Pinata account:**
   - Login to [Pinata](https://pinata.cloud)
   - Check API keys are active

3. **Test connection:**
```bash
curl -X GET https://api.pinata.cloud/data/testAuthentication \
  -H "Authorization: Bearer YOUR_JWT"
```

### Issue: "Cannot retrieve from IPFS"

**Solutions:**

1. **Check IPFS hash:**
   - Should start with "Qm" or "bafy"

2. **Try different gateway:**
```javascript
// Try these URLs:
https://gateway.pinata.cloud/ipfs/HASH
https://ipfs.io/ipfs/HASH
https://cloudflare-ipfs.com/ipfs/HASH
```

---

## Performance Issues

### Issue: Slow page loads

**Solutions:**

1. **Check database indexes:**
```javascript
// MongoDB automatically creates indexes
// But you can verify:
db.certificates.getIndexes()
```

2. **Enable caching:**
```javascript
// Add to backend
const cache = require('memory-cache');
```

3. **Optimize queries:**
```javascript
// Use .select() to limit fields
Certificate.find().select('certificateId status')
```

### Issue: High memory usage

**Solutions:**

1. **Limit query results:**
```javascript
// Add pagination
.limit(10).skip(page * 10)
```

2. **Close database connections:**
```javascript
// Mongoose handles this automatically
```

3. **Restart servers:**
```bash
# Stop and restart both servers
```

---

## Development Workflow Issues

### Issue: Changes not reflecting

**Solutions:**

1. **Hard refresh browser:**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

2. **Restart dev server:**
```bash
# Stop (Ctrl+C) and restart
npm run dev
```

3. **Clear Vite cache:**
```bash
rm -rf node_modules/.vite
```

4. **Check file is saved:**
   - Verify changes are saved
   - Check correct file is edited

### Issue: Hot reload not working

**Solutions:**

1. **Check Vite config:**
```javascript
// vite.config.ts should have:
server: {
  watch: {
    usePolling: true
  }
}
```

2. **Restart dev server**

---

## Production Issues

### Issue: Build fails

**Solutions:**

1. **Check for TypeScript errors:**
```bash
npm run build
# Look for type errors
```

2. **Fix import errors:**
```typescript
// Use correct import paths
import { Component } from '@/components/Component'
```

3. **Check environment variables:**
```bash
# Ensure VITE_API_URL is set
```

### Issue: Deployed app not working

**Solutions:**

1. **Check environment variables:**
   - All variables set in hosting platform
   - API URL points to production backend

2. **Check CORS:**
```javascript
// backend/app.js
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
```

3. **Check logs:**
   - Backend logs for errors
   - Browser console for frontend errors

---

## Database Issues

### Issue: Data not persisting

**Solutions:**

1. **Check MongoDB is running:**
```bash
mongosh
use blockcertify
db.users.find()
```

2. **Check connection:**
```javascript
// Should see "MongoDB connected" in backend logs
```

3. **Check model definitions:**
```javascript
// Verify models are properly defined
```

### Issue: Duplicate key error

**Solutions:**

1. **Check unique constraints:**
```javascript
// In models, check unique fields
walletAddress: { type: String, unique: true }
```

2. **Drop and recreate:**
```bash
mongosh
use blockcertify
db.users.drop()
# Restart backend to recreate
```

---

## Testing Issues

### Issue: Tests failing

**Solutions:**

1. **Install test dependencies:**
```bash
npm install --save-dev vitest @testing-library/react
```

2. **Check test configuration:**
```javascript
// vitest.config.ts should exist
```

3. **Run tests:**
```bash
npm test
```

---

## Getting More Help

### Check Logs

**Backend logs:**
```bash
cd backend
npm run dev
# Watch console output
```

**Frontend logs:**
- Open browser console (F12)
- Check Console tab
- Check Network tab

### Debug Mode

**Enable debug logging:**
```env
# backend/.env
NODE_ENV=development
DEBUG=*
```

### Common Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# List running processes
# Windows:
tasklist | findstr node

# Mac/Linux:
ps aux | grep node
```

### Still Stuck?

1. Check documentation files
2. Review error messages carefully
3. Search GitHub issues
4. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Logs

---

## Quick Fixes Checklist

When something breaks, try these in order:

- [ ] Restart dev servers
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check MongoDB is running
- [ ] Check .env files exist and are correct
- [ ] Clear node_modules and reinstall
- [ ] Check console for errors
- [ ] Verify ports are available
- [ ] Check all services are running
- [ ] Review recent changes
- [ ] Check documentation

---

**Most issues can be solved by:**
1. Restarting servers
2. Checking .env files
3. Ensuring MongoDB is running
4. Clearing cache and reinstalling dependencies

Good luck! 🚀
