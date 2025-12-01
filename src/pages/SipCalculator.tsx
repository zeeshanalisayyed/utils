import { useState } from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");

  const faqItems = [
    {
      question: "What is SIP and how does it work?",
      answer: "SIP (Systematic Investment Plan) is a method of investing in mutual funds where you invest a fixed amount at regular intervals (monthly, quarterly). It helps in rupee cost averaging and building wealth over time through disciplined investing."
    },
    {
      question: "How accurate is this SIP calculator?",
      answer: "This calculator provides estimated returns based on the expected rate of return you input. Actual returns depend on market conditions and fund performance. It's a planning tool to help visualize potential growth."
    },
    {
      question: "What is a good expected return rate for SIP?",
      answer: "Historical equity mutual fund returns in India average 12-15% annually. However, past performance doesn't guarantee future returns. Consider your risk appetite and investment horizon when selecting funds."
    },
    {
      question: "Can I change my SIP amount later?",
      answer: "Yes, most mutual funds allow you to increase, decrease, pause, or stop your SIP anytime. There's typically no penalty for modifying your SIP."
    },
    {
      question: "What's the ideal investment period for SIP?",
      answer: "Longer investment periods (5+ years) are generally recommended for equity SIPs to ride out market volatility. For debt funds, even 3-5 years can be effective."
    }
  ];

  const calculateReturns = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 12 / 100;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      return { totalInvestment: 0, estimatedReturns: 0, totalValue: 0 };
    }

    const M = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvestment = P * n;
    const estimatedReturns = M - totalInvestment;

    return {
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(M),
    };
  };

  const results = calculateReturns();

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
        title="SIP Calculator India - Calculate Mutual Fund Returns | Utility Master"
        description="Free SIP calculator for India. Calculate your mutual fund returns, investment growth, and wealth creation potential. Plan your SIP investments with accurate projections and compound interest calculations."
        keywords="SIP calculator, SIP calculator India, mutual fund calculator, systematic investment plan, SIP returns calculator, investment calculator, wealth creation calculator"
        canonicalUrl="https://utilitymaster.lovable.app/sip-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SIP Calculator",
          "description": "Calculate mutual fund SIP returns and plan your investments",
          "url": "https://utilitymaster.lovable.app/sip-calculator",
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
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SIP Calculator</h1>
              <p className="text-xs text-muted-foreground">Calculate your investment returns</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AdBanner />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Investment Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="monthly" className="text-sm font-medium text-foreground">
                  Monthly Investment (₹)
                </Label>
                <Input
                  id="monthly"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(e.target.value)}
                  className="mt-2"
                  placeholder="5000"
                />
              </div>

              <div>
                <Label htmlFor="return" className="text-sm font-medium text-foreground">
                  Expected Return Rate (% p.a.)
                </Label>
                <Input
                  id="return"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="mt-2"
                  placeholder="12"
                  step="0.1"
                />
              </div>

              <div>
                <Label htmlFor="period" className="text-sm font-medium text-foreground">
                  Time Period (Years)
                </Label>
                <Input
                  id="period"
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="mt-2"
                  placeholder="10"
                />
              </div>
            </div>
          </Card>

          {/* Results Card */}
          <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-primary-glow/5">
            <h2 className="text-xl font-semibold mb-6 text-foreground">Results</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(results.totalInvestment)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Estimated Returns</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(results.estimatedReturns)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                <p className="text-sm text-primary-foreground/80 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-primary-foreground">
                  {formatCurrency(results.totalValue)}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground">
                Note: This calculator provides an estimate based on the assumed rate of return. Actual
                returns may vary based on market conditions.
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

export default SipCalculator;
