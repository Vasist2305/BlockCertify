# 🚀 Get Started with BlockCertify

Welcome to BlockCertify! This guide will get you up and running in minutes.

## What is BlockCertify?

BlockCertify is a blockchain-based certificate verification system that allows:
- **Institutions** to issue tamper-proof certificates on the blockchain
- **Students** to request and manage their certificates
- **Verifiers** to instantly verify certificate authenticity

## Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Setup Environment

**Backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` - minimum required:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blockcertify
JWT_SECRET=my_secret_key_12345
FRONTEND_URL=http://localhost:5173
```

**Frontend:**
```bash
cd ..
cp .env.example .env
```

Content of `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Open Browser

Go to: `http://localhost:5173`

**That's it!** 🎉 You're running BlockCertify in development mode.

---

## First Steps

### Create Institute Account

1. Click "Get Started"
2. Select "Institute"
3. Fill in:
   - Name: MIT University
   - Email: admin@mit.edu
   - Wallet: 0x1234567890abcdef (any address for dev)
4. Register

### Create Student Account

1. Logout or open incognito window
2. Select "Student"
3. Fill in:
   - Name: John Doe
   - Email: john@student.edu
   - Roll Number: CS2021001
   - Wallet: 0x9876543210fedcba (different address)
4. Register

### Issue Your First Certificate

1. Login as student → Request Certificate
2. Login as institute → Approve Request
3. Institute → Issue Certificate
4. Fill details and submit
5. View in "Issued Certificates"

### Verify Certificate

1. Go to "Verify Certificate"
2. Enter certificate ID
3. See verification results

---

## Development Mode

The app runs in **mock mode** by default:
- ✅ No blockchain setup needed
- ✅ No testnet ETH required
- ✅ No Infura account needed
- ✅ Perfect for development

Mock features:
- Generates fake transaction hashes
- Simulates blockchain operations
- All features work normally

---

## Project Structure

```
blockcertify/
├── backend/              # Node.js API
│   ├── controllers/     # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   └── services/        # Blockchain & IPFS
├── src/                 # React frontend
│   ├── pages/          # Application pages
│   ├── components/     # UI components
│   └── lib/            # Utilities
└── blockchain/         # Smart contracts
```

---

## Key Features

### For Students
- 📝 Request certificates
- 📜 View issued certificates
- 📊 Track request status
- 🔍 Verify certificates
- 👤 Manage profile

### For Institutions
- ✅ Approve/reject requests
- 🎓 Issue certificates
- 📦 Bulk issuance
- 🔄 Revoke certificates
- 📈 View analytics

### For Everyone
- 🔐 Blockchain verification
- 🌐 IPFS storage
- 🔒 Secure authentication
- 📱 Responsive design

---

## Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run tests
```

### Backend
```bash
npm run dev         # Start with nodemon
npm start          # Start production server
```

---

## Documentation

- 📖 [README.md](README.md) - Full documentation
- ⚡ [QUICKSTART.md](QUICKSTART.md) - Detailed setup guide
- ✅ [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Setup verification
- 🔌 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment

---

## Common Issues

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# If not, start it
mongod
```

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

### For Development
1. ✅ Explore the UI
2. ✅ Test all features
3. ✅ Customize styling
4. ✅ Add new features

### For Production
1. 📝 Get Infura API key
2. 📝 Get Pinata account
3. 📝 Deploy smart contract
4. 📝 Configure production environment
5. 📝 Deploy to hosting

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

---

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Query
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Ethers.js

**Blockchain:**
- Solidity
- Hardhat
- Ethereum (Sepolia)
- IPFS (Pinata)

---

## Features Roadmap

### Current (v1.0)
- ✅ User authentication
- ✅ Certificate requests
- ✅ Certificate issuance
- ✅ Blockchain verification
- ✅ IPFS storage

### Coming Soon (v1.1)
- 🔜 QR code generation
- 🔜 Email notifications
- 🔜 Certificate templates
- 🔜 Advanced analytics
- 🔜 Batch operations

### Future (v2.0)
- 🔮 Multi-chain support
- 🔮 Mobile app
- 🔮 API rate limiting
- 🔮 Admin dashboard
- 🔮 Audit logs

---

## Getting Help

### Documentation
- Check README.md for detailed info
- Review API_DOCUMENTATION.md for API details
- See QUICKSTART.md for setup help

### Troubleshooting
1. Check console logs
2. Verify environment variables
3. Test database connection
4. Review error messages

### Community
- GitHub Issues
- Stack Overflow
- Discord (coming soon)

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## Best Practices

### Development
- ✅ Use meaningful commit messages
- ✅ Test before committing
- ✅ Follow code style
- ✅ Document new features

### Security
- ✅ Never commit .env files
- ✅ Keep dependencies updated
- ✅ Use strong JWT secrets
- ✅ Validate all inputs

### Performance
- ✅ Optimize database queries
- ✅ Use pagination
- ✅ Cache when possible
- ✅ Monitor performance

---

## Quick Commands Reference

```bash
# Start everything
npm run dev                    # Frontend
cd backend && npm run dev      # Backend

# Database
mongosh                        # Connect to MongoDB
use blockcertify              # Switch to database
db.users.find()               # View users

# Git
git status                     # Check status
git add .                      # Stage changes
git commit -m "message"        # Commit
git push                       # Push to remote

# Blockchain (production)
cd blockchain
npx hardhat compile           # Compile contracts
npx hardhat run scripts/deploy.js --network sepolia  # Deploy
```

---

## Environment Variables Quick Reference

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blockcertify
JWT_SECRET=your_secret_key
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/KEY
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=0x...
PINATA_JWT=your_jwt
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Testing Checklist

- [ ] User registration works
- [ ] Login works
- [ ] Certificate request works
- [ ] Certificate approval works
- [ ] Certificate issuance works
- [ ] Certificate verification works
- [ ] Dashboard shows correct data
- [ ] No console errors

---

## Success Criteria

You're ready when:
- ✅ Both servers running
- ✅ No errors in console
- ✅ Can register users
- ✅ Can issue certificates
- ✅ Can verify certificates
- ✅ Data persists in MongoDB

---

## Resources

### Learning
- [React Docs](https://react.dev)
- [Node.js Docs](https://nodejs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Solidity Docs](https://docs.soliditylang.org)

### Tools
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [MetaMask](https://metamask.io)

---

## License

MIT License - see LICENSE file

---

## Support

Need help?
- 📧 Email: support@blockcertify.com
- 💬 GitHub Issues
- 📚 Documentation

---

**Happy Building!** 🎉

Start with the basics, explore the features, and build something amazing with BlockCertify!
