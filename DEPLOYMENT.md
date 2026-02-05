# BlockCertify Deployment Guide

This guide covers deploying BlockCertify to production environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Smart Contract Deployment](#smart-contract-deployment)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Database Setup](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

### Required Accounts
- [ ] MongoDB Atlas account (or self-hosted MongoDB)
- [ ] Infura account (for Ethereum RPC)
- [ ] Pinata account (for IPFS)
- [ ] Hosting provider account (Vercel, Netlify, AWS, etc.)
- [ ] Domain name (optional but recommended)

### Required Tools
- [ ] Node.js v18+
- [ ] Git
- [ ] MetaMask wallet with Sepolia ETH

---

## Smart Contract Deployment

### Step 1: Prepare Wallet

1. **Get Sepolia ETH**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com)
   - Enter your wallet address
   - Wait for ETH to arrive

2. **Export Private Key**
   - Open MetaMask
   - Click account menu → Account Details → Export Private Key
   - **⚠️ KEEP THIS SECURE - NEVER SHARE OR COMMIT**

### Step 2: Configure Blockchain Environment

```bash
cd blockchain
cp .env.example .env
```

Edit `blockchain/.env`:
```env
INFURA_API_KEY=your_infura_project_id
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Step 3: Compile Contract

```bash
npx hardhat compile
```

Expected output:
```
Compiled 1 Solidity file successfully
```

### Step 4: Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Expected output:
```
Deploying BlockCertify contract...
BlockCertify deployed to: 0xYourContractAddress

Update your backend/.env file with:
CONTRACT_ADDRESS=0xYourContractAddress
```

### Step 5: Verify Contract (Optional)

```bash
npx hardhat verify --network sepolia 0xYourContractAddress
```

### Step 6: Save Contract Details

Save these for backend configuration:
- Contract Address: `0x...`
- Deployment Transaction: `0x...`
- Network: Sepolia
- Deployer Address: `0x...`

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Choose region closest to your backend

2. **Configure Access**
   - Database Access → Add User
   - Network Access → Add IP (0.0.0.0/0 for all, or specific IPs)

3. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blockcertify?retryWrites=true&w=majority
```

### Option 2: Self-Hosted MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu
   sudo apt-get install mongodb
   
   # Start service
   sudo systemctl start mongod
   ```

2. **Configure Security**
   - Enable authentication
   - Create admin user
   - Configure firewall

3. **Connection String**
   ```
   mongodb://username:password@your-server-ip:27017/blockcertify
   ```

---

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create blockcertify-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set PORT=5000
   heroku config:set MONGO_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set BLOCKCHAIN_RPC_URL="your_infura_url"
   heroku config:set PRIVATE_KEY="your_private_key"
   heroku config:set CONTRACT_ADDRESS="your_contract_address"
   heroku config:set PINATA_JWT="your_pinata_jwt"
   heroku config:set FRONTEND_URL="https://your-frontend-url.com"
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu Server
   - t2.micro for testing
   - Configure security group (ports 22, 80, 443, 5000)

2. **Connect and Setup**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   git clone your-repo
   cd blockcertify/backend
   npm install
   
   # Create .env file
   nano .env
   # Paste your environment variables
   
   # Start with PM2
   pm2 start server.js --name blockcertify-api
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx (Optional)**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/blockcertify
   ```

   Nginx config:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/blockcertify /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean
   - Create → Apps
   - Connect GitHub repository

2. **Configure**
   - Select backend directory
   - Set build command: `npm install`
   - Set run command: `npm start`

3. **Environment Variables**
   - Add all variables from `.env`

4. **Deploy**
   - Click "Deploy"

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd blockcertify
   vercel
   ```

3. **Configure Environment**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.com/api`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Environment Variables**
   - Netlify dashboard → Site settings → Environment variables
   - Add: `VITE_API_URL`

### Option 3: AWS S3 + CloudFront

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Enable static website hosting
   - Upload `dist` folder contents

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Enable HTTPS
   - Configure custom domain

4. **Update DNS**
   - Point domain to CloudFront

