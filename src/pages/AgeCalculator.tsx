import { useState } from "react";
import { Calendar, Cake, Clock, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  nextBirthday: number;
  zodiacSign: string;
  chineseZodiac: string;
}

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { sign: "Capricorn", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", start: [2, 19], end: [3, 20] },
      { sign: "Aries", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", start: [6, 21], end: [7, 22] },
      { sign: "Leo", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", start: [8, 23], end: [9, 22] },
      { sign: "Libra", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ];

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return sign;
      }
    }
    return "Capricorn";
  };

  const getChineseZodiac = (year: number): string => {
    const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    return animals[(year - 1900) % 12];
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      nextBirthday: daysUntilBirthday,
      zodiacSign: getZodiacSign(birth.getMonth() + 1, birth.getDate()),
      chineseZodiac: getChineseZodiac(birth.getFullYear()),
    });
  };

  const faqs = [
    { question: "How is age calculated?", answer: "We calculate exact years, months, and days between your birth date and today. Leap years and varying month lengths are accounted for." },
    { question: "What zodiac signs are shown?", answer: "We show both Western zodiac (based on birth month/day) and Chinese zodiac (based on birth year)." },
    { question: "Is my birth date stored?", answer: "No. All calculations happen in your browser. We never store or transmit your personal information." },
  ];

  return (
    <PageLayout title="Age Calculator" description="Calculate your exact age and more">
      <SEOHead
        title="Age Calculator - Exact Age in Years, Months, Days | Utility Master"
        description="Calculate your exact age, days until next birthday, zodiac signs, and more. Free and instant."
        keywords="age calculator, birthday calculator, how old am i, zodiac sign calculator"
        canonicalUrl="/age-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cake className="h-5 w-5" />
              Calculate Your Age
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="birthdate">Your Birth Date</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <Button onClick={calculateAge} className="w-full" size="lg" disabled={!birthDate}>
              <Calendar className="h-4 w-4 mr-2" />
              Calculate Age
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="border-primary/20 bg-primary/5 mb-6">
              <CardHeader>
                <CardTitle className="text-center">Your Age</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                    {result.years} <span className="text-2xl text-muted-foreground">years</span>
                  </div>
                  <div className="text-xl text-muted-foreground">
                    {result.months} months, {result.days} days
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{result.totalDays.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{result.totalWeeks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Weeks</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{result.totalMonths.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Months</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{result.totalHours.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <CalendarDays className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{result.nextBirthday}</p>
                  <p className="text-sm text-muted-foreground">Days until birthday</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <span className="text-3xl mb-2 block">⭐</span>
                  <p className="text-lg font-bold">{result.zodiacSign}</p>
                  <p className="text-sm text-muted-foreground">Western Zodiac</p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6 text-center">
                  <span className="text-3xl mb-2 block">🐲</span>
                  <p className="text-lg font-bold">{result.chineseZodiac}</p>
                  <p className="text-sm text-muted-foreground">Chinese Zodiac</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default AgeCalculator;
