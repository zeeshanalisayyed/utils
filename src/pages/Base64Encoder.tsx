import { useState } from "react";
import { Code, Copy, Check, Upload, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const Base64Encoder = () => {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
      toast({ title: "Encoded successfully!" });
    } catch (error) {
      toast({ title: "Encoding failed", variant: "destructive" });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setText(decoded);
      toast({ title: "Decoded successfully!" });
    } catch (error) {
      toast({ title: "Decoding failed", variant: "destructive" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBase64(result.split(',')[1] || result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format." },
    { question: "Can I encode images?", answer: "Yes, you can upload images and they will be converted to Base64 format." },
    { question: "Is my data secure?", answer: "Yes, all encoding/decoding happens in your browser. Your data never leaves your device." },
  ];

  return (
    <PageLayout title="Base64 Encoder/Decoder" description="Encode and decode text and images to Base64">
      <SEOHead
        title="Base64 Encoder/Decoder - Encode Decode Base64 | Utility Master"
        description="Encode text and images to Base64 or decode Base64 strings. Free, instant, and private."
        keywords="base64 encoder, base64 decoder, base64 converter, encode decode"
        canonicalUrl="/base64-encoder"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Base64 Encoder/Decoder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="encode" className="space-y-4">
              <TabsList>
                <TabsTrigger value="encode">Encode</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
                <TabsTrigger value="image">Image to Base64</TabsTrigger>
              </TabsList>

              <TabsContent value="encode" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Text to Encode</label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to encode..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button onClick={encode} className="w-full">
                  Encode to Base64
                </Button>
                {base64 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Encoded Result</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(base64)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={base64}
                      readOnly
                      className="min-h-[100px] font-mono text-sm"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="decode" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Base64 to Decode</label>
                  <Textarea
                    value={base64}
                    onChange={(e) => setBase64(e.target.value)}
                    placeholder="Enter Base64 string..."
                    className="min-h-[150px] font-mono text-sm"
                  />
                </div>
                <Button onClick={decode} className="w-full">
                  Decode from Base64
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
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Image</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </label>
                  </div>
                </div>
                {imagePreview && (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg border" />
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Base64 String</label>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(base64)}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={base64}
                      readOnly
                      className="min-h-[100px] font-mono text-xs"
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

export default Base64Encoder;

