import { useState } from "react";
import { Hash, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const HashGenerator = () => {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateHash = async () => {
    if (!text.trim()) {
      toast({ title: "Please enter some text", variant: "destructive" });
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
      toast({ title: "Hash generated!" });
    } catch (error) {
      toast({ title: "Hash generation failed", variant: "destructive" });
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const algorithms = [
    { value: "SHA-1", label: "SHA-1" },
    { value: "SHA-256", label: "SHA-256" },
    { value: "SHA-384", label: "SHA-384" },
    { value: "SHA-512", label: "SHA-512" },
  ];

  const faqs = [
    { question: "What is a hash?", answer: "A hash is a fixed-size string generated from input data. The same input always produces the same hash, but you cannot reverse a hash to get the original data." },
    { question: "Which hash algorithm should I use?", answer: "SHA-256 is recommended for most use cases. SHA-1 is deprecated. SHA-384 and SHA-512 provide longer hashes for enhanced security." },
    { question: "Is my data secure?", answer: "Yes, all hashing happens in your browser. Your data never leaves your device." },
  ];

  return (
    <PageLayout title="Hash Generator" description="Generate cryptographic hashes from text">
      <SEOHead
        title="Hash Generator - Generate SHA Hashes | Utility Master"
        description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text. Free and instant."
        keywords="hash generator, sha256, sha1, cryptographic hash, hash calculator"
        canonicalUrl="/hash-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Hash Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Text to Hash</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate hash..."
                className="min-h-[150px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Hash Algorithm</label>
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {algorithms.map((alg) => (
                    <SelectItem key={alg.value} value={alg.value}>
                      {alg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={generateHash} className="w-full">
              Generate Hash
            </Button>

            {hash && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Generated Hash</label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <code className="text-sm font-mono break-all">{hash}</code>
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

export default HashGenerator;

