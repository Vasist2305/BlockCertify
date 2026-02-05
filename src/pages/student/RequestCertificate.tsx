import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentAPI, authAPI } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const RequestCertificate = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    instituteId: '',
    certificateType: '',
    course: user?.course || '',
    department: user?.department || '',
    year: new Date().getFullYear().toString(),
  });

  // Fetch institutes
  const { data: institutes, isLoading: institutesLoading } = useQuery({
    queryKey: ['institutes'],
    queryFn: async () => {
      const response = await authAPI.getInstitutes();
      return response.data;
    },
  });

  // Submit request mutation
  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await studentAPI.requestCertificate(data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Your certificate request has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['student-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['student-certificates'] });
      navigate('/student/history');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit request",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.instituteId || !formData.certificateType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout role="student" userName={user?.name || "Student"}>
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
              <div className="space-y-2">
                <Label htmlFor="institute">Institute *</Label>
                {institutesLoading ? (
                  <div className="flex items-center gap-2 p-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading institutes...</span>
                  </div>
                ) : (
                  <Select value={formData.instituteId} onValueChange={(value) => handleChange('instituteId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your institute" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutes?.map((institute: any) => (
                        <SelectItem key={institute._id} value={institute._id}>
                          {institute.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input 
                    id="course" 
                    placeholder="e.g., B.Tech Computer Science" 
                    value={formData.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    placeholder="e.g., Computer Science" 
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Completion</Label>
                  <Input 
                    id="year" 
                    placeholder="e.g., 2024" 
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type *</Label>
                  <Input 
                    id="certificateType" 
                    placeholder="e.g., Degree Certificate" 
                    value={formData.certificateType}
                    onChange={(e) => handleChange('certificateType', e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button 
                  type="submit" 
                  variant="gold" 
                  size="lg"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  onClick={() => setFormData({
                    instituteId: '',
                    certificateType: '',
                    course: user?.course || '',
                    department: user?.department || '',
                    year: new Date().getFullYear().toString(),
                  })}
                >
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
