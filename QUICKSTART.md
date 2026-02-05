# BlockCertify - Quick Start Guide

Get BlockCertify up and running in 10 minutes!

## Prerequisites

Before you begin, ensure you have:
- Node.js v18+ installed
- MongoDB installed and running
- MetaMask browser extension
- Git

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd blockcertify

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install blockchain dependencies
cd ../blockchain
npm install
cd ..
```

## Step 2: Configure Environment (3 minutes)

### Backend Configuration

Create `backend/.env`:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blockcertify
JWT_SECRET=my_super_secret_jwt_key_12345

# For development, you can use mock mode (leave these empty initially)
BLOCKCHAIN_RPC_URL=
PRIVATE_KEY=
CONTRACT_ADDRESS=

# IPFS - Get free account at pinata.cloud
PINATA_API_KEY=
PINATA_SECRET_KEY=
PINATA_JWT=

FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

Create `.env` in root:
```bash
cd ..
cp .env.example .env
```

Content:
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB (1 minute)

```bash
# Start MongoDB service
# On Windows:
net start MongoDB

# On Mac:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# Or run directly:
mongod
```

## Step 4: Run the Application (1 minute)

Open 2 terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Backend running on port 5000
MongoDB connected
```

**Terminal 2 - Frontend:**
```bash
# From root directory
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173
```

## Step 5: Access the Application (1 minute)

Open your browser and go to: `http://localhost:5173`

## Development Mode Features

The application runs in **mock mode** for development, which means:
- ✅ All features work without blockchain setup
- ✅ Mock transaction hashes are generated
- ✅ No need for testnet ETH or Infura
- ✅ Perfect for UI/UX development

## Testing the Application

### Register as Institute

1. Click "Get Started"
2. Select "Institute" role
3. Fill in details:
   - Name: MIT University
   - Email: admin@mit.edu
   - Wallet: 0x1234... (any address)
4. Click Register

### Register as Student

1. Open incognito window or logout
2. Select "Student" role
3. Fill in details:
   - Name: John Doe
   - Email: john@student.edu
   - Roll Number: CS2021001
   - Wallet: 0x5678... (different address)
4. Click Register

### Request Certificate (Student)

1. Login as student
2. Go to "Request Certificate"
3. Fill form and submit
4. View in "Request History"

### Issue Certificate (Institute)

1. Login as institute
2. Go to "Pending Requests"
3. Approve student request
4. Go to "Issue Certificate"
5. Fill details and issue
6. View in "Issued Certificates"

### Verify Certificate

1. Go to "Verify Certificate" page
2. Enter certificate ID
3. View verification results

## Next Steps - Production Setup

When ready for production with real blockchain:

### 1. Get Infura API Key
- Sign up at [infura.io](https://infura.io)
- Create project
- Copy Sepolia endpoint

### 2. Get Pinata Account
- Sign up at [pinata.cloud](https://pinata.cloud)
- Generate API keys
- Copy JWT token

### 3. Setup MetaMask
- Install MetaMask
- Create/import wallet
- Get Sepolia testnet ETH from [faucet](https://sepoliafaucet.com)
- Export private key

### 4. Deploy Smart Contract

```bash
cd blockchain
cp .env.example .env
# Edit .env with your keys

# Compile contract
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Copy contract address to backend/.env
```

### 5. Update Backend Configuration

Edit `backend/.env`:
```env
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
PINATA_JWT=your_pinata_jwt
```

### 6. Restart Backend

```bash
cd backend
npm run dev
```

Now your application is connected to real blockchain!

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not, start it:
mongod
```

### Port Already in Use
```bash
# Backend (port 5000)
# Kill process on Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect to Backend
- Check backend is running on port 5000
- Verify VITE_API_URL in .env
- Check browser console for CORS errors

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Common Issues

**Q: Do I need blockchain to test the app?**
A: No! The app works in mock mode for development.

**Q: Where is the data stored?**
A: In MongoDB locally. Check with `mongosh` command.

**Q: Can I use a different database?**
A: Yes, update MONGO_URI in backend/.env

**Q: How do I reset the database?**
```bash
mongosh
use blockcertify
db.dropDatabase()
```

## Project Structure

```
blockcertify/
├── backend/           # Express API server
├── blockchain/        # Smart contracts
├── src/              # React frontend
│   ├── pages/        # Application pages
│   ├── components/   # UI components
│   └── lib/          # API & utilities
└── public/           # Static files
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Blockchain
- `npx hardhat compile` - Compile contracts
- `npx hardhat test` - Run tests
- `npx hardhat run scripts/deploy.js` - Deploy

## Support

Need help? Check:
- Full README.md for detailed documentation
- GitHub Issues for known problems
- Console logs for error messages

## What's Next?

- Customize certificate templates
- Add email notifications
- Implement QR codes
- Deploy to production
- Add more features!

Happy coding! 🚀