---

## Environment Configuration

### Production Backend .env

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blockcertify

# Security
JWT_SECRET=your_very_long_random_secret_key_here

# Blockchain
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0xYourContractAddress

# IPFS
PINATA_JWT=your_pinata_jwt_token

# CORS
FRONTEND_URL=https://yourdomain.com
```

### Production Frontend .env

```env
VITE_API_URL=https://api.yourdomain.com/api
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Monitoring & Maintenance

### 1. Application Monitoring

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs blockcertify-api
```

**Setup PM2 Plus (Optional):**
```bash
pm2 link your-secret-key your-public-key
```

### 2. Database Monitoring

**MongoDB Atlas:**
- Enable monitoring in dashboard
- Set up alerts for:
  - High CPU usage
  - Storage limits
  - Connection issues

### 3. Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/node
```

Add to `backend/server.js`:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### 4. Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

### 5. Backup Strategy

**Database Backups:**
```bash
# MongoDB Atlas: Automatic backups enabled
# Self-hosted:
mongodump --uri="mongodb://localhost:27017/blockcertify" --out=/backup/$(date +%Y%m%d)
```

**Application Backups:**
- Use Git for code
- Backup `.env` files securely
- Document contract addresses

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database authentication enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation active
- [ ] Private keys secured
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] Monitoring enabled

---

## Performance Optimization

### Backend
- [ ] Enable compression
- [ ] Implement caching (Redis)
- [ ] Database indexing
- [ ] Connection pooling
- [ ] Load balancing

### Frontend
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] CDN for static assets
- [ ] Minification enabled

---

## Scaling Considerations

### Horizontal Scaling
- Multiple backend instances
- Load balancer (Nginx, AWS ALB)
- Session management (Redis)

### Database Scaling
- MongoDB sharding
- Read replicas
- Connection pooling

### Blockchain
- Multiple RPC providers
- Fallback mechanisms
- Transaction queuing

---

## Rollback Procedure

If deployment fails:

1. **Backend Rollback**
   ```bash
   # Heroku
   heroku rollback
   
   # PM2
   pm2 restart blockcertify-api
   git checkout previous-commit
   npm install
   pm2 reload blockcertify-api
   ```

2. **Frontend Rollback**
   ```bash
   # Vercel
   vercel rollback
   
   # Netlify
   netlify rollback
   ```

---

## Post-Deployment Testing

- [ ] Health check endpoint responds
- [ ] Database connection works
- [ ] Authentication works
- [ ] Certificate issuance works
- [ ] Blockchain transactions succeed
- [ ] IPFS uploads work
- [ ] Verification works
- [ ] All pages load
- [ ] No console errors

---

## Maintenance Schedule

**Daily:**
- Check error logs
- Monitor uptime
- Review transactions

**Weekly:**
- Database backup verification
- Security updates
- Performance review

**Monthly:**
- Full system audit
- Cost optimization
- Feature updates

---

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
pm2 logs blockcertify-api

# Check environment
printenv | grep MONGO_URI

# Test MongoDB connection
mongosh "your_connection_string"
```

### Frontend Not Loading
- Check VITE_API_URL
- Verify CORS settings
- Check browser console
- Test API endpoint directly

### Blockchain Issues
- Verify RPC URL
- Check wallet balance
- Confirm contract address
- Test with Hardhat console

---

## Support & Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Heroku Docs](https://devcenter.heroku.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Hardhat Docs](https://hardhat.org/docs)
- [Infura Docs](https://docs.infura.io/)

---

## Cost Estimation

**Monthly Costs (Approximate):**
- MongoDB Atlas: $0 (Free tier) - $57+
- Heroku: $0 (Free tier) - $7+
- Vercel: $0 (Free tier) - $20+
- Infura: $0 (Free tier) - $50+
- Pinata: $0 (Free tier) - $20+
- Domain: $10-15/year
- SSL: $0 (Let's Encrypt)

**Total:** $0-150+/month depending on usage

---

**Deployment Complete!** 🚀

Your BlockCertify application is now live and ready for production use.
