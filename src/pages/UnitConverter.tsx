import { useState } from "react";
import { ArrowRightLeft, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const categories = {
  length: {
    name: "Length",
    units: ["meters", "kilometers", "miles", "feet", "inches", "centimeters", "yards"],
    conversions: {
      meters: 1,
      kilometers: 0.001,
      miles: 0.000621371,
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      yards: 1.09361,
    },
  },
  weight: {
    name: "Weight",
    units: ["kilograms", "grams", "pounds", "ounces", "tons"],
    conversions: {
      kilograms: 1,
      grams: 1000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001,
    },
  },
  temperature: {
    name: "Temperature",
    units: ["celsius", "fahrenheit", "kelvin"],
    conversions: {}, // Special handling
  },
  volume: {
    name: "Volume",
    units: ["liters", "milliliters", "gallons", "quarts", "cups"],
    conversions: {
      liters: 1,
      milliliters: 1000,
      gallons: 0.264172,
      quarts: 1.05669,
      cups: 4.22675,
    },
  },
  area: {
    name: "Area",
    units: ["sq meters", "sq feet", "sq yards", "acres", "hectares"],
    conversions: {
      "sq meters": 1,
      "sq feet": 10.7639,
      "sq yards": 1.19599,
      acres: 0.000247105,
      hectares: 0.0001,
    },
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState<keyof typeof categories>("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    let converted: number;

    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        converted = (value * 9/5) + 32;
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        converted = (value - 32) * 5/9;
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        converted = value + 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        converted = value - 273.15;
      } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        converted = (value - 32) * 5/9 + 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        converted = (value - 273.15) * 9/5 + 32;
      } else {
        converted = value;
      }
    } else {
      const conversions = categories[category].conversions as Record<string, number>;
      const baseValue = value / conversions[fromUnit];
      converted = baseValue * conversions[toUnit];
    }

    setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleCategoryChange = (newCategory: keyof typeof categories) => {
    setCategory(newCategory);
    setFromUnit(categories[newCategory].units[0]);
    setToUnit(categories[newCategory].units[1]);
    setResult(null);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const faqs = [
    { question: "How accurate are the conversions?", answer: "Our conversions use standard conversion factors and are accurate for most practical purposes." },
    { question: "Can I convert between any units?", answer: "You can convert between units within the same category (e.g., length to length, but not length to weight)." },
    { question: "What temperature scales are supported?", answer: "We support Celsius, Fahrenheit, and Kelvin for temperature conversions." },
  ];

  return (
    <PageLayout title="Unit Converter" description="Convert between different units of measurement">
      <SEOHead
        title="Unit Converter - Convert Length, Weight, Temperature | Utility Master"
        description="Free online unit converter. Convert between length, weight, temperature, volume, and area units instantly."
        keywords="unit converter, length converter, weight converter, temperature converter, metric converter"
        canonicalUrl="/unit-converter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Unit Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => handleCategoryChange(v as keyof typeof categories)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
              <div>
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[category].units.map((unit) => (
                      <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="icon" onClick={swapUnits}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>

              <div>
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[category].units.map((unit) => (
                      <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Value</Label>
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value to convert"
                className="mt-2"
              />
            </div>

            <Button onClick={convert} className="w-full">Convert</Button>

            {result && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-center">
                  <span className="text-lg font-semibold">{inputValue} {fromUnit}</span>
                  <span className="mx-2">=</span>
                  <span className="text-xl font-bold text-primary">{result} {toUnit}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default UnitConverter;
