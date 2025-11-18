import { useState, useRef } from "react";
import { FileText, Upload, Image as ImageIcon, Copy, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";

const ImageToText = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
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
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = reader.result?.toString().split(',')[1] || '';
          resolve(base64);
        };
      });
      reader.readAsDataURL(image);
      const base64 = await base64Promise;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/image-to-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!response.ok) throw new Error('Failed to extract text');
      
      const result = await response.json();
      setExtractedText(result.text);
      setIsProcessing(false);
      toast({ title: "Text extracted successfully!" });
    } catch (error) {
      setIsProcessing(false);
      toast({ 
        title: "Extraction failed", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive" 
      });
    }
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
        <AdBanner />
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

              {imagePreview && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <img src={imagePreview} alt="Uploaded" className="w-full h-auto" />
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
