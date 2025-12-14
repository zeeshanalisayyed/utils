import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const TextCaseConverter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const convertCase = (type: string) => {
    if (!text) return "";
    switch (type) {
      case "uppercase": return text.toUpperCase();
      case "lowercase": return text.toLowerCase();
      case "title": return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      case "sentence": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      case "camel": return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, "");
      case "pascal": return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, "");
      case "snake": return text.toLowerCase().replace(/\s+/g, "_");
      case "kebab": return text.toLowerCase().replace(/\s+/g, "-");
      case "constant": return text.toUpperCase().replace(/\s+/g, "_");
      default: return text;
    }
  };

  const copyToClipboard = async (converted: string) => {
    await navigator.clipboard.writeText(converted);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const cases = [
    { id: "uppercase", label: "UPPERCASE", desc: "ALL CAPS" },
    { id: "lowercase", label: "lowercase", desc: "all small" },
    { id: "title", label: "Title Case", desc: "First Letter Capital" },
    { id: "sentence", label: "Sentence case", desc: "First word capital" },
    { id: "camel", label: "camelCase", desc: "firstWordLower" },
    { id: "pascal", label: "PascalCase", desc: "FirstWordUpper" },
    { id: "snake", label: "snake_case", desc: "words_with_underscores" },
    { id: "kebab", label: "kebab-case", desc: "words-with-dashes" },
    { id: "constant", label: "CONSTANT_CASE", desc: "WORDS_WITH_UNDERSCORES" },
  ];

  const faqs = [
    { question: "What text case formats are supported?", answer: "We support uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE." },
    { question: "Is my text stored anywhere?", answer: "No, all conversion happens in your browser. Your text never leaves your device." },
    { question: "Can I convert large amounts of text?", answer: "Yes, the converter works with any amount of text. However, very large texts may take a moment to process." },
  ];

  return (
    <PageLayout title="Text Case Converter" description="Convert text between different case formats instantly">
      <SEOHead
        title="Text Case Converter - Convert Text Formats | Utility Master"
        description="Convert text between uppercase, lowercase, camelCase, snake_case, and more. Free, instant, and private."
        keywords="text case converter, uppercase, lowercase, camelCase, text formatter"
        canonicalUrl="/text-case-converter"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Convert Text Case
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter your text</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="min-h-[150px]"
              />
            </div>

            {text && (
              <div className="space-y-4">
                <h3 className="font-semibold">Converted Text:</h3>
                <div className="grid gap-4">
                  {cases.map((caseType) => {
                    const converted = convertCase(caseType.id);
                    return (
                      <div key={caseType.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{caseType.label}</div>
                            <div className="text-sm text-muted-foreground">{caseType.desc}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(converted)}
                          >
                            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="p-3 bg-muted/50 rounded font-mono text-sm break-all">
                          {converted}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default TextCaseConverter;

