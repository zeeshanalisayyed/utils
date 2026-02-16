import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Moon, Sun, Clock, Bed } from "lucide-react";

const CYCLE_MIN = 90; // minutes per sleep cycle
const FALL_ASLEEP_MIN = 15;

const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

const SleepCalculator = () => {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [time, setTime] = useState("07:00");
  const [results, setResults] = useState<{ time: Date; cycles: number }[]>([]);

  const calculate = () => {
    const [h, m] = time.split(":").map(Number);
    const base = new Date();
    base.setHours(h, m, 0, 0);

    const times: { time: Date; cycles: number }[] = [];

    if (mode === "wake") {
      // Given wake time, find ideal bedtimes
      for (let cycles = 6; cycles >= 3; cycles--) {
        const bedtime = new Date(base.getTime() - (cycles * CYCLE_MIN + FALL_ASLEEP_MIN) * 60000);
        times.push({ time: bedtime, cycles });
      }
    } else {
      // Given bedtime, find ideal wake times
      for (let cycles = 3; cycles <= 6; cycles++) {
        const wakeTime = new Date(base.getTime() + (cycles * CYCLE_MIN + FALL_ASLEEP_MIN) * 60000);
        times.push({ time: wakeTime, cycles });
      }
    }
    setResults(times);
  };

  const faqItems = [
    { question: "What is a sleep cycle?", answer: "A sleep cycle lasts about 90 minutes and consists of stages including light sleep, deep sleep, and REM sleep. Waking between cycles helps you feel refreshed." },
    { question: "How many sleep cycles do I need?", answer: "Most adults need 5-6 complete sleep cycles (7.5-9 hours). The minimum recommended is 4 cycles (6 hours), but this isn't ideal long-term." },
    { question: "Why do I feel tired even after 8 hours?", answer: "If you wake in the middle of a deep sleep phase, you'll feel groggy regardless of total sleep time. Timing your wake-up to the end of a cycle helps." },
    { question: "How long does it take to fall asleep?", answer: "The average person takes about 15 minutes to fall asleep, which this calculator accounts for automatically." },
  ];

  return (
    <PageLayout title="Sleep Calculator" description="Calculate optimal bedtimes and wake times based on sleep cycles.">
      <SEOHead
        title="Sleep Calculator - Optimal Sleep Cycle Times | Utility Master"
        description="Find the best time to sleep and wake up based on 90-minute sleep cycles. Wake up refreshed by timing your sleep perfectly."
        keywords="sleep calculator, sleep cycle, bedtime calculator, wake up time, optimal sleep"
        canonicalUrl="https://utils.lovable.app/sleep-calculator"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Moon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Sleep Calculator</h1>
          <p className="text-muted-foreground">Wake up refreshed by timing your sleep cycles</p>
        </div>

        <AdBanner className="mb-6" />

        <Card className="mb-6">
          <CardHeader><CardTitle>Calculate Sleep Times</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button variant={mode === "wake" ? "default" : "outline"} onClick={() => setMode("wake")} className="flex-1">
                <Sun className="w-4 h-4 mr-2" /> I need to wake at...
              </Button>
              <Button variant={mode === "sleep" ? "default" : "outline"} onClick={() => setMode("sleep")} className="flex-1">
                <Bed className="w-4 h-4 mr-2" /> I want to sleep at...
              </Button>
            </div>
            <div>
              <Label>{mode === "wake" ? "Wake-up time" : "Bedtime"}</Label>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="max-w-xs" />
            </div>
            <Button onClick={calculate} className="w-full">Calculate</Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {mode === "wake" ? "Ideal Bedtimes" : "Ideal Wake Times"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((r, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      r.cycles >= 5 ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <p className="text-2xl font-bold">{formatTime(r.time)}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.cycles} cycles · {(r.cycles * 1.5).toFixed(1)}h sleep
                    </p>
                    {r.cycles >= 5 && (
                      <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                ))}
              </div>
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

export default SleepCalculator;
