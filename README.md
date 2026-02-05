# BlockCertify - Blockchain-Based Certificate Verification System

A decentralized certificate verification platform built with React, Node.js, MongoDB, and Ethereum smart contracts. BlockCertify enables educational institutions to issue tamper-proof certificates on the blockchain while providing students and verifiers with instant verification capabilities.

## Features

### For Students
- Request certificates from institutions
- View issued certificates with blockchain verification
- Track request history and status
- Secure wallet-based authentication
- Download and share certificates

### For Institutions
- Issue certificates on blockchain
- Manage pending certificate requests
- Bulk certificate issuance
- Revoke certificates when needed
- Analytics and reporting dashboard
- Student management

### For Verifiers
- Instant certificate verification
- Blockchain-backed authenticity
- QR code scanning support
- Detailed certificate information

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS + shadcn/ui components
- React Query for data fetching
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Ethers.js for blockchain interaction
- IPFS (Pinata) for certificate storage

### Blockchain
- Solidity smart contracts
- Hardhat development environment
- Ethereum (Sepolia testnet)
- OpenZeppelin contracts

## Project Structure

```
blockcertify/
├── backend/              # Node.js backend
│   ├── config/          # Database configuration
│   ├── contracts/       # Smart contract files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Blockchain & IPFS services
│   └── server.js        # Entry point
├── blockchain/          # Smart contract development
│   ├── contracts/       # Solidity contracts
│   ├── scripts/         # Deployment scripts
│   └── test/           # Contract tests
├── src/                # React frontend
│   ├── components/     # UI components
│   ├── contexts/       # React contexts
│   ├── lib/           # Utilities & API
│   └── pages/         # Application pages
└── public/            # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- MetaMask wallet
- Infura account (for blockchain RPC)
- Pinata account (for IPFS)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd blockcertify
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blockcertify
JWT_SECRET=your_secure_jwt_secret_key

# Blockchain Configuration
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address

# IPFS Configuration (Pinata)
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
PINATA_JWT=your_pinata_jwt

FRONTEND_URL=http://localhost:5173
```

Start MongoDB:
```bash
# If using local MongoDB
mongod
```

Run backend:
```bash
npm run dev
```

### 3. Smart Contract Deployment

```bash
cd blockchain
npm install
```

Create `.env` file in blockchain directory:
```env
INFURA_API_KEY=your_infura_key
PRIVATE_KEY=your_wallet_private_key
```

Compile contracts:
```bash
npx hardhat compile
```

Deploy to Sepolia testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Copy the deployed contract address to backend `.env` file.

### 4. Frontend Setup

```bash
# From root directory
npm install
```

Create `.env` file in root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

## Usage

### Starting the Application

1. Start MongoDB
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `npm run dev`
4. Access at `http://localhost:5173`

### First Time Setup

1. **Deploy Smart Contract** (if not already deployed)
   - Deploy BlockCertify contract to Sepolia
   - Update CONTRACT_ADDRESS in backend .env

2. **Register as Institute**
   - Connect wallet
   - Select "Institute" role
   - Complete registration

3. **Register as Student**
   - Connect wallet
   - Select "Student" role
   - Complete registration with institute details

4. **Issue Certificates**
   - Institute approves student requests
   - Issues certificates on blockchain
   - Certificates stored on IPFS

5. **Verify Certificates**
   - Anyone can verify using certificate ID
   - Blockchain verification ensures authenticity

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/connect-wallet` - Connect wallet
- `GET /api/auth/institutes` - Get all institutes

### Student
- `GET /api/student/dashboard` - Get dashboard stats
- `POST /api/student/request-certificate` - Request certificate
- `GET /api/student/certificates` - Get issued certificates
- `GET /api/student/request-history` - Get request history
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile

### Institute
- `GET /api/institute/dashboard` - Get dashboard stats
- `GET /api/institute/pending-requests` - Get pending requests
- `POST /api/institute/approve-request` - Approve request
- `POST /api/institute/reject-request` - Reject request
- `POST /api/institute/issue-certificate` - Issue certificate
- `GET /api/institute/issued-certificates` - Get issued certificates
- `POST /api/institute/revoke-certificate` - Revoke certificate
- `POST /api/institute/bulk-issue` - Bulk issue certificates

### Verification
- `GET /api/verify/certificate/:certificateId` - Verify certificate
- `GET /api/verify/transaction/:txHash` - Verify by transaction

## Smart Contract Functions

```solidity
// Issue certificate
function issueCertificate(
    string certificateId,
    string ipfsHash,
    address studentWallet
) public onlyRole(ISSUER_ROLE)

// Revoke certificate
function revokeCertificate(string certificateId) 
    public onlyRole(ISSUER_ROLE)

// Get certificate details
function getCertificate(string certificateId) 
    public view returns (
        string ipfsHash,
        address studentWallet,
        bool revoked,
        uint256 issuedAt
    )

// Add institute as issuer
function addIssuer(address issuer) 
    public onlyRole(DEFAULT_ADMIN_ROLE)
```

## Development

### Running Tests

Backend tests:
```bash
cd backend
npm test
```

Smart contract tests:
```bash
cd blockchain
npx hardhat test
```

Frontend tests:
```bash
npm test
```

### Building for Production

Frontend:
```bash
npm run build
```

Backend:
```bash
cd backend
npm start
```

## Configuration

### MongoDB Setup
- Local: `mongodb://localhost:27017/blockcertify`
- Atlas: Get connection string from MongoDB Atlas

### Infura Setup
1. Create account at infura.io
2. Create new project
3. Copy API key for Sepolia network

### Pinata Setup
1. Create account at pinata.cloud
2. Generate API keys
3. Copy JWT token

### MetaMask Setup
1. Install MetaMask extension
2. Create/import wallet
3. Get Sepolia testnet ETH from faucet
4. Export private key for deployment

## Security Considerations

- Never commit `.env` files
- Keep private keys secure
- Use environment variables for sensitive data
- Implement rate limiting in production
- Enable CORS properly
- Validate all inputs
- Use HTTPS in production

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env configuration
- Check port 5000 is available

### Smart contract deployment fails
- Ensure wallet has Sepolia ETH
- Verify Infura API key
- Check network configuration

### Frontend can't connect to backend
- Verify backend is running
- Check VITE_API_URL in .env
- Check CORS configuration

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create GitHub issue
- Contact: support@blockcertify.com

## Roadmap

- [ ] Multi-chain support
- [ ] Mobile app
- [ ] QR code generation
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Template customization
- [ ] Batch verification
- [ ] API rate limiting
- [ ] Admin dashboard
- [ ] Audit logs

## Acknowledgments

- OpenZeppelin for smart contract libraries
- shadcn/ui for UI components
- Pinata for IPFS hosting
- Infura for Ethereum RPC
