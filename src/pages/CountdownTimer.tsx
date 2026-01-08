import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { toast } from "sonner";

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success("Time's up!", { duration: 5000 });
            // Play sound
            try {
              const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQQoAAABhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQQoAAA=");
              audio.play().catch(() => {});
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, totalSeconds]);

  const startTimer = () => {
    if (!hasStarted) {
      const total = hours * 3600 + minutes * 60 + seconds;
      if (total <= 0) {
        toast.error("Please set a time greater than 0");
        return;
      }
      setTotalSeconds(total);
      setHasStarted(true);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTotalSeconds(0);
  };

  const addTime = (addSeconds: number) => {
    setTotalSeconds((prev) => prev + addSeconds);
  };

  const formatTime = (total: number) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return {
      hours: h.toString().padStart(2, "0"),
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  };

  const displayTime = hasStarted ? formatTime(totalSeconds) : {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };

  const progress = hasStarted && hours * 3600 + minutes * 60 + seconds > 0
    ? (totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100
    : 100;

  const faqs = [
    { question: "Does the timer work in the background?", answer: "Yes, the timer continues running even if you switch tabs or minimize the browser." },
    { question: "Will I get notified when time's up?", answer: "Yes, you'll receive an audio alert and a notification when the countdown reaches zero." },
    { question: "Can I add more time during countdown?", answer: "Yes, use the quick add buttons to add 1, 5, or 10 minutes to the running timer." },
  ];

  return (
    <PageLayout title="Countdown Timer" description="Set a countdown timer with alerts">
      <SEOHead
        title="Countdown Timer - Online Timer with Alerts | Utility Master"
        description="Free online countdown timer. Set custom timers with audio alerts. Perfect for cooking, workouts, and productivity."
        keywords="countdown timer, online timer, timer with alarm, kitchen timer, workout timer"
        canonicalUrl="/countdown-timer"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Countdown Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-xl bg-primary/10 transition-all duration-1000"
                style={{ 
                  clipPath: `inset(0 ${100 - progress}% 0 0)`,
                  opacity: hasStarted ? 1 : 0
                }}
              />
              <div className="relative flex justify-center items-center gap-2 py-8 px-4 rounded-xl bg-muted/50 border">
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-mono font-bold">{displayTime.hours}</span>
                  <p className="text-sm text-muted-foreground">Hours</p>
                </div>
                <span className="text-6xl md:text-8xl font-mono font-bold">:</span>
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-mono font-bold">{displayTime.minutes}</span>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
                <span className="text-6xl md:text-8xl font-mono font-bold">:</span>
                <div className="text-center">
                  <span className="text-6xl md:text-8xl font-mono font-bold">{displayTime.seconds}</span>
                  <p className="text-sm text-muted-foreground">Seconds</p>
                </div>
              </div>
            </div>

            {/* Input Controls (only show when not started) */}
            {!hasStarted && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Hours</Label>
                  <Input
                    type="number"
                    min="0"
                    max="99"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-2 text-center text-lg"
                  />
                </div>
                <div>
                  <Label>Minutes</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="mt-2 text-center text-lg"
                  />
                </div>
                <div>
                  <Label>Seconds</Label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="mt-2 text-center text-lg"
                  />
                </div>
              </div>
            )}

            {/* Quick Add Buttons (only show when running) */}
            {hasStarted && (
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => addTime(60)}>
                  <Plus className="h-4 w-4 mr-1" /> 1 min
                </Button>
                <Button variant="outline" size="sm" onClick={() => addTime(300)}>
                  <Plus className="h-4 w-4 mr-1" /> 5 min
                </Button>
                <Button variant="outline" size="sm" onClick={() => addTime(600)}>
                  <Plus className="h-4 w-4 mr-1" /> 10 min
                </Button>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <Button onClick={startTimer} size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  {hasStarted ? "Resume" : "Start"}
                </Button>
              ) : (
                <Button onClick={pauseTimer} size="lg" variant="secondary" className="gap-2">
                  <Pause className="h-5 w-5" />
                  Pause
                </Button>
              )}
              <Button onClick={resetTimer} size="lg" variant="outline" className="gap-2">
                <RotateCcw className="h-5 w-5" />
                Reset
              </Button>
            </div>

            {/* Preset Buttons */}
            {!hasStarted && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setHours(0); setMinutes(5); setSeconds(0); }}>5 min</Button>
                <Button variant="ghost" size="sm" onClick={() => { setHours(0); setMinutes(10); setSeconds(0); }}>10 min</Button>
                <Button variant="ghost" size="sm" onClick={() => { setHours(0); setMinutes(15); setSeconds(0); }}>15 min</Button>
                <Button variant="ghost" size="sm" onClick={() => { setHours(0); setMinutes(25); setSeconds(0); }}>25 min</Button>
                <Button variant="ghost" size="sm" onClick={() => { setHours(0); setMinutes(30); setSeconds(0); }}>30 min</Button>
                <Button variant="ghost" size="sm" onClick={() => { setHours(1); setMinutes(0); setSeconds(0); }}>1 hour</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default CountdownTimer;
