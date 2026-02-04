import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, RotateCcw, XCircle, Search, Filter, Shield } from 'lucide-react';
import { issuedCertificates } from '@/lib/dummy-data';
import { useToast } from '@/hooks/use-toast';

const IssuedCertificates = () => {
  const { toast } = useToast();

  const handleRevoke = (id: string) => {
    toast({
      title: "Certificate Revoked",
      description: `Certificate ${id} has been revoked on blockchain.`,
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Issued Certificates</h1>
          <p className="text-muted-foreground">View and manage all issued certificates</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by certificate ID or student name..." 
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Certificates Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold" />
              Certificate Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issuedCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-mono text-sm">{cert.id}</TableCell>
                    <TableCell className="font-medium">{cert.studentName}</TableCell>
                    <TableCell>{cert.rollNumber}</TableCell>
                    <TableCell>{cert.certificateType}</TableCell>
                    <TableCell>{cert.issueDate}</TableCell>
                    <TableCell>
                      <Badge variant={cert.status as any}>{cert.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {cert.status === 'issued' ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRevoke(cert.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Revoke
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Re-Issue
                          </Button>
                        )}
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

export default IssuedCertificates;
