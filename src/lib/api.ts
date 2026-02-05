import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  connectWallet: (walletAddress: string, role: string) =>
    api.post('/auth/connect-wallet', { walletAddress, role }),
  
  register: (data: any) =>
    api.post('/auth/register', data),
  
  login: (data: { email?: string; walletAddress?: string }) =>
    api.post('/auth/login', data),
  
  getInstitutes: () =>
    api.get('/auth/institutes'),
};

// Student API
export const studentAPI = {
  getDashboard: () =>
    api.get('/student/dashboard'),
  
  requestCertificate: (data: any) =>
    api.post('/student/request-certificate', data),
  
  getMyCertificates: () =>
    api.get('/student/certificates'),
  
  getRequestHistory: () =>
    api.get('/student/request-history'),
  
  getProfile: () =>
    api.get('/student/profile'),
  
  updateProfile: (data: any) =>
    api.put('/student/profile', data),
};

// Institute API
export const instituteAPI = {
  getDashboard: () =>
    api.get('/institute/dashboard'),
  
  getPendingRequests: () =>
    api.get('/institute/pending-requests'),
  
  approveRequest: (requestId: string) =>
    api.post('/institute/approve-request', { requestId }),
  
  rejectRequest: (requestId: string, reason?: string) =>
    api.post('/institute/reject-request', { requestId, reason }),
  
  issueCertificate: (data: any) =>
    api.post('/institute/issue-certificate', data),
  
  getIssuedCertificates: () =>
    api.get('/institute/issued-certificates'),
  
  revokeCertificate: (certificateId: string, reason?: string) =>
    api.post('/institute/revoke-certificate', { certificateId, reason }),
  
  bulkIssueCertificates: (certificates: any[]) =>
    api.post('/institute/bulk-issue', { certificates }),
};

// Verify API
export const verifyAPI = {
  verifyCertificate: (certificateId: string) =>
    api.get(`/verify/certificate/${certificateId}`),
  
  verifyByTransaction: (txHash: string) =>
    api.get(`/verify/transaction/${txHash}`),
};

export default api;
