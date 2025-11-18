import { useState } from "react";
import { ArrowLeft, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const calculateBMI = (): { bmi: string; category: string; categoryColor: string } => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters
    
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
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">BMI Calculator</h1>
              <p className="text-xs text-muted-foreground">Check your Body Mass Index</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <AdBanner />
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
          <Card className="mt-6 p-6 border-border bg-gradient-to-br from-primary/5 to-accent/5">
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
      </main>
    </div>
  );
};

export default BmiCalculator;
