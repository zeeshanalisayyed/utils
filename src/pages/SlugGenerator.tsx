import { useState } from "react";
import { Link2, Copy, Check, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const SlugGenerator = () => {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [options, setOptions] = useState({
    lowercase: true,
    removeNumbers: false,
    maxLength: 0,
    separator: "-"
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateSlug = () => {
    if (!input.trim()) {
      setSlug("");
      return;
    }

    let result = input.trim();
    
    // Convert to lowercase if option is enabled
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Remove special characters and replace spaces with separator
    result = result
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, options.separator) // Replace spaces
      .replace(new RegExp(`${options.separator}+`, 'g'), options.separator) // Remove duplicate separators
      .replace(new RegExp(`^${options.separator}|${options.separator}$`, 'g'), ""); // Trim separators

    // Remove numbers if option is enabled
    if (options.removeNumbers) {
      result = result.replace(/[0-9]/g, "").replace(new RegExp(`${options.separator}+`, 'g'), options.separator);
    }

    // Apply max length
    if (options.maxLength > 0 && result.length > options.maxLength) {
      result = result.substring(0, options.maxLength).replace(new RegExp(`${options.separator}$`), "");
    }

    setSlug(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is a URL slug?", answer: "A slug is the URL-friendly version of a title, used in web addresses. It contains only lowercase letters, numbers, and hyphens." },
    { question: "Why are slugs important for SEO?", answer: "Clean, descriptive slugs help search engines understand page content and improve click-through rates from search results." },
    { question: "What characters are allowed in slugs?", answer: "Typically only lowercase letters (a-z), numbers (0-9), and hyphens (-) are used in URL slugs." },
  ];

  return (
    <PageLayout title="Slug Generator" description="Convert text to URL-friendly slugs">
      <SEOHead
        title="Slug Generator - Create URL-Friendly Slugs | Utility Master"
        description="Convert titles and text into clean, SEO-friendly URL slugs. Free online slug generator with customization options."
        keywords="slug generator, url slug, seo url, permalink generator, url converter"
        canonicalUrl="https://utils.lovable.app/slug-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Slug Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Input Text</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your title or text here..."
                className="min-h-[100px] mt-2"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                />
                <Label htmlFor="lowercase">Lowercase</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="removeNumbers"
                  checked={options.removeNumbers}
                  onCheckedChange={(checked) => setOptions({ ...options, removeNumbers: checked })}
                />
                <Label htmlFor="removeNumbers">No Numbers</Label>
              </div>
              <div>
                <Label>Separator</Label>
                <Input
                  value={options.separator}
                  onChange={(e) => setOptions({ ...options, separator: e.target.value || "-" })}
                  maxLength={1}
                  className="w-16 mt-1"
                />
              </div>
              <div>
                <Label>Max Length</Label>
                <Input
                  type="number"
                  value={options.maxLength || ""}
                  onChange={(e) => setOptions({ ...options, maxLength: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-20 mt-1"
                />
              </div>
            </div>

            <Button onClick={generateSlug} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Slug
            </Button>

            {slug && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Slug</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="p-4 border rounded-lg bg-muted/50 font-mono text-sm break-all">
                  {slug}
                </div>
                <p className="text-sm text-muted-foreground">
                  Length: {slug.length} characters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default SlugGenerator;
