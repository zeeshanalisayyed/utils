import { useState } from "react";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const IncomeTax = () => {
  const [income, setIncome] = useState("1000000");
  const [regime, setRegime] = useState<"old" | "new">("new");

  const faqItems = [
    {
      question: "What is the difference between Old and New Tax Regime?",
      answer: "The New Tax Regime offers lower tax rates but removes most deductions (80C, HRA, etc.). The Old Regime has higher rates but allows various deductions. Choose based on your deductions eligibility."
    },
    {
      question: "Which tax regime is better for me?",
      answer: "If you have significant deductions (>₹2.5L in 80C, HRA, home loan), Old Regime may be better. If you have few deductions, New Regime typically offers lower tax. Use this calculator to compare both."
    },
    {
      question: "What deductions are available in Old Tax Regime?",
      answer: "Old Regime allows 80C (₹1.5L), HRA, 80D (medical insurance), home loan interest, education loan interest, and various other deductions."
    },
    {
      question: "Is this calculator updated for FY 2024-25?",
      answer: "Yes, this calculator uses the latest tax slabs for FY 2024-25. New Regime: 0-3L (0%), 3-6L (5%), 6-9L (10%), 9-12L (15%), 12-15L (20%), 15L+ (30%). Plus 4% cess."
    },
    {
      question: "Do I need to pay advance tax?",
      answer: "If your tax liability exceeds ₹10,000 after TDS, you need to pay advance tax in quarterly installments. Failure to pay may result in interest charges."
    }
  ];

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
    <>
      <SEOHead
        title="Income Tax Calculator India 2024-25 - Old vs New Regime | Utility Master"
        description="Free Income Tax Calculator for India FY 2024-25. Compare Old vs New Tax Regime, calculate your tax liability, and make informed decisions. Supports all tax slabs with 4% cess calculation."
        keywords="income tax calculator, income tax calculator India, tax calculator 2024-25, old regime vs new regime, tax calculation, income tax, Indian tax calculator"
        canonicalUrl="https://utilitymaster.lovable.app/income-tax"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Income Tax Calculator India",
          "description": "Calculate income tax for India with old and new regime comparison",
          "url": "https://utilitymaster.lovable.app/income-tax",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        }}
      />
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

        <div className="mt-8">
          <FAQ items={faqItems} />
        </div>
      </main>
    </div>
    </>
  );
};

export default IncomeTax;
