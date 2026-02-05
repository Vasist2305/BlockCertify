import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/common/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, XCircle, ArrowRight, Shield, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { studentAPI } from '@/lib/api';

const StudentDashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const response = await studentAPI.getDashboard();
      return response.data;
    },
  });

  // Fetch recent certificates
  const { data: certificates, isLoading: certsLoading } = useQuery({
    queryKey: ['student-certificates'],
    queryFn: async () => {
      const response = await studentAPI.getMyCertificates();
      return response.data;
    },
  });

  const recentCertificates = certificates?.slice(0, 3) || [];
  const studentStats = stats || { totalRequests: 0, issued: 0, pending: 0, rejected: 0 };

  return (
    <DashboardLayout role="student" userName={user?.name || "Student"}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-muted-foreground">Here's an overview of your certificate status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <div className="col-span-4 flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <StatsCard
                title="Total Requests"
                value={studentStats.totalRequests}
                icon={FileText}
                accentColor="primary"
                description="All time requests"
              />
              <StatsCard
                title="Certificates Issued"
                value={studentStats.issued}
                icon={CheckCircle2}
                accentColor="success"
                description="Successfully issued"
              />
              <StatsCard
                title="Pending Requests"
                value={studentStats.pending}
                icon={Clock}
                accentColor="gold"
                description="Awaiting approval"
              />
              <StatsCard
                title="Rejected"
                value={studentStats.rejected}
                icon={XCircle}
                accentColor="destructive"
                description="Not approved"
              />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Certificates */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Certificates</CardTitle>
                <CardDescription>Your latest certificate activity</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/student/certificates">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {certsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : recentCertificates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No certificates yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/student/request">Request your first certificate</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentCertificates.map((cert: any) => (
                    <div 
                      key={cert._id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{cert.certificateType}</p>
                          <p className="text-sm text-muted-foreground">{cert.certificateId}</p>
                        </div>
                      </div>
                      <Badge variant={cert.status === 'ISSUED' ? 'default' : 'secondary'}>
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCertificates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No recent activity</p>
                  </div>
                ) : (
                  recentCertificates.map((cert: any) => (
                    <div 
                      key={cert._id}
                      className="p-4 rounded-lg border-l-4 border-l-primary bg-primary/5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">Certificate {cert.status === 'ISSUED' ? 'Issued' : 'Pending'}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {cert.certificateType} - {new Date(cert.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="gold">
                <Link to="/student/request">
                  <FileText className="h-4 w-4" />
                  Request New Certificate
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/student/certificates">
                  View My Certificates
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/student/profile">
                  Update Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
