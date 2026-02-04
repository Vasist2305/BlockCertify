import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, ExternalLink, Shield, Award, CheckCircle2 } from 'lucide-react';

interface CertificateData {
  id: string;
  studentName: string;
  rollNumber: string;
  course: string;
  department: string;
  certificateType: string;
  issueDate: string;
  instituteName: string;
  instituteLocation: string;
  grade?: string;
  cgpa?: string;
  blockchainHash?: string;
  status: string;
}

interface CertificatePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: CertificateData | null;
}

export const CertificatePreviewModal = ({
  open,
  onOpenChange,
  certificate,
}: CertificatePreviewModalProps) => {
  if (!certificate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gold" />
              Certificate Preview
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="gold" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Certificate Template */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 border-8 border-double border-gold/30 rounded-lg p-8 shadow-xl relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-gold/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-gold/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-gold/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-gold/40 rounded-br-lg" />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Shield className="w-96 h-96 text-navy" />
            </div>

            {/* Header */}
            <div className="text-center mb-8 relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-lg">
                  <Award className="h-10 w-10 text-gold" />
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold text-navy tracking-wide uppercase">
                {certificate.instituteName}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{certificate.instituteLocation}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <Shield className="h-5 w-5 text-gold" />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display font-bold text-navy mb-2 tracking-tight">
                Certificate of {certificate.certificateType.replace('Certificate', '').trim() || 'Achievement'}
              </h1>
              <p className="text-lg text-muted-foreground italic">This is to certify that</p>
            </div>

            {/* Student Name */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display font-bold text-navy border-b-2 border-gold/30 pb-2 inline-block px-8">
                {certificate.studentName}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">Roll Number: {certificate.rollNumber}</p>
            </div>

            {/* Achievement Details */}
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <p className="text-lg text-foreground leading-relaxed">
                has successfully completed the requirements for the
                <span className="font-semibold text-navy"> {certificate.course} </span>
                program in the Department of
                <span className="font-semibold text-navy"> {certificate.department}</span>
                {certificate.cgpa && (
                  <>
                    {' '}with a Cumulative Grade Point Average of
                    <span className="font-bold text-gold"> {certificate.cgpa}</span>
                  </>
                )}
                {certificate.grade && (
                  <>
                    {' '}securing
                    <span className="font-bold text-gold"> {certificate.grade} </span>
                    grade
                  </>
                )}
                .
              </p>
            </div>

            {/* Date & Certificate ID */}
            <div className="flex justify-between items-end mb-8 px-4">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="font-semibold text-navy">{certificate.issueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Certificate ID</p>
                <p className="font-mono text-sm font-semibold text-navy">{certificate.id}</p>
              </div>
            </div>

            {/* Signatures & QR Code Section */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gold/20">
              {/* Registrar Signature */}
              <div className="text-center">
                <div className="h-16 flex items-end justify-center mb-2">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M20 40 Q40 20 60 35 T100 30 T140 40 T180 25' stroke='%231a365d' fill='none' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"
                    alt="Registrar Signature"
                    className="h-12 opacity-80"
                  />
                </div>
                <div className="h-px w-32 bg-navy/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-navy">University Registrar</p>
                <p className="text-xs text-muted-foreground">Academic Affairs</p>
              </div>

              {/* QR Code */}
              <div className="text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white border-2 border-navy/10 rounded-lg p-2 shadow-sm">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* QR Code Pattern */}
                    <rect x="5" y="5" width="25" height="25" fill="#1a365d"/>
                    <rect x="10" y="10" width="15" height="15" fill="white"/>
                    <rect x="13" y="13" width="9" height="9" fill="#1a365d"/>
                    
                    <rect x="70" y="5" width="25" height="25" fill="#1a365d"/>
                    <rect x="75" y="10" width="15" height="15" fill="white"/>
                    <rect x="78" y="13" width="9" height="9" fill="#1a365d"/>
                    
                    <rect x="5" y="70" width="25" height="25" fill="#1a365d"/>
                    <rect x="10" y="75" width="15" height="15" fill="white"/>
                    <rect x="13" y="78" width="9" height="9" fill="#1a365d"/>
                    
                    {/* Random pattern for QR data */}
                    <rect x="35" y="5" width="5" height="5" fill="#1a365d"/>
                    <rect x="45" y="5" width="5" height="5" fill="#1a365d"/>
                    <rect x="55" y="5" width="5" height="5" fill="#1a365d"/>
                    <rect x="40" y="15" width="5" height="5" fill="#1a365d"/>
                    <rect x="50" y="15" width="5" height="5" fill="#1a365d"/>
                    <rect x="35" y="25" width="5" height="5" fill="#1a365d"/>
                    <rect x="55" y="25" width="5" height="5" fill="#1a365d"/>
                    
                    <rect x="5" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="15" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="25" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="5" y="45" width="5" height="5" fill="#1a365d"/>
                    <rect x="20" y="45" width="5" height="5" fill="#1a365d"/>
                    <rect x="5" y="55" width="5" height="5" fill="#1a365d"/>
                    <rect x="15" y="55" width="5" height="5" fill="#1a365d"/>
                    
                    <rect x="35" y="35" width="30" height="30" fill="none" stroke="#1a365d" strokeWidth="3"/>
                    <rect x="45" y="45" width="10" height="10" fill="#1a365d"/>
                    
                    <rect x="70" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="80" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="90" y="35" width="5" height="5" fill="#1a365d"/>
                    <rect x="75" y="45" width="5" height="5" fill="#1a365d"/>
                    <rect x="85" y="45" width="5" height="5" fill="#1a365d"/>
                    <rect x="70" y="55" width="5" height="5" fill="#1a365d"/>
                    <rect x="90" y="55" width="5" height="5" fill="#1a365d"/>
                    
                    <rect x="70" y="70" width="5" height="5" fill="#1a365d"/>
                    <rect x="80" y="70" width="5" height="5" fill="#1a365d"/>
                    <rect x="90" y="70" width="5" height="5" fill="#1a365d"/>
                    <rect x="75" y="80" width="5" height="5" fill="#1a365d"/>
                    <rect x="85" y="80" width="5" height="5" fill="#1a365d"/>
                    <rect x="70" y="90" width="5" height="5" fill="#1a365d"/>
                    <rect x="80" y="90" width="5" height="5" fill="#1a365d"/>
                    
                    <rect x="35" y="70" width="5" height="5" fill="#1a365d"/>
                    <rect x="45" y="75" width="5" height="5" fill="#1a365d"/>
                    <rect x="55" y="70" width="5" height="5" fill="#1a365d"/>
                    <rect x="40" y="85" width="5" height="5" fill="#1a365d"/>
                    <rect x="50" y="90" width="5" height="5" fill="#1a365d"/>
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Scan to Verify</p>
              </div>

              {/* Dean Signature */}
              <div className="text-center">
                <div className="h-16 flex items-end justify-center mb-2">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Cpath d='M30 35 Q50 15 80 30 Q110 45 130 25 Q150 5 170 35' stroke='%231a365d' fill='none' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"
                    alt="Dean Signature"
                    className="h-12 opacity-80"
                  />
                </div>
                <div className="h-px w-32 bg-navy/30 mx-auto mb-2" />
                <p className="text-sm font-semibold text-navy">Dean of Studies</p>
                <p className="text-xs text-muted-foreground">Academic Council</p>
              </div>
            </div>

            {/* Digital Seal */}
            <div className="absolute bottom-24 right-8 opacity-20">
              <div className="w-28 h-28 rounded-full border-4 border-navy flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-navy flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[8px] font-bold text-navy uppercase">Official</p>
                    <p className="text-[6px] text-navy">University Seal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Verification Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">Blockchain Verified</h4>
                  <Badge variant="issued" className="text-xs">Authentic</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  This certificate has been cryptographically secured and stored on the blockchain.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Transaction Hash:</span>
                  <code className="bg-background px-2 py-1 rounded font-mono text-xs">
                    {certificate.blockchainHash || '0x7f9e...a3b4'}
                  </code>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
