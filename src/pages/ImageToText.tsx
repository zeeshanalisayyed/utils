import { useState, useRef } from "react";
import { FileText, Upload, Image as ImageIcon, Copy, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ImageToText = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<string>("");
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        toast({ title: "Image uploaded" });
      };
      reader.readAsDataURL(file);
    } else {
      toast({ title: "Please upload a valid image file", variant: "destructive" });
    }
  };

  const extractText = async () => {
    if (!image) {
      toast({ title: "Please upload an image first", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedText(
        "This is a demo text extraction.\n\nIn a production environment, this would use an OCR API like:\n- Google Cloud Vision API\n- Azure Computer Vision\n- AWS Textract\n- Tesseract.js\n\nThe actual implementation requires backend integration."
      );
      setIsProcessing(false);
      toast({ title: "Text extracted successfully" });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Text copied to clipboard" });
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
            Image to Text
          </h1>
          <p className="text-muted-foreground">Extract text from images using OCR</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Select Image
              </Button>

              {image && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <img src={image} alt="Uploaded" className="w-full h-auto" />
                </div>
              )}

              <Button
                onClick={extractText}
                disabled={!image || isProcessing}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                {isProcessing ? "Extracting..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted Text
                </span>
                {extractedText && (
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Extracted text will appear here..."
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ImageToText;
