import { useState } from "react";
import {Dice6, RefreshCw} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const DiceRoller = () => {
  const [sides, setSides] = useState("6");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);

  const roll = () => {
    const numSides = parseInt(sides);
    const numCount = parseInt(count);
    const rolls: number[] = [];
    let sum = 0;

    for (let i = 0; i < numCount; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      rolls.push(roll);
      sum += roll;
    }

    setResults(rolls);
    setTotal(sum);
  };

  const faqs = [
    { question: "How many dice can I roll?", answer: "You can roll up to 10 dice at once. The total will be calculated automatically." },
    { question: "What dice types are supported?", answer: "You can choose from 4, 6, 8, 10, 12, or 20-sided dice, or enter a custom number of sides." },
    { question: "Are the rolls truly random?", answer: "We use JavaScript's Math.random() for pseudo-random number generation. For cryptographic randomness, use a different method." },
  ];

  return (
    <PageLayout title="Dice Roller" description="Roll virtual dice">
      <SEOHead
        title="Dice Roller - Roll Virtual Dice | Utility Master"
        description="Roll virtual dice with customizable sides and count. Free and instant."
        keywords="dice roller, virtual dice, random dice, dice simulator"
        canonicalUrl="/dice-roller"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dice6 className="h-5 w-5" />
              Dice Roller
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of Sides</label>
                <Select value={sides} onValueChange={setSides}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4-sided (D4)</SelectItem>
                    <SelectItem value="6">6-sided (D6)</SelectItem>
                    <SelectItem value="8">8-sided (D8)</SelectItem>
                    <SelectItem value="10">10-sided (D10)</SelectItem>
                    <SelectItem value="12">12-sided (D12)</SelectItem>
                    <SelectItem value="20">20-sided (D20)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Number of Dice</label>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} dice
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={roll} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Roll Dice
            </Button>

            {results.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {results.map((r, i) => (
                      <span key={i} className="mx-1">
                        {r}
                      </span>
                    ))}
                  </div>
                  {parseInt(count) > 1 && (
                    <div className="text-muted-foreground">
                      Total: {total}
                    </div>
                  )}
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

export default DiceRoller;

