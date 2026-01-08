import { useState } from "react";
import { Binary, ArrowRightLeft, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { toast } from "sonner";

const BinaryConverter = () => {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [copied, setCopied] = useState(false);

  const textToBinary = (input: string): string => {
    return input
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  };

  const binaryToText = (input: string): string => {
    const cleaned = input.replace(/[^01\s]/g, "").trim();
    if (!cleaned) return "";
    
    const bytes = cleaned.split(/\s+/);
    return bytes
      .map((byte) => {
        const num = parseInt(byte, 2);
        return isNaN(num) ? "" : String.fromCharCode(num);
      })
      .join("");
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setBinary(textToBinary(value));
  };

  const handleBinaryChange = (value: string) => {
    setBinary(value);
    setText(binaryToText(value));
  };

  const copyToClipboard = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is binary?", answer: "Binary is a base-2 number system using only 0s and 1s. It's the fundamental language of computers." },
    { question: "How does text to binary work?", answer: "Each character is converted to its ASCII code, then that number is converted to binary (base-2)." },
    { question: "Why 8 bits per character?", answer: "Standard ASCII uses 8 bits (1 byte) per character, allowing representation of 256 different characters." },
  ];

  return (
    <PageLayout title="Binary Converter" description="Convert text to binary and back">
      <SEOHead
        title="Binary Converter - Text to Binary & Binary to Text | Utility Master"
        description="Free online binary converter. Convert text to binary code and binary to text instantly. Perfect for programmers and students."
        keywords="binary converter, text to binary, binary to text, ASCII converter, binary translator"
        canonicalUrl="/binary-converter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Binary className="h-5 w-5" />
              Binary Converter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text-to-binary">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="text-to-binary">Text → Binary</TabsTrigger>
                <TabsTrigger value="binary-to-text">Binary → Text</TabsTrigger>
              </TabsList>

              <TabsContent value="text-to-binary" className="space-y-4">
                <div>
                  <Label>Text Input</Label>
                  <Textarea
                    value={text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Enter text to convert..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="flex justify-center">
                  <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label>Binary Output</Label>
                    {binary && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(binary)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={binary}
                    readOnly
                    placeholder="Binary output will appear here..."
                    className="mt-2 min-h-[100px] font-mono text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="binary-to-text" className="space-y-4">
                <div>
                  <Label>Binary Input</Label>
                  <Textarea
                    value={binary}
                    onChange={(e) => handleBinaryChange(e.target.value)}
                    placeholder="Enter binary code (e.g., 01001000 01101001)..."
                    className="mt-2 min-h-[100px] font-mono text-sm"
                  />
                </div>

                <div className="flex justify-center">
                  <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label>Text Output</Label>
                    {text && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(text)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={text}
                    readOnly
                    placeholder="Text output will appear here..."
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default BinaryConverter;
