import { useState } from "react";
import { FileText, Download, Upload, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";

const PdfConverter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<"pdf-to-word" | "word-to-pdf" | "image-to-pdf">("pdf-to-word");
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
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let extractedText = `Converted from PDF: ${pdfFile.name}\n\nThis PDF has ${pages.length} page(s).\n\nNote: Full text extraction requires a specialized PDF parser.`;
    const doc = new Document({
      sections: [{ properties: {}, children: [new Paragraph({ children: [new TextRun({ text: extractedText, size: 24 })] })] }],
    });
    const blob = await Packer.toBlob(doc);
    return URL.createObjectURL(blob);
  };

  const convertWordToPdfBasic = async (wordFile: File) => {
    const arrayBuffer = await wordFile.arrayBuffer();
    let text = `Converted from Word: ${wordFile.name}\n\n`;
    try {
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ arrayBuffer });
      text = result.value || text;
    } catch { text += "Note: Full Word to PDF conversion requires specialized parsing."; }
    const pdfDoc = await PDFDocument.create();
    let currentPage = pdfDoc.addPage([595, 842]);
    const { height } = currentPage.getSize();
    const fontSize = 12, lineHeight = fontSize * 1.5, margin = 50, maxWidth = 495;
    let y = height - margin;
    const words = text.split(/\s+/);
    let line = '';
    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      if (testLine.length * (fontSize * 0.5) > maxWidth && line !== '') {
        if (y < margin + lineHeight) { currentPage = pdfDoc.addPage([595, 842]); y = height - margin; }
        currentPage.drawText(line, { x: margin, y, size: fontSize, color: rgb(0, 0, 0) });
        line = word; y -= lineHeight;
      } else { line = testLine; }
    }
    if (line) currentPage.drawText(line, { x: margin, y, size: fontSize, color: rgb(0, 0, 0) });
    const pdfBytes = await pdfDoc.save();
    return URL.createObjectURL(new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }));
  };

  const convertImageToPdfBasic = async (imageFile: File) => {
    const arrayBuffer = await imageFile.arrayBuffer();
    const pdfDoc = await PDFDocument.create();
    let image;
    if (imageFile.type === 'image/png') image = await pdfDoc.embedPng(arrayBuffer);
    else if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') image = await pdfDoc.embedJpg(arrayBuffer);
    else throw new Error('Unsupported image format. Please use PNG or JPEG.');
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    const pdfBytes = await pdfDoc.save();
    return URL.createObjectURL(new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }));
  };

  const handleConvert = async () => {
    if (!file) { toast({ title: "Please upload a file first", variant: "destructive" }); return; }
    setIsConverting(true);
    try {
      let url = "";
      if (conversionType === "pdf-to-word") url = await convertPdfToWord(file);
      else if (conversionType === "word-to-pdf") url = await convertWordToPdfBasic(file);
      else if (conversionType === "image-to-pdf") url = await convertImageToPdfBasic(file);
      setConvertedUrl(url);
      toast({ title: "Conversion completed successfully!" });
    } catch (error) {
      toast({ title: "Conversion failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    } finally { setIsConverting(false); }
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
    <PageLayout title="PDF Converter" description="Convert between PDF, Word, and Image formats">
      <AdBanner />
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { type: "pdf-to-word", title: "PDF to Word", desc: "Convert PDF to DOCX", Icon: FileText, color: "text-primary" },
            { type: "word-to-pdf", title: "Word to PDF", desc: "Convert DOCX to PDF", Icon: FileText, color: "text-accent" },
            { type: "image-to-pdf", title: "Image to PDF", desc: "Convert JPG/PNG to PDF", Icon: Upload, color: "text-primary" },
          ].map(({ type, title, desc, Icon, color }) => (
            <Card
              key={type}
              className={`cursor-pointer border-2 transition-colors ${conversionType === type ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              onClick={() => { setConversionType(type as typeof conversionType); setFile(null); setConvertedUrl(""); }}
            >
              <CardContent className="p-6 text-center">
                <Icon className={`h-12 w-12 mx-auto mb-3 ${color}`} />
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" />Upload File</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input type="file" accept={conversionType === "pdf-to-word" ? ".pdf" : conversionType === "word-to-pdf" ? ".doc,.docx" : "image/*"} onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">{file ? file.name : "Click to upload file"}</p>
                <p className="text-sm text-muted-foreground">{conversionType === "pdf-to-word" ? "Upload PDF file" : conversionType === "word-to-pdf" ? "Upload Word file" : "Upload image file"}</p>
              </label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={!file || isConverting} className="flex-1">
                <RefreshCw className={`h-4 w-4 mr-2 ${isConverting ? "animate-spin" : ""}`} />{isConverting ? "Converting..." : "Convert"}
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={!convertedUrl} className="flex-1">
                <Download className="h-4 w-4 mr-2" />Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border mt-6">
          <CardHeader><CardTitle>Note</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This converter provides basic conversion between PDF, Word, and Image formats. For production use with complex documents, consider using specialized services.</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PdfConverter;