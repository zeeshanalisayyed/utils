import { useState } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const TimeZoneConverter = () => {
  const [dateTime, setDateTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");

  const convert = () => {
    if (!dateTime) return null;

    try {
      const date = new Date(dateTime);
      const fromDate = new Date(date.toLocaleString("en-US", { timeZone: fromZone }));
      const toDate = new Date(date.toLocaleString("en-US", { timeZone: toZone }));

      const offset = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60);
      const result = new Date(date.getTime() + offset * 60 * 60 * 1000);

      return result.toLocaleString("en-US", {
        timeZone: toZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return null;
    }
  };

  const result = convert();

  const timeZones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Dubai",
    "Australia/Sydney",
    "America/Sao_Paulo",
  ];

  const faqs = [
    { question: "How does time zone conversion work?", answer: "We convert a date and time from one time zone to another, accounting for differences in UTC offsets and daylight saving time." },
    { question: "Are daylight saving times handled?", answer: "Yes, the converter automatically accounts for daylight saving time changes in different time zones." },
    { question: "What format should I use for the date?", answer: "Use the standard date-time format. The converter will parse it and convert to the target time zone." },
  ];

  return (
    <PageLayout title="Time Zone Converter" description="Convert times between time zones">
      <SEOHead
        title="Time Zone Converter - Convert Between Time Zones | Utility Master"
        description="Convert date and time between different time zones. Free and instant."
        keywords="time zone converter, timezone converter, convert time zones, world clock"
        canonicalUrl="/time-zone-converter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Zone Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Date & Time</Label>
              <Input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>From Time Zone</Label>
                <Select value={fromZone} onValueChange={setFromZone}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>To Time Zone</Label>
                <Select value={toZone} onValueChange={setToZone}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {result && (
              <div className="p-4 bg-muted/50 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">Converted Time:</div>
                <div className="text-2xl font-bold text-primary">{result}</div>
                <div className="text-sm text-muted-foreground mt-1">{toZone.replace("_", " ")}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default TimeZoneConverter;

