import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { notifications } from '@/lib/dummy-data';
import { Bell, CheckCircle2, Info, AlertTriangle, XCircle, Check } from 'lucide-react';

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap = {
  success: 'border-l-success bg-success/5',
  info: 'border-l-primary bg-primary/5',
  warning: 'border-l-warning bg-warning/5',
  error: 'border-l-destructive bg-destructive/5',
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="outline">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type];
            
            return (
              <Card 
                key={notif.id} 
                className={`border-l-4 ${colorMap[notif.type]} ${!notif.read ? 'shadow-md' : ''}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.type === 'success' ? 'bg-success/10 text-success' :
                      notif.type === 'warning' ? 'bg-warning/10 text-warning' :
                      notif.type === 'error' ? 'bg-destructive/10 text-destructive' :
                      'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {notif.title}
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(notif.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
