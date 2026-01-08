import { useState } from "react";
import { Palette, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const ColorContrastChecker = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = () => {
    const fg = hexToRgb(foreground);
    const bg = hexToRgb(background);
    
    if (!fg || !bg) return 1;

    const l1 = getLuminance(fg.r, fg.g, fg.b);
    const l2 = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = getContrastRatio();
  const wcagAA = ratio >= 4.5;
  const wcagAAA = ratio >= 7;
  const wcagAALarge = ratio >= 3;

  const getGrade = () => {
    if (wcagAAA) return { grade: "AAA", color: "text-green-600 dark:text-green-400", icon: <CheckCircle2 className="h-5 w-5" /> };
    if (wcagAA) return { grade: "AA", color: "text-green-600 dark:text-green-400", icon: <CheckCircle2 className="h-5 w-5" /> };
    if (wcagAALarge) return { grade: "AA (Large)", color: "text-yellow-600 dark:text-yellow-400", icon: <AlertTriangle className="h-5 w-5" /> };
    return { grade: "Fail", color: "text-red-600 dark:text-red-400", icon: <XCircle className="h-5 w-5" /> };
  };

  const result = getGrade();

  const faqs = [
    { question: "What is WCAG?", answer: "WCAG (Web Content Accessibility Guidelines) are standards for making web content more accessible. They define minimum contrast ratios for text." },
    { question: "What contrast ratio is recommended?", answer: "WCAG 2.0 requires 4.5:1 for normal text (AA) and 7:1 for enhanced contrast (AAA). Large text requires 3:1 minimum." },
    { question: "What counts as large text?", answer: "Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) if bold." },
  ];

  return (
    <PageLayout title="Color Contrast Checker" description="Check WCAG color contrast compliance">
      <SEOHead
        title="Color Contrast Checker - WCAG Accessibility | Utility Master"
        description="Free WCAG color contrast checker. Ensure your text colors meet accessibility standards for AA and AAA compliance."
        keywords="color contrast checker, WCAG, accessibility, color contrast ratio, a11y"
        canonicalUrl="/color-contrast-checker"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Contrast Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Foreground (Text)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Background</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div 
              className="p-8 rounded-lg border"
              style={{ backgroundColor: background }}
            >
              <p 
                className="text-2xl font-bold mb-2"
                style={{ color: foreground }}
              >
                Sample Text
              </p>
              <p 
                className="text-base"
                style={{ color: foreground }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border text-center">
                <p className="text-sm text-muted-foreground">Contrast Ratio</p>
                <p className="text-3xl font-bold text-primary">{ratio.toFixed(2)}:1</p>
              </div>

              <div className={`p-4 rounded-lg border text-center ${result.color}`}>
                <p className="text-sm opacity-70">WCAG Grade</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  {result.icon}
                  <p className="text-3xl font-bold">{result.grade}</p>
                </div>
              </div>
            </div>

            {/* Compliance Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span>Normal Text (AA - 4.5:1)</span>
                {wcagAA ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span>Normal Text (AAA - 7:1)</span>
                {wcagAAA ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span>Large Text (AA - 3:1)</span>
                {wcagAALarge ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default ColorContrastChecker;
