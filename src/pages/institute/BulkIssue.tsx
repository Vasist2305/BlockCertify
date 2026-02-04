import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BulkIssue = () => {
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "File Uploaded",
      description: "Processing your bulk certificate request...",
    });
  };

  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Bulk Certificate Issuance</h1>
          <p className="text-muted-foreground">Issue multiple certificates at once using Excel upload</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <FileSpreadsheet className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <CardTitle>Upload Excel File</CardTitle>
                  <CardDescription>Upload a spreadsheet with student details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Box */}
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center hover:border-gold/50 transition-colors cursor-pointer"
                onClick={handleUpload}
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg mb-2">Drop your Excel file here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse from your computer
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported formats: .xlsx, .xls, .csv
                </p>
              </div>

              {/* Download Template */}
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Excel Template
              </Button>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>Follow these steps for bulk issuance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <p className="font-medium">Download the template</p>
                  <p className="text-sm text-muted-foreground">
                    Get the Excel template with required columns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">2</span>
                </div>
                <div>
                  <p className="font-medium">Fill in student details</p>
                  <p className="text-sm text-muted-foreground">
                    Add student name, roll number, course, and certificate type
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">3</span>
                </div>
                <div>
                  <p className="font-medium">Upload and verify</p>
                  <p className="text-sm text-muted-foreground">
                    System will validate data before processing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">4</span>
                </div>
                <div>
                  <p className="font-medium">Issue on blockchain</p>
                  <p className="text-sm text-muted-foreground">
                    All certificates will be stored on blockchain
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Important Note</p>
                    <p className="text-muted-foreground">
                      Maximum 100 certificates can be issued in one batch. 
                      Each certificate will incur blockchain transaction fees.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BulkIssue;
