import { Link, useParams } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Login = () => {
  const { role } = useParams<{ role: string }>();
  const [showPassword, setShowPassword] = useState(false);
  
  const roleTitle = role === 'student' ? 'Student' : 'Institute';
  const roleColor = role === 'student' ? 'from-teal to-teal-light' : 'from-primary to-navy-light';
  const dashboardPath = role === 'student' ? '/student/dashboard' : '/institute/dashboard';

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
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{roleTitle} Login</CardTitle>
              <CardDescription>
                Sign in to access your {roleTitle.toLowerCase()} dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="#" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password" 
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
              </div>

              <Button asChild variant="gold" className="w-full" size="lg">
                <Link to={dashboardPath}>
                  Sign In
                </Link>
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link 
                  to={`/auth/${role}/register`}
                  className="text-primary font-medium hover:underline"
                >
                  Register here
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
            Secure & Transparent
          </h2>
          <p className="text-lg text-white/80">
            Access your blockchain-verified certificates with complete security and transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
