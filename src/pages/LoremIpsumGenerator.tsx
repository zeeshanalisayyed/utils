import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsumGenerator = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState("paragraphs");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generate = () => {
    const words = loremText.split(" ");
    let result = "";

    if (type === "words") {
      result = words.slice(0, count).join(" ");
    } else if (type === "sentences") {
      const sentences = loremText.split(". ").filter(s => s.trim());
      result = sentences.slice(0, count).join(". ") + ".";
    } else if (type === "paragraphs") {
      for (let i = 0; i < count; i++) {
        result += loremText + "\n\n";
      }
      result = result.trim();
    }

    setGenerated(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is placeholder text commonly used in design and publishing to demonstrate the visual form of a document." },
    { question: "What formats can I generate?", answer: "You can generate Lorem Ipsum text by words, sentences, or paragraphs." },
    { question: "Is this text random?", answer: "The text follows the standard Lorem Ipsum format, which is consistent placeholder text used in the design industry." },
  ];

  return (
    <PageLayout title="Lorem Ipsum Generator" description="Generate placeholder text for your designs">
      <SEOHead
        title="Lorem Ipsum Generator - Generate Placeholder Text | Utility Master"
        description="Generate Lorem Ipsum placeholder text by words, sentences, or paragraphs. Free and instant."
        keywords="lorem ipsum, placeholder text, dummy text generator, lorem ipsum generator"
        canonicalUrl="/lorem-ipsum-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Lorem Ipsum Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                  min={1}
                  max={1000}
                />
              </div>
            </div>

            <Button onClick={generate} className="w-full">
              Generate Lorem Ipsum
            </Button>

            {generated && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Text</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Textarea
                  value={generated}
                  readOnly
                  className="min-h-[200px] font-serif"
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

export default LoremIpsumGenerator;

