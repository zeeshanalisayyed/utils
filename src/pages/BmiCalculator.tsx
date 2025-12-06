import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const calculateBMI = (): { bmi: string; category: string; categoryColor: string } => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      return { bmi: "0", category: "", categoryColor: "primary" };
    }

    const bmi = w / (h * h);
    let category = "";
    let categoryColor = "primary";

    if (bmi < 18.5) {
      category = "Underweight";
      categoryColor = "accent";
    } else if (bmi < 25) {
      category = "Normal weight";
      categoryColor = "primary";
    } else if (bmi < 30) {
      category = "Overweight";
      categoryColor = "accent";
    } else {
      category = "Obese";
      categoryColor = "destructive";
    }

    return { bmi: bmi.toFixed(1), category, categoryColor };
  };

  const result = calculateBMI();

  const faqItems = [
    { question: "What is BMI?", answer: "Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women." },
    { question: "How accurate is BMI?", answer: "BMI is a useful general indicator but doesn't account for muscle mass, bone density, or fat distribution. Athletes may have high BMI due to muscle mass." },
    { question: "What is a healthy BMI range?", answer: "A healthy BMI is typically between 18.5 and 24.9. However, consult a healthcare provider for personalized advice." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI Calculator - Utility Master",
    "applicationCategory": "HealthApplication",
    "description": "Calculate your Body Mass Index (BMI) to understand your weight status relative to your height.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="BMI Calculator"
      description="Check your Body Mass Index"
    >
      <SEOHead
        title="BMI Calculator - Body Mass Index Calculator | Utility Master"
        description="Calculate your Body Mass Index (BMI) instantly. Free online BMI calculator with health categories and personalized recommendations."
        keywords="BMI calculator, body mass index, weight calculator, health calculator, BMI chart"
        canonicalUrl="https://utilitymaster.app/bmi-calculator"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6 border-border bg-card">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Enter Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium text-foreground">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2"
                placeholder="70"
              />
            </div>

            <div>
              <Label htmlFor="height" className="text-sm font-medium text-foreground">
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2"
                placeholder="170"
              />
            </div>
          </div>
        </Card>

        {parseFloat(result.bmi) > 0 && (
          <Card className="p-6 border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-xl font-semibold mb-6 text-foreground text-center">Your BMI</h2>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-primary mb-2">{result.bmi}</div>
              <div className="text-2xl font-semibold text-foreground">{result.category}</div>
            </div>

            <div className="space-y-3 mt-8">
              <div className="flex justify-between p-3 rounded-lg bg-card border border-border">
                <span className="text-muted-foreground">Underweight</span>
                <span className="font-medium text-foreground">&lt; 18.5</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-card border border-border">
                <span className="text-muted-foreground">Normal weight</span>
                <span className="font-medium text-foreground">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-card border border-border">
                <span className="text-muted-foreground">Overweight</span>
                <span className="font-medium text-foreground">25 - 29.9</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-card border border-border">
                <span className="text-muted-foreground">Obese</span>
                <span className="font-medium text-foreground">≥ 30</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <p className="text-xs text-muted-foreground">
                Note: BMI is a general indicator and may not account for muscle mass, bone density,
                and other factors. Consult a healthcare professional for personalized advice.
              </p>
            </div>
          </Card>
        )}

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default BmiCalculator;