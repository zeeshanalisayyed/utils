import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const DateCalculator = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [baseDate, setBaseDate] = useState("");
  const [days, setDays] = useState("");

  const calculateDifference = () => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  const addSubtract = () => {
    if (!baseDate || !days) return null;
    const date = new Date(baseDate);
    const numDays = parseInt(days) || 0;
    date.setDate(date.getDate() + numDays);
    return date.toISOString().split("T")[0];
  };

  const diff = calculateDifference();
  const result = addSubtract();

  const faqs = [
    { question: "How do I calculate days between dates?", answer: "Enter two dates and the calculator will show the number of days between them." },
    { question: "Can I add or subtract days from a date?", answer: "Yes, enter a base date and the number of days to add (positive) or subtract (negative)." },
    { question: "What date format should I use?", answer: "Use the standard date format (YYYY-MM-DD) or use the date picker." },
  ];

  return (
    <PageLayout title="Date Calculator" description="Calculate days between dates or add/subtract days">
      <SEOHead
        title="Date Calculator - Calculate Days Between Dates | Utility Master"
        description="Calculate days between two dates or add/subtract days from a date. Free and instant."
        keywords="date calculator, days between dates, date difference, add days to date"
        canonicalUrl="/date-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Date Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="difference" className="space-y-4">
              <TabsList>
                <TabsTrigger value="difference">Days Between</TabsTrigger>
                <TabsTrigger value="add">Add/Subtract</TabsTrigger>
              </TabsList>

              <TabsContent value="difference" className="space-y-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={date1}
                    onChange={(e) => setDate1(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    className="mt-2"
                  />
                </div>
                {diff !== null && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {diff} day{diff !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="add" className="space-y-4">
                <div>
                  <Label>Base Date</Label>
                  <Input
                    type="date"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Days to Add/Subtract</Label>
                  <Input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="Positive to add, negative to subtract"
                    className="mt-2"
                  />
                </div>
                {result && (
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="text-sm text-muted-foreground mb-1">Result:</div>
                    <div className="text-2xl font-bold text-primary">{result}</div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default DateCalculator;

