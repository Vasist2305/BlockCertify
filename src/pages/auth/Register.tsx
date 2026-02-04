import { Link, useParams } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Lock, User, Eye, EyeOff, Building, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Register = () => {
  const { role } = useParams<{ role: string }>();
  const [showPassword, setShowPassword] = useState(false);
  
  const roleTitle = role === 'student' ? 'Student' : 'Institute';
  const roleColor = role === 'student' ? 'from-teal to-teal-light' : 'from-primary to-navy-light';
  const RoleIcon = role === 'student' ? GraduationCap : Building;

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
              <div className="space-y-4">
                {role === 'student' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input id="rollNumber" placeholder="CS2021001" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="instituteName">Institute Name</Label>
                      <Input id="instituteName" placeholder="MIT University" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accreditationId">Accreditation ID</Label>
                      <Input id="accreditationId" placeholder="ACC-2024-001" />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password" 
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      placeholder="Confirm your password" 
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button variant="gold" className="w-full" size="lg">
                Create Account
              </Button>

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
