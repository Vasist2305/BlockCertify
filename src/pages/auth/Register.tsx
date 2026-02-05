import { Link, useParams, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Building, GraduationCap, Loader2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    rollNumber: '',
    course: '',
    department: '',
    instituteId: '',
  });
  
  const roleTitle = role === 'student' ? 'Student' : 'Institute';
  const roleColor = role === 'student' ? 'from-teal to-teal-light' : 'from-primary to-navy-light';
  const RoleIcon = role === 'student' ? GraduationCap : Building;
  const dashboardPath = role === 'student' ? '/student/dashboard' : '/institute/dashboard';

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.walletAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await register({
        ...formData,
        role: role?.toUpperCase() || 'STUDENT',
      });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate(dashboardPath);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link 
            to="/role-selection" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to role selection
          </Link>

          <Card variant="elevated">
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${roleColor} flex items-center justify-center mb-4 shadow-lg`}>
                <RoleIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{roleTitle} Registration</CardTitle>
              <CardDescription>
                Create your {roleTitle.toLowerCase()} account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {role === 'student' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input 
                        id="rollNumber" 
                        placeholder="e.g., CS2021001" 
                        value={formData.rollNumber}
                        onChange={(e) => handleChange('rollNumber', e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Input 
                          id="course" 
                          placeholder="e.g., B.Tech CS" 
                          value={formData.course}
                          onChange={(e) => handleChange('course', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          placeholder="e.g., Computer Science" 
                          value={formData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Institute Name *</Label>
                      <Input 
                        id="name" 
                        placeholder="e.g., MIT University" 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instituteId">Institute ID / Accreditation</Label>
                      <Input 
                        id="instituteId" 
                        placeholder="e.g., MIT-2024-001" 
                        value={formData.instituteId}
                        onChange={(e) => handleChange('instituteId', e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address *</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="walletAddress" 
                      placeholder="0x..." 
                      className="pl-10"
                      value={formData.walletAddress}
                      onChange={(e) => handleChange('walletAddress', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your Ethereum wallet address for blockchain transactions
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="gold" 
                  className="w-full" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to={`/auth/${role}/login`}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-lg">
          <div className="w-20 h-20 rounded-2xl bg-gold/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <Shield className="h-10 w-10 text-gold" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Join CertChain Today
          </h2>
          <p className="text-lg text-white/80">
            {role === 'student' 
              ? 'Get your certificates verified on the blockchain and share them instantly with employers.'
              : 'Issue tamper-proof certificates to your students with our secure blockchain platform.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
