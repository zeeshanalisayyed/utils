import { useState } from "react";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Converters = () => {
  // Length Converter
  const [lengthValue, setLengthValue] = useState("1");
  const [lengthFrom, setLengthFrom] = useState("meters");
  const [lengthTo, setLengthTo] = useState("feet");

  // Temperature Converter
  const [tempValue, setTempValue] = useState("0");
  const [tempFrom, setTempFrom] = useState("celsius");
  const [tempTo, setTempTo] = useState("fahrenheit");

  const lengthUnits = {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    feet: 3.28084,
    inches: 39.3701,
    yards: 1.09361,
    miles: 0.000621371,
  };

  const convertLength = () => {
    const value = parseFloat(lengthValue);
    if (isNaN(value)) return "0";
    const inMeters = value / lengthUnits[lengthFrom as keyof typeof lengthUnits];
    const result = inMeters * lengthUnits[lengthTo as keyof typeof lengthUnits];
    return result.toFixed(4);
  };

  const convertTemperature = () => {
    const value = parseFloat(tempValue);
    if (isNaN(value)) return "0";

    let celsius = value;
    if (tempFrom === "fahrenheit") celsius = (value - 32) * (5 / 9);
    else if (tempFrom === "kelvin") celsius = value - 273.15;

    let result = celsius;
    if (tempTo === "fahrenheit") result = celsius * (9 / 5) + 32;
    else if (tempTo === "kelvin") result = celsius + 273.15;

    return result.toFixed(2);
  };

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
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-glow to-accent flex items-center justify-center">
              <ArrowRightLeft className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Unit Converters</h1>
              <p className="text-xs text-muted-foreground">Convert between different units</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="length" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
          </TabsList>

          <TabsContent value="length">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Length Converter</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length-value" className="text-sm font-medium text-foreground mb-2 block">
                      Value
                    </Label>
                    <Input
                      id="length-value"
                      type="number"
                      value={lengthValue}
                      onChange={(e) => setLengthValue(e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">From Unit</Label>
                    <Select value={lengthFrom} onValueChange={setLengthFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="kilometers">Kilometers</SelectItem>
                        <SelectItem value="centimeters">Centimeters</SelectItem>
                        <SelectItem value="millimeters">Millimeters</SelectItem>
                        <SelectItem value="feet">Feet</SelectItem>
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="yards">Yards</SelectItem>
                        <SelectItem value="miles">Miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRightLeft className="h-6 w-6 text-primary" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">To Unit</Label>
                    <Select value={lengthTo} onValueChange={setLengthTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="kilometers">Kilometers</SelectItem>
                        <SelectItem value="centimeters">Centimeters</SelectItem>
                        <SelectItem value="millimeters">Millimeters</SelectItem>
                        <SelectItem value="feet">Feet</SelectItem>
                        <SelectItem value="inches">Inches</SelectItem>
                        <SelectItem value="yards">Yards</SelectItem>
                        <SelectItem value="miles">Miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Result</Label>
                    <div className="h-10 px-3 py-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 border border-primary/20 flex items-center">
                      <span className="text-lg font-semibold text-primary">{convertLength()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="temperature">
            <Card className="p-6 border-border bg-card">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Temperature Converter</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="temp-value" className="text-sm font-medium text-foreground mb-2 block">
                      Value
                    </Label>
                    <Input
                      id="temp-value"
                      type="number"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      placeholder="Enter temperature"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">From Unit</Label>
                    <Select value={tempFrom} onValueChange={setTempFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRightLeft className="h-6 w-6 text-accent" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">To Unit</Label>
                    <Select value={tempTo} onValueChange={setTempTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                        <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Result</Label>
                    <div className="h-10 px-3 py-2 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 flex items-center">
                      <span className="text-lg font-semibold text-accent">{convertTemperature()}°</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Converters;
