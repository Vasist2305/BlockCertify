import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Download, Share2, Search, Filter, Shield } from 'lucide-react';
import { myCertificates } from '@/lib/dummy-data';
import { CertificatePreviewModal } from '@/components/certificate/CertificatePreviewModal';

const MyCertificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleViewCertificate = (cert: any) => {
    setSelectedCertificate({
      ...cert,
      studentName: 'John Doe',
      rollNumber: 'STU2024001',
      course: 'Bachelor of Technology in Computer Science',
      department: 'Computer Science & Engineering',
      instituteName: 'MIT University',
      instituteLocation: 'Cambridge, Massachusetts, USA',
      cgpa: '3.85',
      blockchainHash: '0x7f9e8d7c6b5a4321...a3b4c5d6e7f8',
    });
    setIsPreviewOpen(true);
  };

  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">My Certificates</h1>
          <p className="text-muted-foreground">View and manage all your certificates</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by certificate ID or type..." 
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Certificate Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="degree">Degree Certificate</SelectItem>
                  <SelectItem value="transcript">Transcript</SelectItem>
                  <SelectItem value="completion">Course Completion</SelectItem>
                  <SelectItem value="merit">Merit Certificate</SelectItem>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.id}</TableCell>
                    <TableCell>{cert.certificateType}</TableCell>
                    <TableCell>{cert.issueDate || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={cert.status as any}>{cert.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="View"
                          onClick={() => handleViewCertificate(cert)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {cert.status === 'issued' && (
                          <>
                            <Button variant="ghost" size="icon" title="Download">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Share verification link">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CertificatePreviewModal
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          certificate={selectedCertificate}
        />
      </div>
    </DashboardLayout>
  );
};

export default MyCertificates;
