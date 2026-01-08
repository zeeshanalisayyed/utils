import { useState } from "react";
import { Ratio, Lock, Unlock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const commonRatios = [
  { name: "16:9", desc: "HD/4K Video" },
  { name: "4:3", desc: "Classic TV" },
  { name: "1:1", desc: "Square" },
  { name: "21:9", desc: "Ultrawide" },
  { name: "9:16", desc: "Mobile/Stories" },
  { name: "3:2", desc: "DSLR Photo" },
];

const AspectRatioCalculator = () => {
  const [width1, setWidth1] = useState(1920);
  const [height1, setHeight1] = useState(1080);
  const [width2, setWidth2] = useState<number | "">("");
  const [height2, setHeight2] = useState<number | "">("");
  const [locked, setLocked] = useState<"width" | "height">("height");

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const getAspectRatio = () => {
    const divisor = gcd(width1, height1);
    return `${width1 / divisor}:${height1 / divisor}`;
  };

  const calculateDimension = () => {
    const ratio = width1 / height1;
    
    if (locked === "height" && width2) {
      setHeight2(Math.round(Number(width2) / ratio));
    } else if (locked === "width" && height2) {
      setWidth2(Math.round(Number(height2) * ratio));
    }
  };

  const applyRatio = (ratioStr: string) => {
    const [w, h] = ratioStr.split(":").map(Number);
    setWidth1(w * 100);
    setHeight1(h * 100);
    setWidth2("");
    setHeight2("");
  };

  const faqs = [
    { question: "What is aspect ratio?", answer: "Aspect ratio is the proportional relationship between width and height. Common examples are 16:9 for widescreen video and 4:3 for classic TV." },
    { question: "Why is aspect ratio important?", answer: "It ensures images and videos display correctly without stretching or cropping. Different platforms prefer different ratios." },
    { question: "What ratio should I use for social media?", answer: "Instagram: 1:1 (feed) or 9:16 (stories), YouTube: 16:9, TikTok: 9:16, Twitter: 16:9 or 1:1." },
  ];

  return (
    <PageLayout title="Aspect Ratio Calculator" description="Calculate and convert aspect ratios">
      <SEOHead
        title="Aspect Ratio Calculator - Calculate Image & Video Ratios | Utility Master"
        description="Free aspect ratio calculator. Calculate aspect ratios and resize dimensions while maintaining proportions."
        keywords="aspect ratio calculator, image ratio, video aspect ratio, 16:9 calculator, resize calculator"
        canonicalUrl="/aspect-ratio-calculator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ratio className="h-5 w-5" />
              Aspect Ratio Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Original Dimensions */}
            <div>
              <Label className="text-base font-semibold">Original Dimensions</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label className="text-sm text-muted-foreground">Width</Label>
                  <Input
                    type="number"
                    value={width1}
                    onChange={(e) => setWidth1(Number(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Height</Label>
                  <Input
                    type="number"
                    value={height1}
                    onChange={(e) => setHeight1(Number(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Aspect Ratio Display */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">Aspect Ratio</p>
              <p className="text-3xl font-bold text-primary">{getAspectRatio()}</p>
            </div>

            {/* Common Ratios */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Common Ratios</Label>
              <div className="grid grid-cols-3 gap-2">
                {commonRatios.map((ratio) => (
                  <Button
                    key={ratio.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyRatio(ratio.name)}
                    className="flex flex-col h-auto py-2"
                  >
                    <span className="font-semibold">{ratio.name}</span>
                    <span className="text-xs text-muted-foreground">{ratio.desc}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* New Dimensions */}
            <div>
              <Label className="text-base font-semibold">Resize (Maintain Ratio)</Label>
              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 mt-2 items-end">
                <div>
                  <Label className="text-sm text-muted-foreground">New Width</Label>
                  <Input
                    type="number"
                    value={width2}
                    onChange={(e) => {
                      setWidth2(e.target.value ? Number(e.target.value) : "");
                      setLocked("height");
                    }}
                    placeholder="Enter width"
                    className="mt-1"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocked(locked === "width" ? "height" : "width")}
                  title={`Lock ${locked}`}
                >
                  {locked === "height" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>

                <div>
                  <Label className="text-sm text-muted-foreground">New Height</Label>
                  <Input
                    type="number"
                    value={height2}
                    onChange={(e) => {
                      setHeight2(e.target.value ? Number(e.target.value) : "");
                      setLocked("width");
                    }}
                    placeholder="Enter height"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button onClick={calculateDimension} className="w-full mt-4">
                Calculate
              </Button>
            </div>

            {/* Preview */}
            <div className="flex justify-center">
              <div 
                className="border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center text-muted-foreground"
                style={{
                  width: Math.min(200, width1 / Math.max(width1, height1) * 200),
                  height: Math.min(200, height1 / Math.max(width1, height1) * 200),
                }}
              >
                <span className="text-xs">{getAspectRatio()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default AspectRatioCalculator;
