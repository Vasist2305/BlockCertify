import { Link } from 'react-router-dom';
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  FileCheck,
  Blocks,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Lock,
    title: 'Tamper-Proof',
    description: 'Certificates stored on blockchain cannot be altered or forged.',
  },
  {
    icon: Blocks,
    title: 'Blockchain-Secured',
    description: 'Powered by smart contracts for immutable record keeping.',
  },
  {
    icon: Zap,
    title: 'Instant Verification',
    description: 'Verify any certificate in seconds from anywhere in the world.',
  },
  {
    icon: FileCheck,
    title: 'No Forgery',
    description: 'Cryptographic proof ensures authentic certificates only.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Request',
    description: 'Student requests a certificate through the secure portal.',
    icon: Users,
  },
  {
    step: '02',
    title: 'Issue',
    description: 'Institute verifies and issues certificate on blockchain.',
    icon: Building2,
  },
  {
    step: '03',
    title: 'Verify',
    description: 'Anyone can instantly verify certificate authenticity.',
    icon: CheckCircle2,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gold/20 animate-float" />
        <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-teal/20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
              <Shield className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">Blockchain-Powered Verification</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Decentralized Certificate
              <span className="block text-gradient-hero">Generation & Verification</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-medium mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Using Blockchain Smart Contracts for Tamper-Proof Digital Certificates
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              A secure, transparent, and decentralized platform to issue, manage, and verify 
              academic and professional certificates without forgery using blockchain technology.
            </p>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {['Trusted', 'Transparent', 'Tamper-Proof'].map((word, i) => (
                <div key={word} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-gold" />
                  <span className="text-white font-semibold">{word}</span>
                  {i < 2 && <span className="text-white/30 ml-2">•</span>}
                </div>
              ))}
            </div>

            {/* Portal Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto min-w-[200px]">
                <Link to="/student/dashboard">
                  <GraduationCap className="h-5 w-5" />
                  Student Portal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroSolid" size="xl" className="w-full sm:w-auto min-w-[200px]">
                <Link to="/institute/dashboard">
                  <Building2 className="h-5 w-5" />
                  Institute Portal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto min-w-[200px]">
                <Link to="/verifier/verify">
                  <Search className="h-5 w-5" />
                  Verifier Portal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose <span className="text-gradient">CertChain</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our blockchain-based system ensures complete trust and transparency in certificate management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="interactive"
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-teal/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to issue and verify tamper-proof certificates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div 
                key={item.step} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gold to-transparent" />
                )}
                
                <Card variant="elevated" className="text-center relative z-10">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-2xl font-display font-bold text-gold-foreground">{item.step}</span>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Certificates Issued' },
              { value: '500+', label: 'Institutions' },
              { value: '50K+', label: 'Verifications' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <Card variant="featured" className="max-w-4xl mx-auto overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
                <Globe className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-gold">Ready to get started?</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join the Future of Certificate Verification
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're a student, institution, or employer, our platform makes certificate 
                management secure and effortless.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="gold" size="lg">
                  <Link to="/role-selection">
                    Get Started Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/verifier/verify">
                    Verify a Certificate
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                <Shield className="h-6 w-6 text-gold-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold">CertChain</h3>
                <p className="text-sm text-primary-foreground/70">Decentralized Certificate Verification</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70">
              © 2024 CertChain. Final Year Major Project. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
