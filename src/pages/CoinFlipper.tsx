import { useState } from "react";
import { Coins, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const CoinFlipper = () => {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<Array<"heads" | "tails">>([]);

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const flipResult: "heads" | "tails" = Math.random() < 0.5 ? "heads" : "tails";
      setResult(flipResult);
      setHistory(prev => [flipResult, ...prev].slice(0, 10) as Array<"heads" | "tails">);
      setFlipping(false);
    }, 500);
  };

  const headsCount = history.filter(h => h === "heads").length;
  const tailsCount = history.filter(h => h === "tails").length;

  const faqs = [
    { question: "How random is the coin flip?", answer: "We use JavaScript's Math.random() for pseudo-random number generation. Each flip has a 50/50 chance." },
    { question: "Can I see my flip history?", answer: "Yes, the last 10 flips are displayed with statistics showing heads and tails counts." },
    { question: "Is this truly random?", answer: "For cryptographic randomness, use a different method. This is suitable for games and casual use." },
  ];

  return (
    <PageLayout title="Coin Flipper" description="Flip a virtual coin">
      <SEOHead
        title="Coin Flipper - Flip Virtual Coin | Utility Master"
        description="Flip a virtual coin with heads or tails result. Free and instant."
        keywords="coin flipper, virtual coin, heads or tails, coin toss"
        canonicalUrl="/coin-flipper"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Coin Flipper
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-8xl mb-4 ${flipping ? "animate-spin" : ""}`}>
                {result === "heads" ? "🪙" : result === "tails" ? "🪙" : "🪙"}
              </div>
              {result && !flipping && (
                <div className="text-3xl font-bold text-primary">
                  {result.toUpperCase()}
                </div>
              )}
            </div>

            <Button onClick={flip} className="w-full" size="lg" disabled={flipping}>
              <RefreshCw className={`h-4 w-4 mr-2 ${flipping ? "animate-spin" : ""}`} />
              {flipping ? "Flipping..." : "Flip Coin"}
            </Button>

            {history.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Statistics:</div>
                <div className="flex gap-4 text-sm">
                  <div>Heads: {headsCount}</div>
                  <div>Tails: {tailsCount}</div>
                </div>
                <div className="text-sm font-medium mt-4">Recent Flips:</div>
                <div className="flex gap-2 flex-wrap">
                  {history.map((h, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs ${
                        h === "heads" ? "bg-blue-500/20 text-blue-600" : "bg-orange-500/20 text-orange-600"
                      }`}
                    >
                      {h}
                    </span>
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

export default CoinFlipper;

