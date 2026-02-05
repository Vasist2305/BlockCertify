# BlockCertify Testing Guide

This guide will help you test the dynamic features connected to MongoDB.

## Prerequisites

1. **MongoDB Running**
   ```bash
   mongod
   ```

2. **Backend Running**
   ```bash
   cd backend
   npm run dev
   ```

3. **Frontend Running**
   ```bash
   npm run dev
   ```

## Test Scenario 1: Register and Login

### Step 1: Register as Institute

1. Open `http://localhost:5173`
2. Click "Get Started"
3. Select "Institute" role
4. Fill in the registration form:
   ```
   Name: MIT University
   Email: admin@mit.edu
   Wallet Address: 0x1234567890abcdef1234567890abcdef12345678
   ```
5. Click "Create Account"
6. You should be redirected to the institute dashboard

### Step 2: Register as Student

1. Open a new incognito window or logout
2. Go to `http://localhost:5173`
3. Select "Student" role
4. Fill in the registration form:
   ```
   Name: John Doe
   Email: john@student.edu
   Roll Number: CS2021001
   Course: B.Tech Computer Science
   Department: Computer Science
   Wallet Address: 0xabcdef1234567890abcdef1234567890abcdef12
   ```
5. Click "Create Account"
6. You should be redirected to the student dashboard

### Step 3: Test Login

1. Logout
2. Go to Login page
3. Enter email: `john@student.edu`
4. Click "Sign In"
5. You should be logged in and see your dashboard

## Test Scenario 2: Certificate Request Flow

### Step 1: Student Requests Certificate

1. Login as student (`john@student.edu`)
2. Go to "Request Certificate"
3. Fill in the form:
   - Institute: Select "MIT University"
   - Certificate Type: "Degree Certificate"
   - Course: "B.Tech Computer Science"
   - Department: "Computer Science"
   - Year: "2024"
4. Click "Submit Request"
5. You should see a success message
6. Go to "Request History" - you should see your request with status "PENDING"

### Step 2: Institute Approves Request

1. Logout and login as institute (`admin@mit.edu`)
2. Go to "Pending Requests"
3. You should see John Doe's request
4. Click "Approve" button
5. Request status should change to "APPROVED"

### Step 3: Institute Issues Certificate

1. Still logged in as institute
2. Go to "Issue Certificate"
3. Fill in the form:
   - Student: Search for John Doe or use student ID
   - Certificate Type: "Degree Certificate"
   - Course: "B.Tech Computer Science"
   - Department: "Computer Science"
   - Year: "2024"
   - Roll Number: "CS2021001"
   - Student Name: "John Doe"
   - Grade: "A+"
   - CGPA: "9.5"
   - Issue Date: Select today's date
4. Click "Issue Certificate"
5. You should see success message with transaction hash
6. Go to "Issued Certificates" - you should see the new certificate

### Step 4: Student Views Certificate

1. Logout and login as student (`john@student.edu`)
2. Go to "My Certificates"
3. You should see your issued certificate
4. Certificate should show:
   - Certificate ID
   - Certificate Type
   - Status: "ISSUED"
   - Transaction Hash
   - Issue Date

## Test Scenario 3: Dashboard Statistics

### Student Dashboard

1. Login as student
2. Dashboard should show:
   - Total Requests: 1
   - Certificates Issued: 1
   - Pending Requests: 0
   - Rejected: 0
3. Recent Certificates section should show your certificate
4. Recent Activity should show certificate issuance

### Institute Dashboard

1. Login as institute
2. Dashboard should show:
   - Total Issued: 1
   - Pending Requests: 0
   - Revoked: 0
   - This Month: 1
3. Pending Requests section should be empty (or show new requests)
4. Chart should show monthly issuance data

## Test Scenario 4: Certificate Verification

1. Copy a certificate ID from "My Certificates"
2. Go to "Verify Certificate" page (public, no login needed)
3. Enter the certificate ID
4. Click "Verify"
5. You should see:
   - Certificate is valid
   - Student details
   - Institute details
   - Issue date
   - Transaction hash
   - Blockchain status

## Verify Data in MongoDB

You can verify the data is actually stored in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Switch to blockcertify database
use blockcertify

# View all users
db.users.find().pretty()

# View all certificate requests
db.certificaterequests.find().pretty()

# View all certificates
db.certificates.find().pretty()

# Count documents
db.users.countDocuments()
db.certificates.countDocuments()
```

## Expected Database Structure

### Users Collection
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@student.edu",
  walletAddress: "0xabc...",
  role: "STUDENT",
  rollNumber: "CS2021001",
  course: "B.Tech Computer Science",
  department: "Computer Science",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### Certificate Requests Collection
```javascript
{
  _id: ObjectId("..."),
  studentId: ObjectId("..."),
  instituteId: ObjectId("..."),
  certificateType: "Degree Certificate",
  course: "B.Tech Computer Science",
  department: "Computer Science",
  year: "2024",
  status: "APPROVED",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

### Certificates Collection
```javascript
{
  _id: ObjectId("..."),
  certificateId: "CERT-1234567890-abc123",
  studentId: ObjectId("..."),
  instituteId: ObjectId("..."),
  certificateType: "Degree Certificate",
  course: "B.Tech Computer Science",
  department: "Computer Science",
  year: "2024",
  rollNumber: "CS2021001",
  studentName: "John Doe",
  ipfsHash: "QmXyz...",
  transactionHash: "0x123abc...",
  blockchainStatus: "CONFIRMED",
  status: "ISSUED",
  metadata: {
    grade: "A+",
    cgpa: "9.5",
    issueDate: ISODate("...")
  },
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
```

## Testing API Endpoints Directly

You can also test the API endpoints using curl or Postman:

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "walletAddress": "0x1234567890abcdef",
    "role": "STUDENT",
    "rollNumber": "CS2021002",
    "course": "B.Tech CS",
    "department": "CS"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Get Dashboard (with token)
```bash
curl -X GET http://localhost:5000/api/student/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Issue: "No data showing"
- Check backend is running
- Check MongoDB is running
- Check browser console for errors
- Verify API URL in `.env` file

### Issue: "401 Unauthorized"
- Login again to get fresh token
- Check token is saved in localStorage
- Verify JWT_SECRET in backend/.env

### Issue: "Cannot connect to database"
- Start MongoDB: `mongod`
- Check connection string in backend/.env
- Test connection: `mongosh`

### Issue: "CORS error"
- Check FRONTEND_URL in backend/.env
- Restart backend server
- Clear browser cache

## Success Criteria

✅ Can register users (student and institute)
✅ Can login with email
✅ Dashboard shows real statistics from database
✅ Can request certificates
✅ Can approve/reject requests
✅ Can issue certificates
✅ Certificates are stored in MongoDB
✅ Can view issued certificates
✅ Can verify certificates
✅ Data persists after server restart

## Next Steps

After successful testing:

1. **Add More Features**
   - Bulk certificate issuance
   - Certificate revocation
   - Email notifications
   - QR code generation

2. **Enable Real Blockchain**
   - Deploy smart contract
   - Configure Infura
   - Setup Pinata for IPFS
   - Test real blockchain transactions

3. **Deploy to Production**
   - Setup MongoDB Atlas
   - Deploy backend to Heroku/AWS
   - Deploy frontend to Vercel/Netlify
   - Configure domain and SSL

---

**Happy Testing!** 🚀

If you encounter any issues, refer to TROUBLESHOOTING.md
