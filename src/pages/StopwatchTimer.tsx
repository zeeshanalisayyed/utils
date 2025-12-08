import { useState, useEffect, useRef, useCallback } from "react";
import { Timer, Play, Pause, RotateCcw, Flag, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const StopwatchTimer = () => {
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchInterval = useRef<NodeJS.Timeout | null>(null);

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const formatTimerDisplay = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Stopwatch functions
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchInterval.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else if (stopwatchInterval.current) {
      clearInterval(stopwatchInterval.current);
    }
    return () => {
      if (stopwatchInterval.current) clearInterval(stopwatchInterval.current);
    };
  }, [isStopwatchRunning]);

  const toggleStopwatch = () => setIsStopwatchRunning((prev) => !prev);
  
  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps((prev) => [stopwatchTime, ...prev]);
  };

  // Timer functions
  useEffect(() => {
    if (isTimerRunning && timerTime > 0) {
      timerInterval.current = setInterval(() => {
        setTimerTime((prev) => {
          if (prev <= 100) {
            clearInterval(timerInterval.current!);
            setIsTimerRunning(false);
            toast({ title: "Timer Complete!", description: "Your timer has finished." });
            // Play sound
            const audio = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU" + "a".repeat(1000));
            audio.play().catch(() => {});
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [isTimerRunning, timerTime, toast]);

  const startTimer = () => {
    if (!isTimerRunning && timerTime === 0) {
      setTimerTime((timerMinutes * 60 + timerSeconds) * 1000);
    }
    setIsTimerRunning(true);
  };

  const pauseTimer = () => setIsTimerRunning(false);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerTime(0);
  };

  const presetTimers = [
    { label: "1 min", minutes: 1, seconds: 0 },
    { label: "5 min", minutes: 5, seconds: 0 },
    { label: "10 min", minutes: 10, seconds: 0 },
    { label: "15 min", minutes: 15, seconds: 0 },
    { label: "30 min", minutes: 30, seconds: 0 },
    { label: "1 hour", minutes: 60, seconds: 0 },
  ];

  const faqs = [
    { question: "How accurate is the stopwatch?", answer: "The stopwatch updates every 10 milliseconds, providing centisecond precision for timing activities." },
    { question: "Can I use multiple laps?", answer: "Yes! Click the Lap button while the stopwatch is running to record split times. All laps are displayed in order." },
    { question: "Will the timer notify me?", answer: "Yes, when the timer reaches zero, you'll receive a notification and an audio alert (if your device supports it)." },
  ];

  return (
    <PageLayout title="Stopwatch & Timer" description="Precise timing for any activity">
      <SEOHead
        title="Stopwatch & Timer - Free Online Timer | Utility Master"
        description="Free online stopwatch with lap timing and countdown timer. Precise to centiseconds with audio alerts."
        keywords="stopwatch, timer, countdown timer, lap timer, online stopwatch"
        canonicalUrl="/stopwatch-timer"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="stopwatch" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="stopwatch" className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Stopwatch
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stopwatch">
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Stopwatch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-6xl md:text-7xl font-mono font-bold text-foreground">
                    {formatTime(stopwatchTime)}
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <Button
                    onClick={toggleStopwatch}
                    size="lg"
                    className={isStopwatchRunning ? "bg-destructive hover:bg-destructive/90" : ""}
                  >
                    {isStopwatchRunning ? (
                      <><Pause className="h-5 w-5 mr-2" />Pause</>
                    ) : (
                      <><Play className="h-5 w-5 mr-2" />Start</>
                    )}
                  </Button>
                  <Button onClick={addLap} variant="outline" size="lg" disabled={!isStopwatchRunning}>
                    <Flag className="h-5 w-5 mr-2" />
                    Lap
                  </Button>
                  <Button onClick={resetStopwatch} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {laps.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Laps</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {laps.map((lap, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                        >
                          <span className="text-muted-foreground">Lap {laps.length - i}</span>
                          <span className="font-mono font-medium">{formatTime(lap)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timer">
            <Card className="border-border mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Countdown Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-6xl md:text-7xl font-mono font-bold text-foreground">
                    {formatTimerDisplay(timerTime || (timerMinutes * 60 + timerSeconds) * 1000)}
                  </div>
                </div>

                {!isTimerRunning && timerTime === 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minutes">Minutes</Label>
                        <Input
                          id="minutes"
                          type="number"
                          min="0"
                          max="999"
                          value={timerMinutes}
                          onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="seconds">Seconds</Label>
                        <Input
                          id="seconds"
                          type="number"
                          min="0"
                          max="59"
                          value={timerSeconds}
                          onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {presetTimers.map((preset) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTimerMinutes(preset.minutes);
                            setTimerSeconds(preset.seconds);
                          }}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-center gap-3">
                  {isTimerRunning ? (
                    <Button onClick={pauseTimer} size="lg" className="bg-destructive hover:bg-destructive/90">
                      <Pause className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button onClick={startTimer} size="lg" disabled={timerMinutes === 0 && timerSeconds === 0 && timerTime === 0}>
                      <Play className="h-5 w-5 mr-2" />
                      {timerTime > 0 ? "Resume" : "Start"}
                    </Button>
                  )}
                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default StopwatchTimer;
