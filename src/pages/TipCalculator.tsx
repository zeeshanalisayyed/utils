import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState([15]);
  const [people, setPeople] = useState([1]);

  const calculate = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = (bill * tipPercent[0]) / 100;
    const total = bill + tip;
    const perPerson = total / people[0];
    const tipPerPerson = tip / people[0];

    return { bill, tip, total, perPerson, tipPerPerson };
  };

  const result = billAmount ? calculate() : null;

  const faqs = [
    { question: "How do I calculate the tip?", answer: "Enter your bill amount, adjust the tip percentage, and specify how many people are splitting the bill." },
    { question: "What's a standard tip percentage?", answer: "Common tip percentages are 15-20% for good service. Adjust based on your experience." },
    { question: "Can I split the bill?", answer: "Yes, enter the number of people and the calculator will show the amount per person." },
  ];

  return (
    <PageLayout title="Tip Calculator" description="Calculate tips and split bills">
      <SEOHead
        title="Tip Calculator - Calculate Tips & Split Bills | Utility Master"
        description="Calculate tips and split bills among multiple people. Free and instant."
        keywords="tip calculator, bill splitter, gratuity calculator, split bill"
        canonicalUrl="/tip-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tip Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Bill Amount ($)</Label>
              <Input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount"
                className="mt-2"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Tip Percentage</Label>
                <span className="text-sm font-medium">{tipPercent[0]}%</span>
              </div>
              <Slider
                value={tipPercent}
                onValueChange={setTipPercent}
                min={0}
                max={30}
                step={1}
              />
              <div className="flex gap-2 mt-2">
                {[10, 15, 18, 20, 25].map((p) => (
                  <button
                    key={p}
                    onClick={() => setTipPercent([p])}
                    className={`px-3 py-1 rounded text-sm ${
                      tipPercent[0] === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Number of People</Label>
                <span className="text-sm font-medium">{people[0]}</span>
              </div>
              <Slider
                value={people}
                onValueChange={setPeople}
                min={1}
                max={20}
                step={1}
              />
            </div>

            {result && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bill Amount:</span>
                  <span className="font-semibold">${result.bill.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tip ({tipPercent[0]}%):</span>
                  <span className="font-semibold">${result.tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">${result.total.toFixed(2)}</span>
                </div>
                {people[0] > 1 && (
                  <>
                    <div className="pt-2 border-t space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Per Person:</span>
                        <span className="font-semibold">${result.perPerson.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tip per Person:</span>
                        <span>${result.tipPerPerson.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default TipCalculator;

