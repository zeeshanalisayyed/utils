import { useState } from "react";
import {Hash, Copy, Check, RefreshCw} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const UuidGenerator = () => {
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState("v4");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateUUID = () => {
    if (version === "v4") {
      return crypto.randomUUID();
    }
    // For other versions, we'll use v4 as fallback
    return crypto.randomUUID();
  };

  const generate = () => {
    const generated: string[] = [];
    for (let i = 0; i < count; i++) {
      generated.push(generateUUID());
    }
    setUuids(generated);
    toast({ title: `Generated ${count} UUID(s)` });
  };

  const copyToClipboard = async (uuid?: string) => {
    const text = uuid || uuids.join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is a UUID?", answer: "UUID (Universally Unique Identifier) is a 128-bit identifier used to uniquely identify information in computer systems." },
    { question: "What UUID versions are supported?", answer: "Currently, we support UUID v4 (random). Other versions may be added in the future." },
    { question: "Are UUIDs truly unique?", answer: "UUID v4 uses random numbers, making collisions extremely unlikely. The probability is negligible for practical purposes." },
  ];

  return (
    <PageLayout title="UUID Generator" description="Generate unique identifiers">
      <SEOHead
        title="UUID Generator - Generate Unique IDs | Utility Master"
        description="Generate UUIDs (Universally Unique Identifiers) instantly. Free and private."
        keywords="uuid generator, unique identifier, guid generator, random uuid"
        canonicalUrl="/uuid-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              UUID Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Version</Label>
                <Select value={version} onValueChange={setVersion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v4">Version 4 (Random)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={100}
                />
              </div>
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate UUIDs
            </Button>

            {uuids.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated UUIDs</Label>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard()}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="border rounded-lg p-4 space-y-2 max-h-[400px] overflow-y-auto">
                  {uuids.map((uuid, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <code className="text-sm font-mono">{uuid}</code>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(uuid)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
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

export default UuidGenerator;

