import { useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AdBanner } from "@/components/AdBanner";

const IncomeTax = () => {
  const [income, setIncome] = useState("1000000");
  const [regime, setRegime] = useState<"old" | "new">("new");

  const calculateTax = () => {
    const annualIncome = parseFloat(income);
    if (isNaN(annualIncome) || annualIncome <= 0) {
      return { tax: 0, cess: 0, totalTax: 0, netIncome: 0 };
    }

    let tax = 0;

    if (regime === "new") {
      // New Tax Regime (FY 2023-24)
      if (annualIncome <= 300000) tax = 0;
      else if (annualIncome <= 600000) tax = (annualIncome - 300000) * 0.05;
      else if (annualIncome <= 900000) tax = 15000 + (annualIncome - 600000) * 0.1;
      else if (annualIncome <= 1200000) tax = 45000 + (annualIncome - 900000) * 0.15;
      else if (annualIncome <= 1500000) tax = 90000 + (annualIncome - 1200000) * 0.2;
      else tax = 150000 + (annualIncome - 1500000) * 0.3;
    } else {
      // Old Tax Regime
      if (annualIncome <= 250000) tax = 0;
      else if (annualIncome <= 500000) tax = (annualIncome - 250000) * 0.05;
      else if (annualIncome <= 1000000) tax = 12500 + (annualIncome - 500000) * 0.2;
      else tax = 112500 + (annualIncome - 1000000) * 0.3;
    }

    const cess = tax * 0.04; // 4% Health and Education Cess
    const totalTax = tax + cess;
    const netIncome = annualIncome - totalTax;

    return {
      tax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
    };
  };

  const results = calculateTax();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-primary-glow flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Income Tax Calculator</h1>
              <p className="text-xs text-muted-foreground">Calculate your tax liability (India)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AdBanner />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Income Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="income" className="text-sm font-medium text-foreground">
                  Annual Income (₹)
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="mt-2"
                  placeholder="1000000"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  Tax Regime
                </Label>
                <RadioGroup value={regime} onValueChange={(value) => setRegime(value as "old" | "new")}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="flex-1 cursor-pointer font-normal">
                      New Tax Regime
                      <span className="block text-xs text-muted-foreground mt-1">
                        Lower rates, no deductions
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors mt-2">
                    <RadioGroupItem value="old" id="old" />
                    <Label htmlFor="old" className="flex-1 cursor-pointer font-normal">
                      Old Tax Regime
                      <span className="block text-xs text-muted-foreground mt-1">
                        Higher rates, with deductions
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          {/* Results Card */}
          <Card className="p-6 border-border bg-gradient-to-br from-accent/5 to-primary/5">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Tax Breakdown</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Income Tax</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(results.tax)}</p>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Health & Education Cess (4%)</p>
                <p className="text-xl font-bold text-foreground">{formatCurrency(results.cess)}</p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/90 to-destructive">
                <p className="text-sm text-destructive-foreground/80 mb-1">Total Tax Payable</p>
                <p className="text-3xl font-bold text-destructive-foreground">
                  {formatCurrency(results.totalTax)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                <p className="text-sm text-primary-foreground/80 mb-1">Net Income</p>
                <p className="text-3xl font-bold text-primary-foreground">
                  {formatCurrency(results.netIncome)}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground">
                Note: This is a simplified calculation. Actual tax may vary based on deductions,
                exemptions, and other factors. Consult a tax professional for accurate assessment.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IncomeTax;
