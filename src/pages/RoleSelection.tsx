import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Search, ArrowRight, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Request and manage your academic certificates. Track your certificate status and share verification links.',
    icon: GraduationCap,
    color: 'from-teal to-teal-light',
    link: '/auth/student/login',
  },
  {
    id: 'institute',
    title: 'Institute',
    description: 'Issue, manage, and revoke certificates. Access analytics and bulk issuance tools for your institution.',
    icon: Building2,
    color: 'from-primary to-navy-light',
    link: '/auth/institute/login',
  },
  {
    id: 'verifier',
    title: 'Verifier',
    description: 'Instantly verify the authenticity of any certificate using certificate ID, QR code, or PDF upload.',
    icon: Search,
    color: 'from-gold to-gold-light',
    link: '/verifier/verify',
  },
];

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <Shield className="h-7 w-7 text-gold-foreground" />
            </div>
            <span className="text-2xl font-display font-bold">CertChain</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Select Your Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to interact with the certificate verification system.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Card 
              key={role.id}
              variant="interactive"
              className="group relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                <CardDescription className="text-base min-h-[72px]">
                  {role.description}
                </CardDescription>
                
                <Button asChild variant="default" className="w-full group/btn">
                  <Link to={role.link}>
                    Continue as {role.title}
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
