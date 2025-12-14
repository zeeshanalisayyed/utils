import { useState, useEffect, useRef } from "react";
import { Timer, Play, Square, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (isBreak) {
              setTimeLeft(workTime * 60);
              setIsBreak(false);
            } else {
              setTimeLeft(breakTime * 60);
              setIsBreak(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isBreak, workTime, breakTime]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = isBreak
    ? ((breakTime * 60 - timeLeft) / (breakTime * 60)) * 100
    : ((workTime * 60 - timeLeft) / (workTime * 60)) * 100;

  const faqs = [
    { question: "What is the Pomodoro Technique?", answer: "The Pomodoro Technique is a time management method that uses 25-minute work intervals followed by short breaks." },
    { question: "How does it work?", answer: "Work for 25 minutes, then take a 5-minute break. After 4 work sessions, take a longer break." },
    { question: "Can I customize the times?", answer: "Yes, you can adjust both work time and break time to suit your preferences." },
  ];

  return (
    <PageLayout title="Pomodoro Timer" description="Focus timer with breaks">
      <SEOHead
        title="Pomodoro Timer - Focus Timer | Utility Master"
        description="Use the Pomodoro Technique to boost productivity. Free focus timer with customizable work and break times."
        keywords="pomodoro timer, focus timer, productivity timer, pomodoro technique"
        canonicalUrl="/pomodoro-timer"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Work Time (minutes)</label>
                <Select
                  value={workTime.toString()}
                  onValueChange={(v) => {
                    setWorkTime(parseInt(v));
                    if (!isBreak) setTimeLeft(parseInt(v) * 60);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[15, 20, 25, 30, 45, 60].map((t) => (
                      <SelectItem key={t} value={t.toString()}>
                        {t} minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Break Time (minutes)</label>
                <Select
                  value={breakTime.toString()}
                  onValueChange={(v) => {
                    setBreakTime(parseInt(v));
                    if (isBreak) setTimeLeft(parseInt(v) * 60);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20].map((t) => (
                      <SelectItem key={t} value={t.toString()}>
                        {t} minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${isBreak ? "text-green-600 dark:text-green-400" : "text-primary"}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isBreak ? "Break Time" : "Work Time"}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${isBreak ? "bg-green-600" : "bg-primary"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {!isRunning ? (
                <Button onClick={start} className="flex-1" size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={pause} variant="outline" className="flex-1" size="lg">
                  <Square className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={reset} variant="outline" size="lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default PomodoroTimer;

