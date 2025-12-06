import { useState } from "react";
import { FolderOpen, Upload, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const ScreenshotOrganizer = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [organized, setOrganized] = useState<Array<{ file: File; category: string; description: string }>>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      toast({ title: `${newFiles.length} files uploaded` });
    }
  };

  const handleOrganize = async () => {
    if (files.length === 0) {
      toast({ title: "Please upload screenshots first", variant: "destructive" });
      return;
    }

    setIsOrganizing(true);
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const reader = new FileReader();
          const base64Promise = new Promise<string>((resolve) => {
            reader.onload = () => {
              const base64 = reader.result?.toString().split(',')[1] || '';
              resolve(base64);
            };
          });
          reader.readAsDataURL(file);
          const base64 = await base64Promise;

          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-screenshot`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify({ imageBase64: base64 }),
          });

          if (!response.ok) throw new Error('Failed to analyze screenshot');
          
          const result = await response.json();
          return { file, category: result.category, description: result.description };
        })
      );

      setOrganized(results);
      setIsOrganizing(false);
      toast({ title: "Screenshots organized successfully!" });
    } catch (error) {
      setIsOrganizing(false);
      toast({ 
        title: "Organization failed", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive" 
      });
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

  const faqItems = [
    { question: "How does the AI categorize screenshots?", answer: "Our AI analyzes visual elements, logos, and UI patterns to identify which app or platform the screenshot belongs to." },
    { question: "What categories are supported?", answer: "Currently, we support Facebook, Instagram, WhatsApp, Twitter/X, LinkedIn, and a general 'Other' category." },
    { question: "Is my data private?", answer: "Yes, screenshots are processed securely and not stored on our servers after analysis." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Screenshot Organizer - Utility Master",
    "applicationCategory": "UtilitiesApplication",
    "description": "Automatically categorize your screenshots using AI. Organize screenshots by social media platform.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="Screenshot Organizer"
      description="Automatically categorize your screenshots"
    >
      <SEOHead
        title="Screenshot Organizer - AI Screenshot Categorizer | Utility Master"
        description="Automatically categorize your screenshots using AI. Organize screenshots by social media platform - Facebook, Instagram, WhatsApp, and more."
        keywords="screenshot organizer, categorize screenshots, AI screenshot, organize images, screenshot manager"
        canonicalUrl="https://utilitymaster.app/screenshot-organizer"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="max-w-6xl mx-auto space-y-6">
        <Alert className="border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Advanced categorization requires image analysis. Upload interface ready for backend integration.
          </AlertDescription>
        </Alert>

        <Card className="border-border">
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
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">{files.length} file(s) uploaded</p>
                <Button onClick={handleOrganize} disabled={isOrganizing} className="w-full">
                  {isOrganizing ? "Organizing..." : "Organize Screenshots"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {organized.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Organized Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {organized.map((item, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium">{item.file.name}</p>
                    <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default ScreenshotOrganizer;