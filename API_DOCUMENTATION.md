# BlockCertify API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message"
}
```

---

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

Register a new user (student or institute).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "walletAddress": "0x1234567890abcdef",
  "role": "STUDENT",
  "rollNumber": "CS2021001",
  "course": "B.Tech Computer Science",
  "department": "Computer Science",
  "instituteId": "institute_id_here"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "walletAddress": "0x1234567890abcdef",
    "role": "STUDENT"
  }
}
```

### 2. Login

**POST** `/auth/login`

Login with email or wallet address.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```
OR
```json
{
  "walletAddress": "0x1234567890abcdef"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

### 3. Connect Wallet

**POST** `/auth/connect-wallet`

Quick authentication with wallet address.

**Request Body:**
```json
{
  "walletAddress": "0x1234567890abcdef",
  "role": "STUDENT",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

### 4. Get Institutes

**GET** `/auth/institutes`

Get list of all registered institutes.

**Response:**
```json
[
  {
    "_id": "institute_id",
    "name": "MIT University",
    "email": "admin@mit.edu",
    "instituteId": "MIT001"
  }
]
```

---

## Student Endpoints

All student endpoints require authentication with role "STUDENT".

### 1. Get Dashboard Stats

**GET** `/student/dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalRequests": 12,
  "issued": 8,
  "pending": 3,
  "rejected": 1
}
```

### 2. Request Certificate

**POST** `/student/request-certificate`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "instituteId": "institute_id_here",
  "certificateType": "Degree Certificate",
  "course": "B.Tech Computer Science",
  "department": "Computer Science",
  "year": "2024"
}
```

**Response:**
```json
{
  "message": "Certificate request submitted successfully",
  "request": {
    "_id": "request_id",
    "studentId": "student_id",
    "instituteId": "institute_id",
    "certificateType": "Degree Certificate",
    "status": "PENDING",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Get My Certificates

**GET** `/student/certificates`

Get all issued certificates for the student.

**Response:**
```json
[
  {
    "_id": "cert_id",
    "certificateId": "CERT-2024-001",
    "certificateType": "Degree Certificate",
    "course": "B.Tech Computer Science",
    "status": "ISSUED",
    "transactionHash": "0xabc123...",
    "ipfsHash": "QmXyz...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "instituteId": {
      "name": "MIT University",
      "email": "admin@mit.edu"
    }
  }
]
```

### 4. Get Request History

**GET** `/student/request-history`

Get all certificate requests made by the student.

**Response:**
```json
[
  {
    "_id": "request_id",
    "certificateType": "Degree Certificate",
    "status": "ISSUED",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "instituteId": {
      "name": "MIT University"
    }
  }
]
```

### 5. Get Profile

**GET** `/student/profile`

Get student profile information.

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "walletAddress": "0x1234...",
  "role": "STUDENT",
  "rollNumber": "CS2021001",
  "course": "B.Tech Computer Science",
  "department": "Computer Science"
}
```

### 6. Update Profile

**PUT** `/student/profile`

Update student profile.

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "newemail@example.com",
  "rollNumber": "CS2021001",
  "course": "B.Tech Computer Science",
  "department": "Computer Science",
  "walletAddress": "0x1234..."
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## Institute Endpoints

All institute endpoints require authentication with role "INSTITUTE".

### 1. Get Dashboard Stats

**GET** `/institute/dashboard`

**Response:**
```json
{
  "totalIssued": 1250,
  "pending": 45,
  "revoked": 12,
  "thisMonth": 85
}
```

### 2. Get Pending Requests

**GET** `/institute/pending-requests`

Get all pending certificate requests.

**Response:**
```json
[
  {
    "_id": "request_id",
    "certificateType": "Degree Certificate",
    "course": "B.Tech Computer Science",
    "status": "PENDING",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "studentId": {
      "name": "John Doe",
      "rollNumber": "CS2021001",
      "email": "john@example.com",
      "walletAddress": "0x1234..."
    }
  }
]
```

### 3. Approve Request

**POST** `/institute/approve-request`

Approve a certificate request.

**Request Body:**
```json
{
  "requestId": "request_id_here"
}
```

**Response:**
```json
{
  "message": "Request approved",
  "request": { ... }
}
```

### 4. Reject Request

**POST** `/institute/reject-request`

Reject a certificate request.

**Request Body:**
```json
{
  "requestId": "request_id_here",
  "reason": "Incomplete documentation"
}
```

**Response:**
```json
{
  "message": "Request rejected",
  "request": { ... }
}
```

### 5. Issue Certificate

**POST** `/institute/issue-certificate`

Issue a new certificate on blockchain.

