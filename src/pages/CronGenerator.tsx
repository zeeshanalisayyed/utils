import { useState, useMemo } from "react";
import { Clock, Copy, Check, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const CronGenerator = () => {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const humanReadable = useMemo(() => {
    const parts: string[] = [];
    
    if (minute === "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
      return "Every minute";
    }

    if (minute === "0" && hour === "*") {
      parts.push("Every hour at minute 0");
    } else if (minute !== "*" && hour !== "*") {
      parts.push(`At ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`);
    } else if (minute !== "*") {
      parts.push(`At minute ${minute}`);
    } else if (hour !== "*") {
      parts.push(`Every minute during hour ${hour}`);
    }

    if (dayOfMonth !== "*") {
      parts.push(`on day ${dayOfMonth} of the month`);
    }

    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (month !== "*") {
      parts.push(`in ${monthNames[parseInt(month)] || month}`);
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (dayOfWeek !== "*") {
      parts.push(`on ${dayNames[parseInt(dayOfWeek)] || dayOfWeek}`);
    }

    return parts.join(" ") || "Custom schedule";
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const presets = [
    { label: "Every minute", cron: "* * * * *" },
    { label: "Every hour", cron: "0 * * * *" },
    { label: "Every day at midnight", cron: "0 0 * * *" },
    { label: "Every day at noon", cron: "0 12 * * *" },
    { label: "Every Monday", cron: "0 0 * * 1" },
    { label: "Every weekday", cron: "0 9 * * 1-5" },
    { label: "First of month", cron: "0 0 1 * *" },
    { label: "Every 15 minutes", cron: "*/15 * * * *" },
  ];

  const applyPreset = (cron: string) => {
    const [min, hr, dom, mon, dow] = cron.split(" ");
    setMinute(min);
    setHour(hr);
    setDayOfMonth(dom);
    setMonth(mon);
    setDayOfWeek(dow);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "What is a cron expression?", answer: "A cron expression is a string of 5 fields that defines a schedule. The fields are: minute, hour, day of month, month, and day of week." },
    { question: "What does * mean?", answer: "The asterisk (*) means 'every' or 'any'. For example, * in the hour field means 'every hour'." },
    { question: "Can I use ranges?", answer: "Yes! Use '-' for ranges (1-5), '/' for steps (*/15), and ',' for lists (1,15,30)." },
  ];

  return (
    <PageLayout title="Cron Expression Generator" description="Create and understand cron schedules">
      <SEOHead
        title="Cron Expression Generator - Create Cron Jobs | Utility Master"
        description="Free cron expression generator and parser. Build cron schedules visually with human-readable descriptions."
        keywords="cron generator, cron expression, cron job, cron schedule, crontab"
        canonicalUrl="https://utils.lovable.app/cron-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Cron Expression Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Label>Minute</Label>
                <Input
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="*"
                  className="font-mono mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">0-59</p>
              </div>
              <div>
                <Label>Hour</Label>
                <Input
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="*"
                  className="font-mono mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">0-23</p>
              </div>
              <div>
                <Label>Day (Month)</Label>
                <Input
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  placeholder="*"
                  className="font-mono mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">1-31</p>
              </div>
              <div>
                <Label>Month</Label>
                <Input
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="*"
                  className="font-mono mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">1-12</p>
              </div>
              <div>
                <Label>Day (Week)</Label>
                <Input
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  placeholder="*"
                  className="font-mono mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">0-6 (Sun-Sat)</p>
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-lg">Generated Expression</Label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-3xl font-mono font-bold text-primary">{cronExpression}</div>
              <div className="mt-2 text-muted-foreground">{humanReadable}</div>
            </div>

            <div>
              <Label className="mb-3 block">Quick Presets</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.cron}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.cron)}
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <AdBanner format="horizontal" />

        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle>Cron Syntax Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-mono bg-muted/50 p-2 rounded">* = any value</div>
                <div className="font-mono bg-muted/50 p-2 rounded">, = list (1,3,5)</div>
                <div className="font-mono bg-muted/50 p-2 rounded">- = range (1-5)</div>
              </div>
              <div className="space-y-2">
                <div className="font-mono bg-muted/50 p-2 rounded">/ = step (*/15)</div>
                <div className="font-mono bg-muted/50 p-2 rounded">0 0 * * 0 = Sundays at midnight</div>
                <div className="font-mono bg-muted/50 p-2 rounded">0 9 * * 1-5 = Weekdays at 9am</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default CronGenerator;
