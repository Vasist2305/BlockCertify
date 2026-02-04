import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Eye, CheckCircle2, XCircle, Search, Clock } from 'lucide-react';
import { pendingRequests } from '@/lib/dummy-data';
import { useToast } from '@/hooks/use-toast';

const PendingRequests = () => {
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    toast({
      title: "Request Approved",
      description: `Request ${id} has been approved and queued for issuance.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Request Rejected",
      description: `Request ${id} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Pending Requests</h1>
          <p className="text-muted-foreground">Review and process certificate requests</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by student name or roll number..." 
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-gold" />
              </div>
              <div>
                <CardTitle className="text-xl">Awaiting Review</CardTitle>
                <CardDescription>{pendingRequests.length} requests pending</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Certificate Type</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.studentName}</TableCell>
                    <TableCell>{request.rollNumber}</TableCell>
                    <TableCell>{request.course}</TableCell>
                    <TableCell>{request.certificateType}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PendingRequests;
