import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RequestCertificate = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your certificate request has been submitted successfully.",
    });
  };

  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Request Certificate</h1>
          <p className="text-muted-foreground">Fill in the details to request a new certificate</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-gold" />
              </div>
              <div>
                <CardTitle>Certificate Request Form</CardTitle>
                <CardDescription>Please ensure all information is accurate</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" placeholder="CS2021001" defaultValue="CS2021001" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" placeholder="B.Tech Computer Science" defaultValue="B.Tech Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="cs">
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                      <SelectItem value="ec">Electronics</SelectItem>
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
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="degree">Degree Certificate</SelectItem>
                      <SelectItem value="transcript">Transcript</SelectItem>
                      <SelectItem value="completion">Course Completion</SelectItem>
                      <SelectItem value="merit">Merit Certificate</SelectItem>
                      <SelectItem value="provisional">Provisional Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button type="submit" variant="gold" size="lg">
                  <Send className="h-4 w-4" />
                  Submit Request
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RequestCertificate;
