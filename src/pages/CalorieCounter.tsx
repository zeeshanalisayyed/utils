import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Apple, Flame, Target, TrendingDown, TrendingUp, Minus } from "lucide-react";

const CalorieCounter = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h) return;

    // Mifflin-St Jeor Equation
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const multipliers: Record<string, number> = {
      sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
    };
    const tdee = bmr * multipliers[activity];

    const goalAdjust: Record<string, number> = {
      lose: -500, maintain: 0, gain: 500,
    };
    const target = tdee + goalAdjust[goal];

    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(target) });
  };

  const faqItems = [
    { question: "How is daily calorie need calculated?", answer: "We use the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), then multiply by an activity factor to get your Total Daily Energy Expenditure (TDEE)." },
    { question: "What is BMR?", answer: "Basal Metabolic Rate is the number of calories your body burns at rest just to maintain basic life functions like breathing and circulation." },
    { question: "How accurate is this calculator?", answer: "The Mifflin-St Jeor equation is considered one of the most accurate formulas for estimating calorie needs, though individual results may vary based on genetics and body composition." },
    { question: "How many calories should I cut to lose weight?", answer: "A safe calorie deficit is 500 calories per day, which leads to approximately 0.5 kg (1 lb) of weight loss per week." },
  ];

  const GoalIcon = goal === "lose" ? TrendingDown : goal === "gain" ? TrendingUp : Minus;

  return (
    <PageLayout title="Calorie Counter" description="Calculate your daily calorie needs based on your body metrics and activity level.">
      <SEOHead
        title="Calorie Counter - Daily Calorie Needs Calculator | Utility Master"
        description="Calculate your daily calorie needs with the Mifflin-St Jeor equation. Get BMR, TDEE, and personalized calorie targets for weight loss or gain."
        keywords="calorie counter, daily calorie calculator, BMR calculator, TDEE calculator, weight loss calories"
        canonicalUrl="https://utils.lovable.app/calorie-counter"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Apple className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Calorie Counter</h1>
          <p className="text-muted-foreground">Find out how many calories you need daily</p>
        </div>

        <AdBanner className="mb-6" />

        <Card className="mb-6">
          <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Age</Label><Input type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} /></div>
              <div><Label>Weight (kg)</Label><Input type="number" placeholder="70" value={weight} onChange={e => setWeight(e.target.value)} /></div>
              <div><Label>Height (cm)</Label><Input type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} /></div>
              <div>
                <Label>Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (office job)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (athlete)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight (-500 cal)</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight (+500 cal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculate} className="w-full">Calculate Calories</Button>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="text-center p-6">
              <Flame className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">BMR</p>
              <p className="text-2xl font-bold">{result.bmr}</p>
              <p className="text-xs text-muted-foreground">cal/day at rest</p>
            </Card>
            <Card className="text-center p-6">
              <Target className="w-8 h-8 text-accent-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">TDEE</p>
              <p className="text-2xl font-bold">{result.tdee}</p>
              <p className="text-xs text-muted-foreground">cal/day with activity</p>
            </Card>
            <Card className="text-center p-6 border-primary">
              <GoalIcon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Your Target</p>
              <p className="text-2xl font-bold text-primary">{result.target}</p>
              <p className="text-xs text-muted-foreground">cal/day for your goal</p>
            </Card>
          </div>
        )}

        <InArticleAd />
        <FAQ items={faqItems} />
        <AdBanner className="mt-6" />
      </div>
    </PageLayout>
  );
};

export default CalorieCounter;
