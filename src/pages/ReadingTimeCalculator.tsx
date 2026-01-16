import { useState, useMemo } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { AdBanner } from "@/components/AdBanner";
import { FAQ } from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Clock, BookOpen, Zap, Coffee } from "lucide-react";

const ReadingTimeCalculator = () => {
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(200); // Words per minute

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    
    const readingMinutes = words / wpm;
    const speakingMinutes = words / 150; // Average speaking pace
    
    return {
      words,
      characters,
      sentences,
      readingTime: readingMinutes,
      speakingTime: speakingMinutes,
    };
  }, [text, wpm]);

  const formatTime = (minutes: number): string => {
    if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const faqs = [
    { question: "What is average reading speed?", answer: "Adults read 200-250 words per minute on average. Speed readers can reach 400+ WPM." },
    { question: "How is speaking time calculated?", answer: "Based on average speaking pace of 150 words per minute." },
    { question: "Why adjust reading speed?", answer: "Technical content may require slower reading (150 WPM), while simple content can be faster (300+ WPM)." },
  ];

  return (
    <PageLayout title="Reading Time Calculator" description="Estimate how long it takes to read your content">
      <SEOHead
        title="Reading Time Calculator - Estimate Reading Duration"
        description="Calculate reading time for articles, blog posts, and documents. Adjust for different reading speeds."
        keywords="reading time, reading speed, words per minute, content length, article reading time"
        canonicalUrl="https://utils.lovable.app/reading-time-calculator"
      />
      <AdBanner format="horizontal" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Your Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Paste your article, blog post, or any text here..."
                rows={12}
                className="resize-none"
              />
              
              <div className="mt-4">
                <Label>Reading Speed: {wpm} WPM</Label>
                <Slider
                  value={[wpm]}
                  onValueChange={([v]) => setWpm(v)}
                  min={100}
                  max={500}
                  step={10}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow (100)</span>
                  <span>Average (200)</span>
                  <span>Fast (500)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{formatTime(stats.readingTime)}</div>
                  <div className="text-sm text-muted-foreground">Reading Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">{formatTime(stats.speakingTime)}</div>
                  <div className="text-sm text-muted-foreground">Speaking Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Words</span>
                <span className="font-semibold">{stats.words.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Characters</span>
                <span className="font-semibold">{stats.characters.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sentences</span>
                <span className="font-semibold">{stats.sentences}</span>
              </div>
            </CardContent>
          </Card>

          <AdBanner format="rectangle" />
        </div>
      </div>

      <FAQ items={faqs} />
    </PageLayout>
  );
};

export default ReadingTimeCalculator;
