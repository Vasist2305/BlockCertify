import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/common/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle2, XCircle, ArrowRight, Shield, TrendingUp } from 'lucide-react';
import { instituteStats, pendingRequests, monthlyIssuanceData } from '@/lib/dummy-data';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InstituteDashboard = () => {
  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Institute Dashboard</h1>
          <p className="text-muted-foreground">Manage certificates and student requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Issued"
            value={instituteStats.totalIssued}
            icon={Shield}
            accentColor="success"
            trend={{ value: 12, isPositive: true }}
            description="All time certificates"
          />
          <StatsCard
            title="Pending Requests"
            value={instituteStats.pending}
            icon={Clock}
            accentColor="gold"
            description="Awaiting approval"
          />
          <StatsCard
            title="Revoked"
            value={instituteStats.revoked}
            icon={XCircle}
            accentColor="destructive"
            description="Cancelled certificates"
          />
          <StatsCard
            title="This Month"
            value={instituteStats.thisMonth}
            icon={TrendingUp}
            accentColor="teal"
            trend={{ value: 8, isPositive: true }}
            description="Issued this month"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Monthly Issuance</CardTitle>
              <CardDescription>Certificate issuance trend over 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyIssuanceData}>
                    <defs>
                      <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--teal))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--teal))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="issued" 
                      stroke="hsl(var(--teal))" 
                      fillOpacity={1} 
                      fill="url(#colorIssued)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Pending Requests</CardTitle>
                <CardDescription>Requests awaiting your approval</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/institute/pending">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests.slice(0, 3).map((request) => (
                  <div 
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium">{request.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.certificateType} • {request.rollNumber}
                        </p>
                      </div>
                    </div>
                    <Button variant="gold" size="sm">Review</Button>
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
                <Link to="/institute/issue">
                  <Shield className="h-4 w-4" />
                  Issue New Certificate
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/institute/pending">
                  Review Pending ({instituteStats.pending})
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/institute/bulk">
                  Bulk Issue Certificates
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/institute/analytics">
                  View Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InstituteDashboard;
