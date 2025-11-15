import { useState } from "react";
import { FileText, Download, Upload, ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const PdfConverter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<"pdf-to-word" | "word-to-pdf">("pdf-to-word");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({ title: `${uploadedFile.name} uploaded` });
    }
  };

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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PDF Converter
          </h1>
          <p className="text-muted-foreground">Convert PDF to Word and vice versa</p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Document conversion requires backend processing. The interface is ready for implementation.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card
            className={`cursor-pointer border-2 transition-colors ${
              conversionType === "pdf-to-word"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setConversionType("pdf-to-word")}
          >
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-lg">PDF to Word</h3>
              <p className="text-sm text-muted-foreground mt-1">Convert PDF to DOCX format</p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer border-2 transition-colors ${
              conversionType === "word-to-pdf"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setConversionType("word-to-pdf")}
          >
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-lg">Word to PDF</h3>
              <p className="text-sm text-muted-foreground mt-1">Convert DOCX to PDF format</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept={conversionType === "pdf-to-word" ? ".pdf" : ".doc,.docx"}
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  Click to upload {conversionType === "pdf-to-word" ? "PDF" : "Word"} file
                </p>
                <p className="text-sm text-muted-foreground">
                  {conversionType === "pdf-to-word" ? "PDF files only" : "DOC, DOCX files"}
                </p>
              </label>
            </div>

            {file && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium">Selected file:</p>
                <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
              </div>
            )}

            <Button className="w-full" disabled>
              <Download className="h-4 w-4 mr-2" />
              Convert (Coming Soon)
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PdfConverter;
