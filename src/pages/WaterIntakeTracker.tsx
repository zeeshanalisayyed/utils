import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Droplets, Plus, Minus, Target, GlassWater } from "lucide-react";

const WaterIntakeTracker = () => {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("temperate");
  const [goal, setGoal] = useState<number | null>(null);
  const [intake, setIntake] = useState(0);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;

    // Base: 35ml per kg
    let ml = w * 35;

    const activityMultiplier: Record<string, number> = {
      sedentary: 0.9, light: 1.0, moderate: 1.1, active: 1.3, very_active: 1.5,
    };
    ml *= activityMultiplier[activity];

    const climateMultiplier: Record<string, number> = {
      cold: 0.9, temperate: 1.0, hot: 1.2, tropical: 1.3,
    };
    ml *= climateMultiplier[climate];

    setGoal(Math.round(ml / 100) * 100); // round to nearest 100ml
    setIntake(0);
  };

  const addWater = (ml: number) => setIntake(prev => Math.max(0, prev + ml));
  const progress = goal ? Math.min(100, (intake / goal) * 100) : 0;
  const glasses = Math.round(intake / 250);

  const faqItems = [
    { question: "How much water should I drink daily?", answer: "A general guideline is about 35ml per kg of body weight. Active individuals and those in hot climates need more. This calculator adjusts for your specific situation." },
    { question: "Does coffee count toward water intake?", answer: "Caffeinated beverages do contribute to hydration but are less effective than plain water. It's best to count them as about 50-75% of their volume." },
    { question: "What are signs of dehydration?", answer: "Common signs include dark yellow urine, dry mouth, fatigue, headache, and dizziness. If your urine is pale yellow, you're likely well-hydrated." },
    { question: "Can I drink too much water?", answer: "Yes, overhydration (hyponatremia) is possible but rare. Stick to your recommended amount and listen to your body's thirst signals." },
  ];

  return (
    <PageLayout title="Water Intake Tracker" description="Calculate and track your daily water intake needs.">
      <SEOHead
        title="Water Intake Tracker - Daily Hydration Calculator | Utility Master"
        description="Calculate your recommended daily water intake based on weight, activity, and climate. Track glasses throughout the day."
        keywords="water intake calculator, daily water needs, hydration tracker, water consumption, how much water to drink"
        canonicalUrl="https://utils.lovable.app/water-intake-tracker"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Droplets className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Water Intake Tracker</h1>
          <p className="text-muted-foreground">Stay hydrated with personalized daily water goals</p>
        </div>

        <AdBanner className="mb-6" />

        <Card className="mb-6">
          <CardHeader><CardTitle>Calculate Your Daily Goal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><Label>Weight (kg)</Label><Input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} /></div>
              <div>
                <Label>Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Light Exercise</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Climate</Label>
                <Select value={climate} onValueChange={setClimate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold">Cold</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="tropical">Tropical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate Goal</Button>
          </CardContent>
        </Card>

        {goal && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{intake} ml</p>
                <p className="text-muted-foreground">of {goal} ml goal · {glasses} glasses</p>
              </div>

              <Progress value={progress} className="h-4" />

              <div className="flex flex-wrap gap-2 justify-center">
                {[150, 250, 500].map(ml => (
                  <Button key={ml} variant="outline" onClick={() => addWater(ml)}>
                    <Plus className="w-4 h-4 mr-1" /> {ml}ml
                  </Button>
                ))}
                <Button variant="outline" onClick={() => addWater(-250)} disabled={intake === 0}>
                  <Minus className="w-4 h-4 mr-1" /> 250ml
                </Button>
              </div>

              {progress >= 100 && (
                <div className="text-center p-4 bg-primary/10 rounded-xl">
                  <GlassWater className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-primary">Goal reached! Great job staying hydrated! 💧</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <InArticleAd />
        <FAQ items={faqItems} />
        <AdBanner className="mt-6" />
      </div>
    </PageLayout>
  );
};

export default WaterIntakeTracker;
