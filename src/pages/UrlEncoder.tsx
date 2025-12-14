import { useState } from "react";
import { Link, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const UrlEncoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encode = () => {
    try {
      const result = encodeURIComponent(text);
      setEncoded(result);
      toast({ title: "Encoded successfully!" });
    } catch (error) {
      toast({ title: "Encoding failed", variant: "destructive" });
    }
  };

  const decode = () => {
    try {
      const result = decodeURIComponent(encoded);
      setText(result);
      toast({ title: "Decoded successfully!" });
    } catch (error) {
      toast({ title: "Decoding failed", variant: "destructive" });
    }
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is URL encoding?", answer: "URL encoding converts characters into a format that can be transmitted over the internet, replacing special characters with percent-encoded values." },
    { question: "When should I use URL encoding?", answer: "Use URL encoding when including special characters, spaces, or non-ASCII characters in URLs or query parameters." },
    { question: "Is my data secure?", answer: "Yes, all encoding/decoding happens in your browser. Your data never leaves your device." },
  ];

  return (
    <PageLayout title="URL Encoder/Decoder" description="Encode and decode URLs safely">
      <SEOHead
        title="URL Encoder/Decoder - Encode Decode URLs | Utility Master"
        description="Encode and decode URLs and URL components. Free, instant, and private."
        keywords="url encoder, url decoder, url encode, percent encoding"
        canonicalUrl="/url-encoder"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              URL Encoder/Decoder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="encode" className="space-y-4">
              <TabsList>
                <TabsTrigger value="encode">Encode</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">URL to Encode</label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL or text to encode..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button onClick={encode} className="w-full">
                  Encode URL
                </Button>
                {encoded && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Encoded Result</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(encoded)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={encoded}
                      readOnly
                      className="min-h-[100px] font-mono text-sm break-all"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="decode" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Encoded URL to Decode</label>
                  <Textarea
                    value={encoded}
                    onChange={(e) => setEncoded(e.target.value)}
                    placeholder="Enter encoded URL..."
                    className="min-h-[150px] font-mono text-sm"
                  />
                </div>
                <Button onClick={decode} className="w-full">
                  Decode URL
                </Button>
                {text && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Decoded Result</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(text)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={text}
                      readOnly
                      className="min-h-[100px] break-all"
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default UrlEncoder;