**Request Body:**
```json
{
  "studentId": "student_id",
  "certificateType": "Degree Certificate",
  "course": "B.Tech Computer Science",
  "department": "Computer Science",
  "year": "2024",
  "rollNumber": "CS2021001",
  "studentName": "John Doe",
  "grade": "A+",
  "cgpa": "9.5",
  "issueDate": "2024-01-01",
  "requestId": "request_id_if_exists"
}
```

**Response:**
```json
{
  "message": "Certificate issued successfully",
  "certificate": {
    "certificateId": "CERT-2024-001",
    "transactionHash": "0xabc123...",
    "ipfsHash": "QmXyz...",
    "blockchainStatus": "CONFIRMED",
    "status": "ISSUED"
  },
  "transactionHash": "0xabc123..."
}
```

### 6. Get Issued Certificates

**GET** `/institute/issued-certificates`

Get all certificates issued by the institute.

**Response:**
```json
[
  {
    "certificateId": "CERT-2024-001",
    "certificateType": "Degree Certificate",
    "studentName": "John Doe",
    "rollNumber": "CS2021001",
    "status": "ISSUED",
    "transactionHash": "0xabc123...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "studentId": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

### 7. Revoke Certificate

**POST** `/institute/revoke-certificate`

Revoke an issued certificate.

**Request Body:**
```json
{
  "certificateId": "CERT-2024-001",
  "reason": "Fraudulent submission"
}
```

**Response:**
```json
{
  "message": "Certificate revoked successfully",
  "transactionHash": "0xdef456..."
}
```

### 8. Bulk Issue Certificates

**POST** `/institute/bulk-issue`

Issue multiple certificates at once.

**Request Body:**
```json
{
  "certificates": [
    {
      "rollNumber": "CS2021001",
      "certificateType": "Degree Certificate",
      "course": "B.Tech Computer Science",
      "department": "Computer Science",
      "year": "2024",
      "grade": "A+",
      "cgpa": "9.5"
    },
    {
      "rollNumber": "CS2021002",
      "certificateType": "Degree Certificate",
      "course": "B.Tech Computer Science",
      "department": "Computer Science",
      "year": "2024",
      "grade": "A",
      "cgpa": "9.0"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Bulk issuance completed",
  "successful": 2,
  "failed": 0,
  "results": [ ... ],
  "errors": []
}
```

---

## Verification Endpoints

Public endpoints - no authentication required.

### 1. Verify Certificate by ID

**GET** `/verify/certificate/:certificateId`

Verify a certificate using its ID.

**Example:** `/verify/certificate/CERT-2024-001`

**Response:**
```json
{
  "isValid": true,
  "certificate": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    "rollNumber": "CS2021001",
    "certificateType": "Degree Certificate",
    "course": "B.Tech Computer Science",
    "department": "Computer Science",
    "year": "2024",
    "issueDate": "2024-01-01T00:00:00.000Z",
    "status": "ISSUED",
    "transactionHash": "0xabc123...",
    "instituteName": "MIT University",
    "instituteEmail": "admin@mit.edu",
    "ipfsHash": "QmXyz..."
  },
  "blockchainData": {
    "ipfsHash": "QmXyz...",
    "studentWallet": "0x1234...",
    "revoked": false,
    "issuedAt": 1704067200
  },
  "ipfsData": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    ...
  },
  "verificationTimestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Verify by Transaction Hash

**GET** `/verify/transaction/:txHash`

Verify a certificate using blockchain transaction hash.

**Example:** `/verify/transaction/0xabc123...`

**Response:**
```json
{
  "isValid": true,
  "certificate": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    "status": "ISSUED",
    "transactionHash": "0xabc123...",
    "instituteName": "MIT University"
  }
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

---

## Pagination

For endpoints returning lists, pagination can be added:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)

Example: `/student/certificates?page=2&limit=20&sort=createdAt&order=desc`

---

## Filtering

Add filtering support with query parameters:

**Example:**
```
/institute/issued-certificates?status=ISSUED&certificateType=Degree
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "walletAddress": "0x1234567890abcdef",
    "role": "STUDENT"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'
```

### Get Dashboard (with auth)
```bash
curl -X GET http://localhost:5000/api/student/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing with Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Create environment variable for token
4. Use `{{token}}` in Authorization header

---

## WebSocket Support (Future)

Real-time updates for:
- Certificate issuance notifications
- Request status changes
- Verification events

---

## Webhooks (Future)

Configure webhooks for:
- Certificate issued
- Certificate revoked
- Request approved/rejected

---

## API Versioning

Current version: v1 (implicit)

Future versions will use: `/api/v2/...`

---

## Support

For API issues:
- Check response error messages
- Review request format
- Verify authentication token
- Check server logs

---

**Last Updated:** February 2026
