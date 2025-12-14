import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const RoiCalculator = () => {
  const [investment, setInvestment] = useState("");
  const [returnAmount, setReturnAmount] = useState("");

  const calculate = () => {
    const inv = parseFloat(investment) || 0;
    const ret = parseFloat(returnAmount) || 0;
    const profit = ret - inv;
    const roi = inv > 0 ? ((profit / inv) * 100) : 0;

    return { investment: inv, return: ret, profit, roi };
  };

  const result = investment && returnAmount ? calculate() : null;

  const faqs = [
    { question: "What is ROI?", answer: "ROI (Return on Investment) is a performance measure used to evaluate the efficiency of an investment." },
    { question: "How is ROI calculated?", answer: "ROI = ((Return - Investment) / Investment) × 100%" },
    { question: "What's a good ROI?", answer: "A good ROI varies by industry and risk level. Generally, 7-10% annual ROI is considered good for most investments." },
  ];

  return (
    <PageLayout title="ROI Calculator" description="Calculate return on investment">
      <SEOHead
        title="ROI Calculator - Calculate Return on Investment | Utility Master"
        description="Calculate ROI (Return on Investment) percentage. Free and instant."
        keywords="roi calculator, return on investment, investment calculator, roi percentage"
        canonicalUrl="/roi-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Initial Investment ($)</Label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="Enter investment amount"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Return Amount ($)</Label>
              <Input
                type="number"
                value={returnAmount}
                onChange={(e) => setReturnAmount(e.target.value)}
                placeholder="Enter return amount"
                className="mt-2"
              />
            </div>

            {result && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Investment:</span>
                  <span className="font-semibold">${result.investment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Amount:</span>
                  <span className="font-semibold">${result.return.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit/Loss:</span>
                  <span className={`font-semibold ${
                    result.profit >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    ${result.profit >= 0 ? "+" : ""}{result.profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-semibold">ROI:</span>
                  <span className={`font-bold ${
                    result.roi >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {result.roi >= 0 ? "+" : ""}{result.roi.toFixed(2)}%
                  </span>
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

export default RoiCalculator;

