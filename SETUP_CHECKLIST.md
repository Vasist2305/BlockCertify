# BlockCertify Setup Checklist

Use this checklist to ensure everything is properly configured.

## ✅ Prerequisites

- [ ] Node.js v18+ installed (`node --version`)
- [ ] MongoDB installed and running (`mongosh` to test)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] MetaMask browser extension (for production)

## ✅ Installation

### 1. Clone and Install Dependencies

- [ ] Clone repository
- [ ] Run `npm install` in root directory
- [ ] Run `npm install` in backend directory
- [ ] Run `npm install` in blockchain directory (optional for dev)

### 2. Environment Configuration

#### Backend (.env)
- [ ] Copy `backend/.env.example` to `backend/.env`
- [ ] Set `PORT=5000`
- [ ] Set `MONGO_URI` (default: `mongodb://localhost:27017/blockcertify`)
- [ ] Set `JWT_SECRET` (any random string for dev)
- [ ] Set `FRONTEND_URL=http://localhost:5173`

**For Development (Optional):**
- [ ] Leave blockchain fields empty for mock mode
- [ ] Leave IPFS fields empty for mock mode

**For Production:**
- [ ] Set `BLOCKCHAIN_RPC_URL` (Infura Sepolia endpoint)
- [ ] Set `PRIVATE_KEY` (wallet private key)
- [ ] Set `CONTRACT_ADDRESS` (deployed contract address)
- [ ] Set `PINATA_JWT` (Pinata JWT token)

#### Frontend (.env)
- [ ] Copy `.env.example` to `.env`
- [ ] Set `VITE_API_URL=http://localhost:5000/api`

#### Blockchain (.env) - Only for Production
- [ ] Copy `blockchain/.env.example` to `blockchain/.env`
- [ ] Set `INFURA_API_KEY`
- [ ] Set `PRIVATE_KEY`
- [ ] Set `ETHERSCAN_API_KEY` (optional, for verification)

## ✅ Database Setup

- [ ] MongoDB service is running
- [ ] Can connect to MongoDB (`mongosh`)
- [ ] Database will be created automatically on first run

## ✅ Running the Application

### Development Mode (Mock Blockchain)

**Terminal 1 - Backend:**
- [ ] `cd backend`
- [ ] `npm run dev`
- [ ] See "Backend running on port 5000"
- [ ] See "MongoDB connected"

**Terminal 2 - Frontend:**
- [ ] `npm run dev` (from root)
- [ ] See "Local: http://localhost:5173"
- [ ] No errors in console

**Browser:**
- [ ] Open `http://localhost:5173`
- [ ] Page loads without errors
- [ ] Can navigate between pages

## ✅ Testing Basic Functionality

### Test 1: Institute Registration
- [ ] Click "Get Started"
- [ ] Select "Institute" role
- [ ] Fill registration form
- [ ] Submit successfully
- [ ] Redirected to institute dashboard

### Test 2: Student Registration
- [ ] Logout or use incognito window
- [ ] Select "Student" role
- [ ] Fill registration form
- [ ] Submit successfully
- [ ] Redirected to student dashboard

### Test 3: Certificate Request Flow
- [ ] Login as student
- [ ] Navigate to "Request Certificate"
- [ ] Fill and submit form
- [ ] See request in "Request History"
- [ ] Status shows "PENDING"

### Test 4: Certificate Issuance
- [ ] Login as institute
- [ ] Navigate to "Pending Requests"
- [ ] See student's request
- [ ] Approve request
- [ ] Navigate to "Issue Certificate"
- [ ] Fill certificate details
- [ ] Issue certificate successfully
- [ ] See in "Issued Certificates"

### Test 5: Certificate Verification
- [ ] Navigate to "Verify Certificate"
- [ ] Enter certificate ID
- [ ] See verification results
- [ ] Certificate details displayed correctly

## ✅ Production Setup (Optional)

### 1. Blockchain Setup
- [ ] Infura account created
- [ ] Sepolia project created
- [ ] API key copied
- [ ] MetaMask wallet setup
- [ ] Sepolia testnet ETH obtained
- [ ] Private key exported (keep secure!)

### 2. IPFS Setup
- [ ] Pinata account created
- [ ] API keys generated
- [ ] JWT token copied

### 3. Smart Contract Deployment
- [ ] `cd blockchain`
- [ ] `.env` configured
- [ ] `npx hardhat compile` runs successfully
- [ ] `npx hardhat run scripts/deploy.js --network sepolia` succeeds
- [ ] Contract address copied
- [ ] Contract address added to `backend/.env`

### 4. Backend Configuration
- [ ] All blockchain credentials in `backend/.env`
- [ ] Backend restarted
- [ ] No errors in console
- [ ] Blockchain connection successful

### 5. Testing Production Features
- [ ] Issue certificate creates real blockchain transaction
- [ ] Transaction hash visible on Sepolia Etherscan
- [ ] Certificate data stored on IPFS
- [ ] IPFS hash accessible via Pinata gateway
- [ ] Verification checks blockchain

## ✅ Common Issues Resolution

### MongoDB Connection Failed
- [ ] MongoDB service is running
- [ ] Port 27017 is not blocked
- [ ] MONGO_URI is correct
- [ ] Try: `mongosh` to test connection

### Backend Won't Start
- [ ] Port 5000 is available
- [ ] All dependencies installed
- [ ] .env file exists and is valid
- [ ] No syntax errors in code

### Frontend Can't Connect
- [ ] Backend is running
- [ ] VITE_API_URL is correct
- [ ] CORS is enabled in backend
- [ ] Check browser console for errors

### Smart Contract Deployment Failed
- [ ] Wallet has Sepolia ETH
- [ ] Infura API key is valid
- [ ] Private key is correct
- [ ] Network configuration is correct

## ✅ Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] Never commit private keys
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB is not exposed to internet
- [ ] CORS is configured properly
- [ ] Input validation is working

## ✅ Performance Checklist

- [ ] MongoDB indexes created (automatic)
- [ ] API responses are fast (<500ms)
- [ ] Frontend loads quickly
- [ ] No memory leaks
- [ ] Error handling is working

## ✅ Documentation

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Deployment process documented

## ✅ Next Steps

After completing this checklist:

1. **Customize the Application**
   - [ ] Update branding and colors
   - [ ] Customize certificate templates
   - [ ] Add institution logo
   - [ ] Configure email notifications

2. **Add Features**
   - [ ] QR code generation
   - [ ] Email notifications
   - [ ] Advanced analytics
   - [ ] Batch operations
   - [ ] API rate limiting

3. **Deploy to Production**
   - [ ] Choose hosting provider
   - [ ] Setup CI/CD pipeline
   - [ ] Configure domain and SSL
   - [ ] Setup monitoring
   - [ ] Configure backups

4. **Testing**
   - [ ] Write unit tests
   - [ ] Write integration tests
   - [ ] Perform security audit
   - [ ] Load testing
   - [ ] User acceptance testing

## Support

If you encounter issues not covered in this checklist:

1. Check console logs for errors
2. Review README.md and QUICKSTART.md
3. Check GitHub issues
4. Create new issue with details

## Success Criteria

Your setup is complete when:
- ✅ All tests pass
- ✅ No errors in console
- ✅ Can register users
- ✅ Can issue certificates
- ✅ Can verify certificates
- ✅ Data persists in MongoDB
- ✅ (Production) Blockchain transactions work

---

**Congratulations!** 🎉 Your BlockCertify installation is complete!
