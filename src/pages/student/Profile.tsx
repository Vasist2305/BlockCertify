import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, GraduationCap, Building, Calendar, Wallet, CheckCircle2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentProfile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <DashboardLayout role="student" userName="John Doe">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-display font-bold">John Doe</h3>
                <p className="text-muted-foreground">CS2021001</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant="verified" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Student
                  </Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>B.Tech Computer Science</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>MIT University</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined August 2021</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@university.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input id="rollNumber" defaultValue="CS2021001" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" defaultValue="B.Tech Computer Science" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Wallet Address
                </Label>
                <Input 
                  id="wallet" 
                  placeholder="0x..." 
                  defaultValue="0x1234...5678"
                />
                <p className="text-xs text-muted-foreground">
                  Connect your blockchain wallet to receive certificates
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="gold" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
