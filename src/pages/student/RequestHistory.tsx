import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { certificateRequests } from '@/lib/dummy-data';
import { CheckCircle2, Clock, FileText, XCircle, Shield } from 'lucide-react';

const statusConfig = {
  pending: { icon: Clock, color: 'bg-amber-500', label: 'Pending Review' },
  approved: { icon: CheckCircle2, color: 'bg-blue-500', label: 'Approved' },
  issued: { icon: Shield, color: 'bg-emerald-500', label: 'Issued on Blockchain' },
  rejected: { icon: XCircle, color: 'bg-red-500', label: 'Rejected' },
};

const RequestHistory = () => {
  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Request History</h1>
          <p className="text-muted-foreground">Track the status of your certificate requests</p>
        </div>

        <div className="space-y-6">
          {certificateRequests.map((request) => {
            const currentStatus = statusConfig[request.status];
            
            return (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{request.certificateType}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Request ID: {request.id} • Submitted: {request.requestDate}
                        </p>
                      </div>
                    </div>
                    <Badge variant={request.status as any} className="text-sm">
                      {request.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    
                    {/* Requested */}
                    <div className="relative flex items-start gap-4 pb-6">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center z-10">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Request Submitted</p>
                        <p className="text-sm text-muted-foreground">{request.requestDate}</p>
                      </div>
                    </div>

                    {/* Approved */}
                    <div className="relative flex items-start gap-4 pb-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        request.approvedDate ? 'bg-emerald-500' : 'bg-muted'
                      }`}>
                        {request.approvedDate ? (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${!request.approvedDate && 'text-muted-foreground'}`}>
                          Request Approved
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {request.approvedDate || 'Pending approval'}
                        </p>
                      </div>
                    </div>

                    {/* Issued */}
                    <div className="relative flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        request.issuedDate ? 'bg-emerald-500' : 'bg-muted'
                      }`}>
                        {request.issuedDate ? (
                          <Shield className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${!request.issuedDate && 'text-muted-foreground'}`}>
                          Certificate Issued
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {request.issuedDate ? `Stored on blockchain on ${request.issuedDate}` : 'Awaiting issuance'}
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

export default RequestHistory;
