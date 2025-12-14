import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compounds, setCompounds] = useState("12");

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(time) || 0;
    const n = parseFloat(compounds) || 12;

    const amount = p * Math.pow(1 + (r / 100) / n, n * t);
    const interest = amount - p;

    return { principal: p, interest, amount };
  };

  const result = principal && rate && time ? calculate() : null;

  const faqs = [
    { question: "What is compound interest?", answer: "Compound interest is interest calculated on the initial principal and accumulated interest from previous periods." },
    { question: "How is compound interest calculated?", answer: "A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is rate, n is compounding frequency, and t is time." },
    { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal, while compound interest is calculated on principal plus accumulated interest." },
  ];

  return (
    <PageLayout title="Compound Interest Calculator" description="Calculate compound interest returns">
      <SEOHead
        title="Compound Interest Calculator - Calculate Returns | Utility Master"
        description="Calculate compound interest with customizable compounding frequency. Free and instant."
        keywords="compound interest calculator, interest calculator, investment calculator, compound returns"
        canonicalUrl="/compound-interest-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Compound Interest Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Principal Amount ($)</Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Annual Interest Rate (%)</Label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="Enter rate"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Time Period (Years)</Label>
                <Input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Enter years"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Compounding Frequency (per year)</Label>
              <Input
                type="number"
                value={compounds}
                onChange={(e) => setCompounds(e.target.value)}
                placeholder="12 (monthly)"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                12 = Monthly, 4 = Quarterly, 1 = Annually
              </p>
            </div>

            {result && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal Amount:</span>
                  <span className="font-semibold">${result.principal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Earned:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${result.interest.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-primary">${result.amount.toFixed(2)}</span>
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

export default CompoundInterestCalculator;

