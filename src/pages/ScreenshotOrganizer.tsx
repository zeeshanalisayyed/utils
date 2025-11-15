import { useState } from "react";
import { FolderOpen, Upload, ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ScreenshotOrganizer = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      toast({ title: `${newFiles.length} files uploaded` });
    }
  };

  const categories = [
    { name: "Facebook", color: "from-blue-500 to-blue-600" },
    { name: "Instagram", color: "from-pink-500 to-purple-600" },
    { name: "WhatsApp", color: "from-green-500 to-green-600" },
    { name: "Twitter/X", color: "from-sky-400 to-sky-600" },
    { name: "LinkedIn", color: "from-blue-600 to-blue-700" },
    { name: "Other", color: "from-gray-500 to-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Screenshot Organizer
          </h1>
          <p className="text-muted-foreground">Automatically categorize your screenshots</p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Advanced categorization requires image analysis. Upload interface ready for backend integration.
          </AlertDescription>
        </Alert>

        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Screenshots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Click to upload screenshots</p>
                <p className="text-sm text-muted-foreground">or drag and drop files here</p>
              </label>
            </div>
            {files.length > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                {files.length} file(s) uploaded
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.name} className="border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3`}>
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">0 screenshots</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScreenshotOrganizer;
