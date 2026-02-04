// Dummy data for the Certificate Verification System

export interface Certificate {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  department: string;
  year: string;
  certificateType: string;
  status: 'pending' | 'approved' | 'issued' | 'revoked' | 'rejected';
  issueDate?: string;
  expiryDate?: string;
  transactionHash?: string;
  instituteName?: string;
  instituteId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  department: string;
  year: string;
  walletAddress?: string;
  verified: boolean;
  joinDate: string;
}

export interface Institute {
  id: string;
  name: string;
  email: string;
  type: string;
  address: string;
  establishedYear: string;
  accreditationId: string;
  verified: boolean;
  logoUrl?: string;
}

export interface CertificateRequest {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  course: string;
  department: string;
  certificateType: string;
  status: 'pending' | 'approved' | 'rejected' | 'issued';
  requestDate: string;
  approvedDate?: string;
  issuedDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'request' | 'certificate' | 'profile' | 'verification';
}

// Student Dashboard Data
export const studentStats = {
  totalRequests: 12,
  issued: 8,
  pending: 3,
  rejected: 1,
};

export const myCertificates: Certificate[] = [
  {
    id: 'CERT-2024-001',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Degree Certificate',
    status: 'issued',
    issueDate: '2024-06-15',
    transactionHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    instituteName: 'MIT University',
  },
  {
    id: 'CERT-2024-002',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Transcript',
    status: 'issued',
    issueDate: '2024-06-10',
    transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    instituteName: 'MIT University',
  },
  {
    id: 'CERT-2024-003',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Course Completion',
    status: 'pending',
    instituteName: 'MIT University',
  },
  {
    id: 'CERT-2024-004',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Merit Certificate',
    status: 'approved',
    instituteName: 'MIT University',
  },
];

export const certificateRequests: CertificateRequest[] = [
  {
    id: 'REQ-001',
    studentId: 'STU-001',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    certificateType: 'Degree Certificate',
    status: 'issued',
    requestDate: '2024-06-01',
    approvedDate: '2024-06-10',
    issuedDate: '2024-06-15',
  },
  {
    id: 'REQ-002',
    studentId: 'STU-001',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    certificateType: 'Transcript',
    status: 'issued',
    requestDate: '2024-06-05',
    approvedDate: '2024-06-08',
    issuedDate: '2024-06-10',
  },
  {
    id: 'REQ-003',
    studentId: 'STU-001',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    certificateType: 'Course Completion',
    status: 'pending',
    requestDate: '2024-06-20',
  },
];

export const notifications: Notification[] = [
  {
    id: 'NOT-001',
    title: 'Certificate Issued',
    message: 'Your Degree Certificate has been issued and stored on blockchain.',
    type: 'success',
    timestamp: '2024-06-15T10:30:00',
    read: false,
  },
  {
    id: 'NOT-002',
    title: 'Request Approved',
    message: 'Your transcript request has been approved by the institute.',
    type: 'info',
    timestamp: '2024-06-08T14:20:00',
    read: true,
  },
  {
    id: 'NOT-003',
    title: 'Verification Alert',
    message: 'Your Degree Certificate was verified by Tech Corp.',
    type: 'info',
    timestamp: '2024-06-18T09:15:00',
    read: false,
  },
];

export const activityLogs: ActivityLog[] = [
  {
    id: 'LOG-001',
    action: 'Certificate Verified',
    description: 'Your Degree Certificate was verified by Tech Corp HR',
    timestamp: '2024-06-18T09:15:00',
    type: 'verification',
  },
  {
    id: 'LOG-002',
    action: 'Certificate Issued',
    description: 'Degree Certificate issued and stored on blockchain',
    timestamp: '2024-06-15T10:30:00',
    type: 'certificate',
  },
  {
    id: 'LOG-003',
    action: 'Request Submitted',
    description: 'Certificate request submitted for Course Completion',
    timestamp: '2024-06-20T11:00:00',
    type: 'request',
  },
  {
    id: 'LOG-004',
    action: 'Profile Updated',
    description: 'Wallet address updated in profile',
    timestamp: '2024-06-12T16:45:00',
    type: 'profile',
  },
];

// Institute Dashboard Data
export const instituteStats = {
  totalIssued: 1250,
  pending: 45,
  revoked: 12,
  thisMonth: 85,
};

export const pendingRequests: CertificateRequest[] = [
  {
    id: 'REQ-101',
    studentId: 'STU-101',
    studentName: 'Alice Johnson',
    rollNumber: 'EE2021015',
    course: 'B.Tech Electrical Engineering',
    department: 'Electrical Engineering',
    certificateType: 'Degree Certificate',
    status: 'pending',
    requestDate: '2024-06-22',
  },
  {
    id: 'REQ-102',
    studentId: 'STU-102',
    studentName: 'Bob Smith',
    rollNumber: 'ME2021008',
    course: 'B.Tech Mechanical Engineering',
    department: 'Mechanical Engineering',
    certificateType: 'Transcript',
    status: 'pending',
    requestDate: '2024-06-21',
  },
  {
    id: 'REQ-103',
    studentId: 'STU-103',
    studentName: 'Carol Davis',
    rollNumber: 'CS2021025',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    certificateType: 'Merit Certificate',
    status: 'pending',
    requestDate: '2024-06-20',
  },
];

