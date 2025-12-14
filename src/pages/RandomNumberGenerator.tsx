import { useState } from "react";
import {Dice6, RefreshCw, Copy, Check} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generate = () => {
    const generated: number[] = [];
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      generated.push(num);
    }
    setNumbers(generated);
    toast({ title: `Generated ${count} number(s)` });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(numbers.join(", "));
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "How random are these numbers?", answer: "We use JavaScript's Math.random() which generates pseudo-random numbers. For cryptographic security, use a different tool." },
    { question: "Can I generate multiple numbers?", answer: "Yes, you can generate up to 100 numbers at once. They will be displayed in a list." },
    { question: "What's the range limit?", answer: "You can set any range from negative to positive numbers. Very large ranges may take longer to process." },
  ];

  return (
    <PageLayout title="Random Number Generator" description="Generate random numbers within a range">
      <SEOHead
        title="Random Number Generator - Generate Random Numbers | Utility Master"
        description="Generate random numbers within a specified range. Free and instant."
        keywords="random number generator, random number, number generator, random integer"
        canonicalUrl="/random-number-generator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dice6 className="h-5 w-5" />
              Random Number Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Minimum</Label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Maximum</Label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={100}
                  className="mt-2"
                />
              </div>
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Random Numbers
            </Button>

            {numbers.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Generated Numbers</Label>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <div className="flex flex-wrap gap-2">
                    {numbers.map((num, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 rounded text-sm font-mono">
                        {num}
                      </span>
                    ))}
                  </div>
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

export default RandomNumberGenerator;

