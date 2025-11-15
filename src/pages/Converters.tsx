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

  // Weight Converter
  const [weightValue, setWeightValue] = useState("1");
  const [weightFrom, setWeightFrom] = useState("kilograms");
  const [weightTo, setWeightTo] = useState("pounds");

  // Area Converter
  const [areaValue, setAreaValue] = useState("1");
  const [areaFrom, setAreaFrom] = useState("square_meters");
  const [areaTo, setAreaTo] = useState("square_feet");

  // Speed Converter
  const [speedValue, setSpeedValue] = useState("1");
  const [speedFrom, setSpeedFrom] = useState("kmh");
  const [speedTo, setSpeedTo] = useState("mph");

  // Data Converter
  const [dataValue, setDataValue] = useState("1");
  const [dataFrom, setDataFrom] = useState("megabytes");
  const [dataTo, setDataTo] = useState("gigabytes");

  // Volume Converter
  const [volumeValue, setVolumeValue] = useState("1");
  const [volumeFrom, setVolumeFrom] = useState("liters");
  const [volumeTo, setVolumeTo] = useState("gallons");

  // Time Converter
  const [timeValue, setTimeValue] = useState("1");
  const [timeFrom, setTimeFrom] = useState("hours");
  const [timeTo, setTimeTo] = useState("minutes");

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

  const weightUnits = {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    pounds: 2.20462,
    ounces: 35.274,
    tons: 0.001,
  };

  const areaUnits = {
    square_meters: 1,
    square_kilometers: 0.000001,
    square_centimeters: 10000,
    square_feet: 10.7639,
    square_inches: 1550,
    square_yards: 1.19599,
    acres: 0.000247105,
    hectares: 0.0001,
  };

  const speedUnits = {
    kmh: 1,
    mph: 0.621371,
    ms: 0.277778,
    fps: 0.911344,
    knots: 0.539957,
  };

  const dataUnits = {
    bytes: 1,
    kilobytes: 0.001,
    megabytes: 0.000001,
    gigabytes: 0.000000001,
    terabytes: 0.000000000001,
  };

  const volumeUnits = {
    liters: 1,
    milliliters: 1000,
    cubic_meters: 0.001,
    gallons: 0.264172,
    quarts: 1.05669,
    pints: 2.11338,
    cups: 4.22675,
    fluid_ounces: 33.814,
  };

  const timeUnits = {
    seconds: 1,
    minutes: 0.0166667,
    hours: 0.000277778,
    days: 0.0000115741,
    weeks: 0.00000165344,
    months: 3.80265e-7,
    years: 3.17098e-8,
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

  const convertWeight = () => {
    const value = parseFloat(weightValue);
    if (isNaN(value)) return "0";
    const inKg = value / weightUnits[weightFrom as keyof typeof weightUnits];
    const result = inKg * weightUnits[weightTo as keyof typeof weightUnits];
    return result.toFixed(4);
  };

  const convertArea = () => {
    const value = parseFloat(areaValue);
    if (isNaN(value)) return "0";
    const inSqMeters = value / areaUnits[areaFrom as keyof typeof areaUnits];
    const result = inSqMeters * areaUnits[areaTo as keyof typeof areaUnits];
    return result.toFixed(4);
  };

  const convertSpeed = () => {
    const value = parseFloat(speedValue);
    if (isNaN(value)) return "0";
    const inKmh = value / speedUnits[speedFrom as keyof typeof speedUnits];
    const result = inKmh * speedUnits[speedTo as keyof typeof speedUnits];
    return result.toFixed(4);
  };

  const convertData = () => {
    const value = parseFloat(dataValue);
    if (isNaN(value)) return "0";
    const inBytes = value / dataUnits[dataFrom as keyof typeof dataUnits];
    const result = inBytes * dataUnits[dataTo as keyof typeof dataUnits];
    return result.toFixed(6);
  };

  const convertVolume = () => {
    const value = parseFloat(volumeValue);
    if (isNaN(value)) return "0";
    const inLiters = value / volumeUnits[volumeFrom as keyof typeof volumeUnits];
    const result = inLiters * volumeUnits[volumeTo as keyof typeof volumeUnits];
    return result.toFixed(4);
  };

  const convertTime = () => {
    const value = parseFloat(timeValue);
    if (isNaN(value)) return "0";
    const inSeconds = value / timeUnits[timeFrom as keyof typeof timeUnits];
    const result = inSeconds * timeUnits[timeTo as keyof typeof timeUnits];
    return result.toFixed(4);
  };

  const renderConverterTab = (
    title: string,
    value: string,
    setValue: (val: string) => void,
    fromUnit: string,
    setFromUnit: (val: string) => void,
    toUnit: string,
    setToUnit: (val: string) => void,
    units: { value: string; label: string }[],
    convertFn: () => string
  ) => (
    <Card className="p-6 border-border bg-card">
      <h2 className="text-xl font-semibold mb-6 text-foreground">{title}</h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${title}-value`} className="text-sm font-medium text-foreground mb-2 block">
              Value
            </Label>
            <Input
              id={`${title}-value`}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Result</Label>
            <div className="h-10 px-3 rounded-md border border-border bg-muted flex items-center text-lg font-semibold text-foreground">
              {convertFn()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="temperature">Temp</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>

          <TabsContent value="length">
            {renderConverterTab(
              "Length Converter",
              lengthValue,
              setLengthValue,
              lengthFrom,
              setLengthFrom,
              lengthTo,
              setLengthTo,
              [
                { value: "meters", label: "Meters" },
                { value: "kilometers", label: "Kilometers" },
                { value: "centimeters", label: "Centimeters" },
                { value: "millimeters", label: "Millimeters" },
                { value: "feet", label: "Feet" },
                { value: "inches", label: "Inches" },
                { value: "yards", label: "Yards" },
                { value: "miles", label: "Miles" },
              ],
              convertLength
            )}
          </TabsContent>

          <TabsContent value="temperature">
            {renderConverterTab(
              "Temperature Converter",
              tempValue,
              setTempValue,
              tempFrom,
              setTempFrom,
              tempTo,
              setTempTo,
              [
                { value: "celsius", label: "Celsius (°C)" },
                { value: "fahrenheit", label: "Fahrenheit (°F)" },
                { value: "kelvin", label: "Kelvin (K)" },
              ],
              convertTemperature
            )}
          </TabsContent>

          <TabsContent value="weight">
            {renderConverterTab(
              "Weight Converter",
              weightValue,
              setWeightValue,
              weightFrom,
              setWeightFrom,
              weightTo,
              setWeightTo,
              [
                { value: "kilograms", label: "Kilograms" },
                { value: "grams", label: "Grams" },
                { value: "milligrams", label: "Milligrams" },
                { value: "pounds", label: "Pounds" },
                { value: "ounces", label: "Ounces" },
                { value: "tons", label: "Tons" },
              ],
              convertWeight
            )}
          </TabsContent>

          <TabsContent value="area">
            {renderConverterTab(
              "Area Converter",
              areaValue,
              setAreaValue,
              areaFrom,
              setAreaFrom,
              areaTo,
              setAreaTo,
              [
                { value: "square_meters", label: "Square Meters" },
                { value: "square_kilometers", label: "Square Kilometers" },
                { value: "square_centimeters", label: "Square Centimeters" },
                { value: "square_feet", label: "Square Feet" },
                { value: "square_inches", label: "Square Inches" },
                { value: "square_yards", label: "Square Yards" },
                { value: "acres", label: "Acres" },
                { value: "hectares", label: "Hectares" },
              ],
              convertArea
            )}
          </TabsContent>

          <TabsContent value="speed">
            {renderConverterTab(
              "Speed Converter",
              speedValue,
              setSpeedValue,
              speedFrom,
              setSpeedFrom,
              speedTo,
              setSpeedTo,
              [
                { value: "kmh", label: "Kilometers/Hour" },
                { value: "mph", label: "Miles/Hour" },
                { value: "ms", label: "Meters/Second" },
                { value: "fps", label: "Feet/Second" },
                { value: "knots", label: "Knots" },
              ],
              convertSpeed
            )}
          </TabsContent>

          <TabsContent value="data">
            {renderConverterTab(
              "Data Size Converter",
              dataValue,
              setDataValue,
              dataFrom,
              setDataFrom,
              dataTo,
              setDataTo,
              [
                { value: "bytes", label: "Bytes" },
                { value: "kilobytes", label: "Kilobytes (KB)" },
                { value: "megabytes", label: "Megabytes (MB)" },
                { value: "gigabytes", label: "Gigabytes (GB)" },
                { value: "terabytes", label: "Terabytes (TB)" },
              ],
              convertData
            )}
          </TabsContent>

          <TabsContent value="volume">
            {renderConverterTab(
              "Volume Converter",
              volumeValue,
              setVolumeValue,
              volumeFrom,
              setVolumeFrom,
              volumeTo,
              setVolumeTo,
              [
                { value: "liters", label: "Liters" },
                { value: "milliliters", label: "Milliliters" },
                { value: "cubic_meters", label: "Cubic Meters" },
                { value: "gallons", label: "Gallons" },
                { value: "quarts", label: "Quarts" },
                { value: "pints", label: "Pints" },
                { value: "cups", label: "Cups" },
                { value: "fluid_ounces", label: "Fluid Ounces" },
              ],
              convertVolume
            )}
          </TabsContent>

          <TabsContent value="time">
            {renderConverterTab(
              "Time Converter",
              timeValue,
              setTimeValue,
              timeFrom,
              setTimeFrom,
              timeTo,
              setTimeTo,
              [
                { value: "seconds", label: "Seconds" },
                { value: "minutes", label: "Minutes" },
                { value: "hours", label: "Hours" },
                { value: "days", label: "Days" },
                { value: "weeks", label: "Weeks" },
                { value: "months", label: "Months" },
                { value: "years", label: "Years" },
              ],
              convertTime
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Converters;
