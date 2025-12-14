import { useState } from "react";
import { Code, Copy, Check, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const JsonFormatter = () => {
  const [json, setJson] = useState("");
  const [formatted, setFormatted] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const format = () => {
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormatted(formatted);
      toast({ title: "JSON formatted successfully!" });
    } catch (error: any) {
      toast({ title: `Invalid JSON: ${error.message}`, variant: "destructive" });
      setFormatted("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(json);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      toast({ title: "JSON minified successfully!" });
    } catch (error: any) {
      toast({ title: `Invalid JSON: ${error.message}`, variant: "destructive" });
      setFormatted("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(json);
      toast({ title: "✓ Valid JSON!" });
    } catch (error: any) {
      toast({ title: `Invalid JSON: ${error.message}`, variant: "destructive" });
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([formatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    { question: "What can I do with this tool?", answer: "You can format, minify, and validate JSON. Formatting makes JSON readable, minifying removes whitespace, and validation checks for errors." },
    { question: "Is my JSON data stored?", answer: "No, all processing happens in your browser. Your JSON never leaves your device." },
    { question: "Can I format large JSON files?", answer: "Yes, but very large files may take a moment to process. The tool works entirely in your browser." },
  ];

  return (
    <PageLayout title="JSON Formatter" description="Format, minify, and validate JSON">
      <SEOHead
        title="JSON Formatter - Format & Validate JSON | Utility Master"
        description="Format, minify, and validate JSON. Free, instant, and private."
        keywords="json formatter, json validator, json minify, json beautifier"
        canonicalUrl="/json-formatter"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              JSON Formatter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">JSON Input</label>
              <Textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={format}>Format</Button>
              <Button onClick={minify} variant="outline">Minify</Button>
              <Button onClick={validate} variant="outline">Validate</Button>
            </div>

            {formatted && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Result</label>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadJson}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={formatted}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default JsonFormatter;

