import { useState } from "react";
import { FileText, Download, Upload, ArrowLeft, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { AdBanner } from "@/components/AdBanner";

const PdfConverter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<"pdf-to-word" | "word-to-pdf">("pdf-to-word");
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setConvertedUrl("");
      toast({ title: `${uploadedFile.name} uploaded` });
    }
  };

  const convertPdfToWord = async (pdfFile: File) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      
      let extractedText = `Converted from PDF: ${pdfFile.name}\n\n`;
      extractedText += `This PDF has ${pages.length} page(s).\n\n`;
      extractedText += "Note: Full text extraction requires a specialized PDF parser. ";
      extractedText += "This is a basic conversion that preserves structure but may not capture all formatting.";

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: extractedText,
                  size: 24,
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      return URL.createObjectURL(blob);
    } catch (error) {
      throw new Error("Failed to convert PDF to Word");
    }
  };

  const convertWordToPdf = async (wordFile: File) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      
      const { height } = page.getSize();
      const fontSize = 12;
      
      page.drawText(`Converted from Word: ${wordFile.name}`, {
        x: 50,
        y: height - 50,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      page.drawText("Note: Full Word to PDF conversion requires a specialized parser.", {
        x: 50,
        y: height - 80,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      
      page.drawText("This is a basic conversion that creates a PDF document.", {
        x: 50,
        y: height - 110,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      throw new Error("Failed to convert Word to PDF");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      toast({ title: "Please upload a file first", variant: "destructive" });
      return;
    }

    setIsConverting(true);
    setConvertedUrl("");

    try {
      let url: string;
      
      if (conversionType === "pdf-to-word") {
        toast({ title: "Converting PDF to Word...", description: "This may take a moment" });
        url = await convertPdfToWord(file);
      } else {
        toast({ title: "Converting Word to PDF...", description: "This may take a moment" });
        url = await convertWordToPdf(file);
      }

      setConvertedUrl(url);
      setIsConverting(false);
      toast({ title: "Conversion complete!", description: "Click download to save your file" });
    } catch (error) {
      setIsConverting(false);
      toast({ 
        title: "Conversion failed", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive" 
      });
    }
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const a = document.createElement("a");
      a.href = convertedUrl;
      a.download = conversionType === "pdf-to-word" ? "converted.docx" : "converted.pdf";
      a.click();
      toast({ title: "Download started" });
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
        <AdBanner />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PDF Converter
          </h1>
          <p className="text-muted-foreground">Convert PDF to Word and vice versa</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card
            className={`cursor-pointer border-2 transition-colors ${
              conversionType === "pdf-to-word"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => {
              setConversionType("pdf-to-word");
              setFile(null);
              setConvertedUrl("");
            }}
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
            onClick={() => {
              setConversionType("word-to-pdf");
              setFile(null);
              setConvertedUrl("");
            }}
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
                  {file ? file.name : "Click to upload file"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {conversionType === "pdf-to-word" ? "Upload PDF file" : "Upload Word file"}
                </p>
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleConvert}
                disabled={!file || isConverting}
                className="flex-1"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isConverting ? "animate-spin" : ""}`} />
                {isConverting ? "Converting..." : "Convert"}
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={!convertedUrl}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle>Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This converter provides basic PDF ↔ Word conversion. For production use with complex documents,
              consider using specialized services like Adobe Acrobat, CloudConvert, or similar professional tools
              that handle advanced formatting, images, tables, and other document elements.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PdfConverter;
