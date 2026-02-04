import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { activityLogs } from '@/lib/dummy-data';
import { Shield, FileText, User, CheckCircle2 } from 'lucide-react';

const iconMap = {
  verification: CheckCircle2,
  certificate: Shield,
  request: FileText,
  profile: User,
};

const colorMap = {
  verification: 'bg-teal/10 text-teal',
  certificate: 'bg-gold/10 text-gold',
  request: 'bg-primary/10 text-primary',
  profile: 'bg-muted text-muted-foreground',
};

const ActivityLog = () => {
  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Activity Log</h1>
          <p className="text-muted-foreground">Your recent account activity</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-6">
                {activityLogs.map((log, index) => {
                  const Icon = iconMap[log.type];
                  
                  return (
                    <div key={log.id} className="relative flex items-start gap-4 pl-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${colorMap[log.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">{log.description}</p>
                          </div>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivityLog;
