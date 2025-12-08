import { useState, useMemo } from "react";
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  const result = useMemo(() => {
    const months = tenureType === "years" ? tenure * 12 : tenure;
    const monthlyRate = interestRate / 12 / 100;

    if (monthlyRate === 0) {
      const emi = principal / months;
      return {
        emi: Math.round(emi),
        totalPayment: Math.round(principal),
        totalInterest: 0,
        months,
      };
    }

    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      months,
    };
  }, [principal, interestRate, tenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const principalPercentage = (principal / result.totalPayment) * 100;
  const interestPercentage = (result.totalInterest / result.totalPayment) * 100;

  const faqs = [
    { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months." },
    { question: "What affects my EMI amount?", answer: "Three factors determine your EMI: loan amount (principal), interest rate, and loan tenure. Higher amounts or rates increase EMI; longer tenure decreases it but increases total interest." },
    { question: "Should I choose a longer tenure?", answer: "Longer tenure means lower EMI but more total interest paid. Choose based on your monthly budget and total cost preference." },
  ];

  return (
    <PageLayout title="Loan EMI Calculator" description="Calculate your loan EMI and total interest">
      <SEOHead
        title="Loan EMI Calculator - Home, Car, Personal Loan | Utility Master"
        description="Calculate EMI for home loans, car loans, and personal loans. See total interest and payment breakdown instantly."
        keywords="emi calculator, loan calculator, home loan emi, car loan calculator, personal loan emi"
        canonicalUrl="/loan-calculator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Loan Amount</Label>
                  <span className="text-sm font-medium">{formatCurrency(principal)}</span>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={(v) => setPrincipal(v[0])}
                  min={100000}
                  max={50000000}
                  step={50000}
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Interest Rate (% per annum)</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(v) => setInterestRate(v[0])}
                  min={1}
                  max={25}
                  step={0.1}
                />
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step="0.1"
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Loan Tenure</Label>
                  <span className="text-sm font-medium">
                    {tenure} {tenureType}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <Button
                    variant={tenureType === "years" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTenureType("years")}
                  >
                    Years
                  </Button>
                  <Button
                    variant={tenureType === "months" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTenureType("months")}
                  >
                    Months
                  </Button>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(v) => setTenure(v[0])}
                  min={1}
                  max={tenureType === "years" ? 30 : 360}
                  step={1}
                />
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Monthly EMI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {formatCurrency(result.emi)}
                </div>
                <p className="text-muted-foreground">
                  for {result.months} months ({Math.floor(result.months / 12)} years {result.months % 12} months)
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="font-semibold">{formatCurrency(principal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="font-medium">Total Payment</span>
                    <span className="font-bold text-lg">{formatCurrency(result.totalPayment)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-4 rounded-full overflow-hidden bg-muted flex">
                    <div
                      className="bg-primary h-full"
                      style={{ width: `${principalPercentage}%` }}
                    />
                    <div
                      className="bg-destructive h-full"
                      style={{ width: `${interestPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span>Principal ({principalPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-destructive" />
                      <span>Interest ({interestPercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <FAQ items={faqs} />
        </div>
      </div>
    </PageLayout>
  );
};

export default LoanCalculator;
