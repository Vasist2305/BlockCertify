import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/student/Dashboard";
import RequestCertificate from "./pages/student/RequestCertificate";
import MyCertificates from "./pages/student/MyCertificates";
import RequestHistory from "./pages/student/RequestHistory";
import StudentNotifications from "./pages/student/Notifications";
import ActivityLog from "./pages/student/ActivityLog";
import StudentProfile from "./pages/student/Profile";
import InstituteDashboard from "./pages/institute/Dashboard";
import PendingRequests from "./pages/institute/PendingRequests";
import IssueCertificate from "./pages/institute/IssueCertificate";
import IssuedCertificates from "./pages/institute/IssuedCertificates";
import StudentManagement from "./pages/institute/StudentManagement";
import BulkIssue from "./pages/institute/BulkIssue";
import Templates from "./pages/institute/Templates";
import Analytics from "./pages/institute/Analytics";
import InstituteProfile from "./pages/institute/Profile";
import VerifyCertificate from "./pages/verifier/Verify";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Auth Routes */}
          <Route path="/auth/:role/login" element={<Login />} />
          <Route path="/auth/:role/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/request" element={<RequestCertificate />} />
          <Route path="/student/certificates" element={<MyCertificates />} />
          <Route path="/student/history" element={<RequestHistory />} />
          <Route path="/student/notifications" element={<StudentNotifications />} />
          <Route path="/student/activity" element={<ActivityLog />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Institute Routes */}
          <Route path="/institute/dashboard" element={<InstituteDashboard />} />
          <Route path="/institute/pending" element={<PendingRequests />} />
          <Route path="/institute/issue" element={<IssueCertificate />} />
          <Route path="/institute/issued" element={<IssuedCertificates />} />
          <Route path="/institute/students" element={<StudentManagement />} />
          <Route path="/institute/bulk" element={<BulkIssue />} />
          <Route path="/institute/templates" element={<Templates />} />
          <Route path="/institute/analytics" element={<Analytics />} />
          <Route path="/institute/profile" element={<InstituteProfile />} />
          
          {/* Verifier Routes */}
          <Route path="/verifier/verify" element={<VerifyCertificate />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
