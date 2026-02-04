import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Blocks, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IssueCertificate = () => {
  const { toast } = useToast();

  const handleIssue = () => {
    toast({
      title: "Certificate Issued",
      description: "Certificate has been generated and stored on blockchain.",
    });
  };

  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Issue Certificate</h1>
          <p className="text-muted-foreground">Generate and issue new certificates on blockchain</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <CardTitle>Certificate Details</CardTitle>
                  <CardDescription>Fill in the certificate information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" placeholder="Enter student name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" placeholder="Enter roll number" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" placeholder="Enter course name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Completion</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="degree">Degree Certificate</SelectItem>
                      <SelectItem value="transcript">Transcript</SelectItem>
                      <SelectItem value="completion">Course Completion</SelectItem>
                      <SelectItem value="merit">Merit Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Certificate Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="formal">Formal Template</SelectItem>
                    <SelectItem value="modern">Modern Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Certificate
                </Button>
                <Button variant="gold" className="flex-1" onClick={handleIssue}>
                  <Blocks className="h-4 w-4 mr-2" />
                  Generate & Store on Blockchain
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>Certificate Preview</CardTitle>
              <CardDescription>Preview how the certificate will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[1.4/1] bg-white rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-muted-foreground">Certificate Preview</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Fill in the details to see a preview of the certificate
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IssueCertificate;
