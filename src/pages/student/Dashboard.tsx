import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/common/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, XCircle, ArrowRight, Shield } from 'lucide-react';
import { studentStats, myCertificates, notifications } from '@/lib/dummy-data';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const recentCertificates = myCertificates.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your certificate status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="space-y-4">
                {recentCertificates.map((cert) => (
                  <div 
                    key={cert.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.certificateType}</p>
                        <p className="text-sm text-muted-foreground">{cert.id}</p>
                      </div>
                    </div>
                    <Badge variant={cert.status as any}>{cert.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Notifications</CardTitle>
                <CardDescription>Stay updated on your certificates</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/student/notifications">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      notif.type === 'success' ? 'border-l-success bg-success/5' :
                      notif.type === 'warning' ? 'border-l-warning bg-warning/5' :
                      notif.type === 'error' ? 'border-l-destructive bg-destructive/5' :
                      'border-l-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
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
