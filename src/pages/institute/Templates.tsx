import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Eye, Trash2 } from 'lucide-react';

const templates = [
  { id: 1, name: 'Default Degree Certificate', type: 'Degree', lastModified: '2024-06-01', isDefault: true },
  { id: 2, name: 'Formal Transcript', type: 'Transcript', lastModified: '2024-05-15', isDefault: false },
  { id: 3, name: 'Modern Course Completion', type: 'Completion', lastModified: '2024-05-20', isDefault: false },
  { id: 4, name: 'Merit Award Certificate', type: 'Merit', lastModified: '2024-06-10', isDefault: false },
];

const Templates = () => {
  return (
    <DashboardLayout role="institute" userName="MIT University">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Certificate Templates</h1>
            <p className="text-muted-foreground">Manage and customize certificate designs</p>
          </div>
          <Button variant="gold">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} variant="interactive">
              <CardHeader>
                <div className="aspect-[1.4/1] bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5" />
                  <FileText className="h-16 w-16 text-muted-foreground/50" />
                  {template.isDefault && (
                    <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>
                  Type: {template.type} • Modified: {template.lastModified}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
