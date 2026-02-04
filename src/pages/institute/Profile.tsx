import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building, Mail, MapPin, Calendar, Shield, Upload, Save, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InstituteProfile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Institute profile has been updated successfully.",
    });
  };

  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Institute Profile</h1>
          <p className="text-muted-foreground">Manage your institute information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/identicon/svg?seed=MIT" />
                  <AvatarFallback>MIT</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-display font-bold">MIT University</h3>
                <p className="text-muted-foreground">Accreditation: ACC-2024-MIT</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Badge variant="verified" className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Institute
                  </Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Engineering University</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Cambridge, MA, USA</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Established 1861</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>1,250 Certificates Issued</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Institute Information</CardTitle>
              <CardDescription>Update your institute details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Institute Name</Label>
                  <Input id="name" defaultValue="MIT University" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Institute Type</Label>
                  <Input id="type" defaultValue="Engineering University" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Official Email</Label>
                  <Input id="email" type="email" defaultValue="admin@mit.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accreditation">Accreditation ID</Label>
                  <Input id="accreditation" defaultValue="ACC-2024-MIT" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="77 Massachusetts Ave, Cambridge, MA 02139, USA" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institute Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload logo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Digital Seal</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload seal</p>
                  </div>
                </div>
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

export default InstituteProfile;