export const issuedCertificates: Certificate[] = [
  {
    id: 'CERT-I-001',
    studentName: 'David Wilson',
    rollNumber: 'CS2020001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Degree Certificate',
    status: 'issued',
    issueDate: '2024-06-15',
    transactionHash: '0xabc123def456...',
  },
  {
    id: 'CERT-I-002',
    studentName: 'Emma Brown',
    rollNumber: 'EE2020012',
    course: 'B.Tech Electrical Engineering',
    department: 'Electrical Engineering',
    year: '2024',
    certificateType: 'Degree Certificate',
    status: 'issued',
    issueDate: '2024-06-14',
    transactionHash: '0xdef456abc789...',
  },
  {
    id: 'CERT-I-003',
    studentName: 'Frank Miller',
    rollNumber: 'ME2020005',
    course: 'B.Tech Mechanical Engineering',
    department: 'Mechanical Engineering',
    year: '2024',
    certificateType: 'Transcript',
    status: 'revoked',
    issueDate: '2024-06-10',
    transactionHash: '0x789abc123def...',
  },
];

export const instituteStudents: Student[] = [
  {
    id: 'STU-101',
    name: 'Alice Johnson',
    email: 'alice@university.edu',
    rollNumber: 'EE2021015',
    course: 'B.Tech Electrical Engineering',
    department: 'Electrical Engineering',
    year: '2024',
    verified: true,
    joinDate: '2021-08-01',
  },
  {
    id: 'STU-102',
    name: 'Bob Smith',
    email: 'bob@university.edu',
    rollNumber: 'ME2021008',
    course: 'B.Tech Mechanical Engineering',
    department: 'Mechanical Engineering',
    year: '2024',
    verified: true,
    joinDate: '2021-08-01',
  },
  {
    id: 'STU-103',
    name: 'Carol Davis',
    email: 'carol@university.edu',
    rollNumber: 'CS2021025',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    verified: false,
    joinDate: '2021-08-01',
  },
];

// Chart data for Institute Analytics
export const monthlyIssuanceData = [
  { month: 'Jan', issued: 65, revoked: 2 },
  { month: 'Feb', issued: 78, revoked: 1 },
  { month: 'Mar', issued: 92, revoked: 3 },
  { month: 'Apr', issued: 85, revoked: 0 },
  { month: 'May', issued: 110, revoked: 2 },
  { month: 'Jun', issued: 85, revoked: 1 },
];

export const certificateTypeData = [
  { name: 'Degree Certificate', value: 450, color: 'hsl(var(--primary))' },
  { name: 'Transcript', value: 320, color: 'hsl(var(--teal))' },
  { name: 'Course Completion', value: 280, color: 'hsl(var(--gold))' },
  { name: 'Merit Certificate', value: 200, color: 'hsl(var(--success))' },
];

export const departmentData = [
  { department: 'Computer Science', certificates: 380 },
  { department: 'Electrical Engineering', certificates: 290 },
  { department: 'Mechanical Engineering', certificates: 245 },
  { department: 'Civil Engineering', certificates: 180 },
  { department: 'Electronics', certificates: 155 },
];

// Verification Results
export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  verificationTimestamp: string;
  blockchainConfirmations: number;
}

export const sampleVerificationResult: VerificationResult = {
  isValid: true,
  certificate: {
    id: 'CERT-2024-001',
    studentName: 'John Doe',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
    year: '2024',
    certificateType: 'Degree Certificate',
    status: 'issued',
    issueDate: '2024-06-15',
    transactionHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    instituteName: 'MIT University',
    instituteId: 'INS-001',
  },
  verificationTimestamp: '2024-06-25T14:30:00',
  blockchainConfirmations: 12,
};

// Audit Logs
export interface AuditLog {
  id: string;
  user: string;
  userRole: 'student' | 'institute' | 'verifier' | 'admin';
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed';
}

export const auditLogs: AuditLog[] = [
  {
    id: 'AUDIT-001',
    user: 'MIT University',
    userRole: 'institute',
    action: 'CERTIFICATE_ISSUED',
    resource: 'CERT-2024-001',
    timestamp: '2024-06-15T10:30:00',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: 'AUDIT-002',
    user: 'Tech Corp HR',
    userRole: 'verifier',
    action: 'CERTIFICATE_VERIFIED',
    resource: 'CERT-2024-001',
    timestamp: '2024-06-18T09:15:00',
    ipAddress: '10.0.0.50',
    status: 'success',
  },
  {
    id: 'AUDIT-003',
    user: 'John Doe',
    userRole: 'student',
    action: 'CERTIFICATE_REQUESTED',
    resource: 'REQ-003',
    timestamp: '2024-06-20T11:00:00',
    ipAddress: '172.16.0.25',
    status: 'success',
  },
];

// Blockchain Transactions
export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  action: 'ISSUE' | 'REVOKE' | 'VERIFY';
  certificateId: string;
  gasUsed: string;
  status: 'confirmed' | 'pending';
}

export const blockchainTransactions: BlockchainTransaction[] = [
  {
    hash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
    blockNumber: 18234567,
    timestamp: '2024-06-15T10:30:00',
    from: '0x1234...5678',
    to: '0xabcd...efgh',
    action: 'ISSUE',
    certificateId: 'CERT-2024-001',
    gasUsed: '0.00234 ETH',
    status: 'confirmed',
  },
  {
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockNumber: 18234560,
    timestamp: '2024-06-10T14:20:00',
    from: '0x1234...5678',
    to: '0xabcd...efgh',
    action: 'ISSUE',
    certificateId: 'CERT-2024-002',
    gasUsed: '0.00198 ETH',
    status: 'confirmed',
  },
];
