import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const GstCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [type, setType] = useState("exclusive");

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    const rate = parseFloat(gstRate) || 0;

    if (type === "exclusive") {
      const gst = (amt * rate) / 100;
      const total = amt + gst;
      return { original: amt, gst, total };
    } else {
      const original = (amt * 100) / (100 + rate);
      const gst = amt - original;
      return { original, gst, total: amt };
    }
  };

  const result = amount ? calculate() : null;

  const faqs = [
    { question: "What is GST?", answer: "GST (Goods and Services Tax) is a value-added tax levied on most goods and services sold for domestic consumption in India." },
    { question: "What are the GST rates?", answer: "Common GST rates in India are 5%, 12%, 18%, and 28%. Some items are exempt or have special rates." },
    { question: "What's the difference between exclusive and inclusive?", answer: "Exclusive means GST is added to the base amount. Inclusive means the amount already includes GST." },
  ];

  return (
    <PageLayout title="GST Calculator" description="Calculate GST for Indian users">
      <SEOHead
        title="GST Calculator - Calculate Goods and Services Tax | Utility Master"
        description="Calculate GST (exclusive or inclusive) with different tax rates. Free and instant."
        keywords="gst calculator, goods and services tax, tax calculator india, gst calculation"
        canonicalUrl="/gst-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              GST Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>GST Rate (%)</Label>
                <Select value={gstRate} onValueChange={setGstRate}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exclusive">GST Exclusive</SelectItem>
                    <SelectItem value="inclusive">GST Inclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {result && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Amount:</span>
                  <span className="font-semibold">₹{result.original.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST ({gstRate}%):</span>
                  <span className="font-semibold">₹{result.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold text-primary">₹{result.total.toFixed(2)}</span>
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

export default GstCalculator;

