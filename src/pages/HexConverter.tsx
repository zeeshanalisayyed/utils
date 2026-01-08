import { useState } from "react";
import { Hash, ArrowRightLeft, Copy, Check } from "lucide-react";
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

const HexConverter = () => {
  const [text, setText] = useState("");
  const [hex, setHex] = useState("");
  const [copied, setCopied] = useState(false);

  const textToHex = (input: string): string => {
    return input
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  };

  const hexToText = (input: string): string => {
    const cleaned = input.replace(/[^0-9a-fA-F\s]/g, "").trim();
    if (!cleaned) return "";
    
    const bytes = cleaned.split(/\s+/);
    return bytes
      .map((byte) => {
        const num = parseInt(byte, 16);
        return isNaN(num) ? "" : String.fromCharCode(num);
      })
      .join("");
  };

  const handleTextChange = (value: string) => {
    setText(value);
    setHex(textToHex(value));
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    setText(hexToText(value));
  };

  const copyToClipboard = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is hexadecimal?", answer: "Hexadecimal is a base-16 number system using digits 0-9 and letters A-F. It's commonly used in programming." },
    { question: "How is hex used in computing?", answer: "Hex is used for color codes (#FF5733), memory addresses, and representing binary data in a more readable format." },
    { question: "What's the relationship between hex and binary?", answer: "Each hex digit represents 4 binary bits. For example, F = 1111 and A = 1010 in binary." },
  ];

  return (
    <PageLayout title="Hex Converter" description="Convert text to hexadecimal and back">
      <SEOHead
        title="Hex Converter - Text to Hexadecimal & Hex to Text | Utility Master"
        description="Free online hexadecimal converter. Convert text to hex and hex to text instantly. Essential for developers."
        keywords="hex converter, text to hex, hex to text, hexadecimal converter, hex encoder"
        canonicalUrl="/hex-converter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Hex Converter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text-to-hex">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="text-to-hex">Text → Hex</TabsTrigger>
                <TabsTrigger value="hex-to-text">Hex → Text</TabsTrigger>
              </TabsList>

              <TabsContent value="text-to-hex" className="space-y-4">
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
                    <Label>Hexadecimal Output</Label>
                    {hex && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(hex)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={hex}
                    readOnly
                    placeholder="Hex output will appear here..."
                    className="mt-2 min-h-[100px] font-mono text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="hex-to-text" className="space-y-4">
                <div>
                  <Label>Hexadecimal Input</Label>
                  <Textarea
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="Enter hex code (e.g., 48 65 6c 6c 6f)..."
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

export default HexConverter;
