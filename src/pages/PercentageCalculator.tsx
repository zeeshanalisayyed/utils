import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const PercentageCalculator = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [increase, setIncrease] = useState("");
  const [decrease, setDecrease] = useState("");

  const calculatePercentage = () => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;
    return v1 > 0 ? ((v2 / v1) * 100) : 0;
  };

  const calculatePercentageOf = () => {
    const p = parseFloat(percentage) || 0;
    const n = parseFloat(number) || 0;
    return (p / 100) * n;
  };

  const calculateIncrease = () => {
    const num = parseFloat(increase) || 0;
    const p = parseFloat(percentage) || 0;
    return num * (1 + p / 100);
  };

  const calculateDecrease = () => {
    const num = parseFloat(decrease) || 0;
    const p = parseFloat(percentage) || 0;
    return num * (1 - p / 100);
  };

  const result1 = value1 && value2 ? calculatePercentage() : null;
  const result2 = percentage && number ? calculatePercentageOf() : null;
  const result3 = increase && percentage ? calculateIncrease() : null;
  const result4 = decrease && percentage ? calculateDecrease() : null;

  const faqs = [
    { question: "How do I calculate percentage?", answer: "Percentage = (Part / Whole) × 100. For example, 25 out of 100 is 25%." },
    { question: "How do I calculate percentage increase?", answer: "New Value = Original × (1 + Percentage/100). For example, 100 increased by 20% = 120." },
    { question: "How do I calculate percentage decrease?", answer: "New Value = Original × (1 - Percentage/100). For example, 100 decreased by 20% = 80." },
  ];

  return (
    <PageLayout title="Percentage Calculator" description="Calculate percentages, increases, and decreases">
      <SEOHead
        title="Percentage Calculator - Calculate Percentages | Utility Master"
        description="Calculate percentages, percentage of numbers, increases, and decreases. Free and instant."
        keywords="percentage calculator, percent calculator, percentage increase, percentage decrease"
        canonicalUrl="/percentage-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Percentage Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="percentage" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="percentage">% of</TabsTrigger>
                <TabsTrigger value="what-percent">What %</TabsTrigger>
                <TabsTrigger value="increase">Increase</TabsTrigger>
                <TabsTrigger value="decrease">Decrease</TabsTrigger>
              </TabsList>

              <TabsContent value="percentage" className="space-y-4">
                <div>
                  <Label>What is</Label>
                  <Input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="Enter percentage"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>% of</Label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
                {result2 !== null && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {percentage}% of {number} = {result2.toFixed(2)}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="what-percent" className="space-y-4">
                <div>
                  <Label>What percentage is</Label>
                  <Input
                    type="number"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    placeholder="Enter value"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>of</Label>
                  <Input
                    type="number"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                    placeholder="Enter total"
                    className="mt-2"
                  />
                </div>
                {result1 !== null && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {value2} is {result1.toFixed(2)}% of {value1}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="increase" className="space-y-4">
                <div>
                  <Label>Increase</Label>
                  <Input
                    type="number"
                    value={increase}
                    onChange={(e) => setIncrease(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>by</Label>
                  <Input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="Enter percentage"
                    className="mt-2"
                  />
                </div>
                {result3 !== null && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {increase} increased by {percentage}% = {result3.toFixed(2)}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="decrease" className="space-y-4">
                <div>
                  <Label>Decrease</Label>
                  <Input
                    type="number"
                    value={decrease}
                    onChange={(e) => setDecrease(e.target.value)}
                    placeholder="Enter number"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>by</Label>
                  <Input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    placeholder="Enter percentage"
                    className="mt-2"
                  />
                </div>
                {result4 !== null && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {decrease} decreased by {percentage}% = {result4.toFixed(2)}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default PercentageCalculator;

