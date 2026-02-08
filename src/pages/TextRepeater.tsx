import { useState } from "react";
import { Repeat, Copy, Check } from "lucide-react";
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

const TextRepeater = () => {
  const [text, setText] = useState("");
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState("\\n");
  const [addNumbers, setAddNumbers] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const repeatText = () => {
    if (!text.trim()) {
      toast({ title: "Please enter some text", variant: "destructive" });
      return;
    }

    const actualSeparator = separator
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\s/g, " ");

    const repeated = Array(count)
      .fill(text)
      .map((t, i) => (addNumbers ? `${i + 1}. ${t}` : t))
      .join(actualSeparator);

    setResult(repeated);
    toast({ title: `Text repeated ${count} times!` });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is text repeater used for?", answer: "Text repeaters are useful for testing, creating placeholder content, generating repetitive data, or social media posts." },
    { question: "What separators can I use?", answer: "Use \\n for new line, \\t for tab, or any custom text like comma, space, or dash." },
    { question: "Is there a limit to repetitions?", answer: "We limit to 1000 repetitions to prevent browser performance issues." },
  ];

  return (
    <PageLayout title="Text Repeater" description="Repeat text multiple times with custom separators">
      <SEOHead
        title="Text Repeater - Repeat Text Online | Utility Master"
        description="Free online text repeater tool. Repeat any text multiple times with custom separators, numbering, and formatting options."
        keywords="text repeater, repeat text, duplicate text, text multiplier, copy paste generator"
        canonicalUrl="https://utils.lovable.app/text-repeater"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              Text Repeater
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Text to Repeat</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[100px] mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Repeat Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={1000}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Separator</Label>
                <Input
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  placeholder="\n (new line)"
                  className="mt-2"
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-2">
                  <Switch
                    id="addNumbers"
                    checked={addNumbers}
                    onCheckedChange={setAddNumbers}
                  />
                  <Label htmlFor="addNumbers">Add Numbers</Label>
                </div>
              </div>
            </div>

            <Button onClick={repeatText} className="w-full">
              <Repeat className="h-4 w-4 mr-2" />
              Repeat Text
            </Button>

            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Result ({result.length} characters)</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Textarea
                  value={result}
                  readOnly
                  className="min-h-[200px] font-mono"
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

export default TextRepeater;
