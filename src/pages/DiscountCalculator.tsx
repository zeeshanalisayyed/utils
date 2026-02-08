import { useState, useMemo } from "react";
import { Percent, DollarSign, Tag, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const calculations = useMemo(() => {
    const original = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;
    const final = parseFloat(finalPrice) || 0;

    if (original > 0 && discount > 0) {
      const discountAmount = original * (discount / 100);
      const calculatedFinal = original - discountAmount;
      return {
        discountAmount: discountAmount.toFixed(2),
        finalPrice: calculatedFinal.toFixed(2),
        savings: discountAmount.toFixed(2),
        mode: "fromDiscount"
      };
    } else if (original > 0 && final > 0) {
      const discountAmount = original - final;
      const calculatedPercent = (discountAmount / original) * 100;
      return {
        discountAmount: discountAmount.toFixed(2),
        discountPercent: calculatedPercent.toFixed(2),
        savings: discountAmount.toFixed(2),
        mode: "fromPrices"
      };
    }
    return null;
  }, [originalPrice, discountPercent, finalPrice]);

  const faqs = [
    { question: "How do I calculate discount percentage?", answer: "Discount % = ((Original Price - Sale Price) / Original Price) × 100" },
    { question: "How do I find the sale price?", answer: "Sale Price = Original Price × (1 - Discount % / 100)" },
    { question: "What is a good discount?", answer: "It depends on the product and context. 10-20% is common for regular sales, 30-50% for clearance, and 50%+ for flash sales." },
  ];

  return (
    <PageLayout title="Discount Calculator" description="Calculate discounts, sale prices, and savings">
      <SEOHead
        title="Discount Calculator - Calculate Sale Prices & Savings | Utility Master"
        description="Free discount calculator to find sale prices, savings, and discount percentages. Perfect for shopping and retail calculations."
        keywords="discount calculator, sale price calculator, percentage off, savings calculator, price reduction"
        canonicalUrl="https://utils.lovable.app/discount-calculator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Price & Discount
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Original Price ($)</Label>
                <Input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="100.00"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Discount Percentage (%)</Label>
                <Input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => {
                    setDiscountPercent(e.target.value);
                    setFinalPrice("");
                  }}
                  placeholder="20"
                  className="mt-2"
                />
              </div>
              <div className="text-center text-muted-foreground">— OR —</div>
              <div>
                <Label>Final/Sale Price ($)</Label>
                <Input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => {
                    setFinalPrice(e.target.value);
                    setDiscountPercent("");
                  }}
                  placeholder="80.00"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-green-500" />
                Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calculations ? (
                <>
                  {calculations.mode === "fromDiscount" && (
                    <>
                      <div className="p-4 bg-accent/20 rounded-lg">
                        <div className="text-sm text-muted-foreground">Final Price</div>
                        <div className="text-3xl font-bold text-accent-foreground">${calculations.finalPrice}</div>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="text-sm text-muted-foreground">You Save</div>
                        <div className="text-2xl font-bold text-primary">${calculations.savings}</div>
                      </div>
                    </>
                  )}
                  {calculations.mode === "fromPrices" && (
                    <>
                      <div className="p-4 bg-accent/20 rounded-lg">
                        <div className="text-sm text-muted-foreground">Discount Percentage</div>
                        <div className="text-3xl font-bold text-accent-foreground">{calculations.discountPercent}%</div>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="text-sm text-muted-foreground">You Save</div>
                        <div className="text-2xl font-bold text-primary">${calculations.savings}</div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Percent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter original price and either discount % or final price to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdBanner format="horizontal" />

        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle>Quick Discount Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[10, 15, 20, 25, 30, 40, 50, 60, 70, 75].map((percent) => {
                const original = parseFloat(originalPrice) || 100;
                const final = original * (1 - percent / 100);
                return (
                  <div key={percent} className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="text-lg font-bold text-primary">{percent}% off</div>
                    <div className="text-sm text-muted-foreground">
                      ${original.toFixed(0)} → ${final.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default DiscountCalculator;
