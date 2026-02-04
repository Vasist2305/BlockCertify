import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Upload, Search, QrCode, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { sampleVerificationResult } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';

const VerifyCertificate = () => {
  const [result, setResult] = useState<typeof sampleVerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(sampleVerificationResult);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
              <Shield className="h-8 w-8 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">Verify Certificate</h1>
              <p className="text-white/70">Instantly verify any certificate on the blockchain</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Methods</CardTitle>
              <CardDescription>Choose how you want to verify the certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Box */}
              <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">Upload Certificate PDF</h3>
                <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Certificate ID Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Enter Certificate ID or Hash (e.g., CERT-2024-001)" className="flex-1" />
                  <Button variant="gold" onClick={handleVerify} disabled={loading}>
                    {loading ? 'Verifying...' : <><Search className="h-4 w-4 mr-2" />Verify</>}
                  </Button>
                </div>
              </div>

              {/* QR Option */}
              <Button variant="outline" className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <Card className={`border-2 ${result.isValid ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  {result.isValid ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-10 w-10 text-success" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-success">Certificate is Authentic</h2>
                      <p className="text-muted-foreground">Verified on Blockchain</p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                        <XCircle className="h-10 w-10 text-destructive" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-destructive">Certificate is Invalid</h2>
                      <p className="text-muted-foreground">Not found on Blockchain</p>
                    </>
                  )}
                </div>

                {result.isValid && result.certificate && (
                  <div className="space-y-4 border-t pt-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><p className="text-sm text-muted-foreground">Student Name</p><p className="font-medium">{result.certificate.studentName}</p></div>
                      <div><p className="text-sm text-muted-foreground">Certificate ID</p><p className="font-mono text-sm">{result.certificate.id}</p></div>
                      <div><p className="text-sm text-muted-foreground">Institute</p><p className="font-medium">{result.certificate.instituteName}</p></div>
                      <div><p className="text-sm text-muted-foreground">Issue Date</p><p className="font-medium">{result.certificate.issueDate}</p></div>
                      <div><p className="text-sm text-muted-foreground">Certificate Type</p><p className="font-medium">{result.certificate.certificateType}</p></div>
                      <div><p className="text-sm text-muted-foreground">Status</p><Badge variant="issued">{result.certificate.status}</Badge></div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
                      <p className="font-mono text-xs break-all bg-muted p-2 rounded">{result.certificate.transactionHash}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">Download Verification Report</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
