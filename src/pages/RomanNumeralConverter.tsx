import { useState } from "react";
import {Hash, ArrowLeftRight} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const RomanNumeralConverter = () => {
  const [roman, setRoman] = useState("");
  const [arabic, setArabic] = useState("");

  const romanToArabic = (roman: string): number | null => {
    const values: { [key: string]: number } = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };

    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = values[roman[i].toUpperCase()];
      const next = values[roman[i + 1]?.toUpperCase()];

      if (!current) return null;
      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    return result;
  };

  const arabicToRoman = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let result = "";
    for (let i = 0; i < values.length; i++) {
      const count = Math.floor(num / values[i]);
      result += symbols[i].repeat(count);
      num %= values[i];
    }
    return result;
  };

  const handleRomanChange = (value: string) => {
    setRoman(value);
    const result = romanToArabic(value);
    setArabic(result !== null ? result.toString() : "");
  };

  const handleArabicChange = (value: string) => {
    setArabic(value);
    const num = parseInt(value);
    if (!isNaN(num) && num > 0 && num < 4000) {
      setRoman(arabicToRoman(num));
    } else {
      setRoman("");
    }
  };

  const faqs = [
    { question: "What are Roman numerals?", answer: "Roman numerals are a numeral system originating in ancient Rome, using letters to represent numbers (I=1, V=5, X=10, L=50, C=100, D=500, M=1000)." },
    { question: "What's the maximum number?", answer: "This converter supports numbers up to 3999 (MMMCMXCIX)." },
    { question: "How do Roman numerals work?", answer: "Roman numerals use additive and subtractive notation. For example, IV = 4 (5-1), VI = 6 (5+1)." },
  ];

  return (
    <PageLayout title="Roman Numeral Converter" description="Convert between Roman and Arabic numerals">
      <SEOHead
        title="Roman Numeral Converter - Convert Roman Numbers | Utility Master"
        description="Convert between Roman numerals and Arabic numbers. Free and instant."
        keywords="roman numeral converter, roman numbers, roman to arabic, numeral converter"
        canonicalUrl="/roman-numeral-converter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Roman Numeral Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Roman Numeral</Label>
              <Input
                value={roman}
                onChange={(e) => handleRomanChange(e.target.value)}
                placeholder="Enter Roman numeral (e.g., IV, X, MCM)"
                className="mt-2"
              />
            </div>

            <div className="text-center">
              <ArrowLeftRight className="h-6 w-6 text-muted-foreground mx-auto" />
            </div>

            <div>
              <Label>Arabic Number</Label>
              <Input
                type="number"
                value={arabic}
                onChange={(e) => handleArabicChange(e.target.value)}
                placeholder="Enter Arabic number (1-3999)"
                min={1}
                max={3999}
                className="mt-2"
              />
            </div>

            {roman && arabic && (
              <div className="p-4 bg-muted/50 rounded-lg border text-center">
                <div className="text-2xl font-bold">
                  {roman.toUpperCase()} = {arabic}
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

export default RomanNumeralConverter;

