import { useState, useRef } from "react";
import { FileText, Upload, Image as ImageIcon, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

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

  const faqItems = [
    { question: "What image formats are supported?", answer: "We support JPG, PNG, GIF, BMP, and WebP image formats for text extraction." },
    { question: "How accurate is the text extraction?", answer: "Our OCR technology provides high accuracy for printed text. Handwritten text may have lower accuracy depending on clarity." },
    { question: "Is there a file size limit?", answer: "For best results, keep images under 10MB. Larger files may take longer to process." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Image to Text - Utility Master",
    "applicationCategory": "UtilitiesApplication",
    "description": "Extract text from images using advanced OCR technology. Free online image to text converter.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="Image to Text"
      description="Extract text from images using OCR"
    >
      <SEOHead
        title="Image to Text - OCR Text Extractor | Utility Master"
        description="Extract text from images using advanced OCR technology. Free online image to text converter - no sign up required."
        keywords="image to text, OCR, text extractor, photo to text, image scanner"
        canonicalUrl="https://utilitymaster.app/image-to-text"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="max-w-4xl mx-auto space-y-6">
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

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default ImageToText;