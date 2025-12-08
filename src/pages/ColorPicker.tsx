import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const ColorPicker = () => {
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState("");
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CSS Variable", value: `--color: ${color};` },
    { label: "Tailwind", value: `bg-[${color}]` },
  ];

  const copyToClipboard = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    toast({ title: `${label} copied!` });
    setTimeout(() => setCopied(""), 2000);
  };

  const generateShades = () => {
    const shades = [];
    for (let i = 9; i >= 1; i--) {
      const hslShade = { ...hsl, l: Math.min(95, hsl.l + (9 - i) * 8) };
      shades.push(`hsl(${hslShade.h}, ${hslShade.s}%, ${hslShade.l}%)`);
    }
    shades.push(color);
    for (let i = 1; i <= 4; i++) {
      const hslShade = { ...hsl, l: Math.max(5, hsl.l - i * 10) };
      shades.push(`hsl(${hslShade.h}, ${hslShade.s}%, ${hslShade.l}%)`);
    }
    return shades;
  };

  const complementaryColor = `hsl(${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const analogous1 = `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const analogous2 = `hsl(${(hsl.h - 30 + 360) % 360}, ${hsl.s}%, ${hsl.l}%)`;

  const faqs = [
    { question: "What color formats are supported?", answer: "We support HEX, RGB, RGBA, HSL, CSS variables, and Tailwind CSS formats. All are copyable with one click." },
    { question: "How do color harmonies work?", answer: "Complementary colors are opposite on the color wheel. Analogous colors are adjacent. These create pleasing color combinations." },
    { question: "What are color shades?", answer: "Shades are lighter and darker versions of your chosen color, useful for creating depth and hierarchy in designs." },
  ];

  return (
    <PageLayout title="Color Picker" description="Pick colors and get all formats instantly">
      <SEOHead
        title="Color Picker - HEX, RGB, HSL Converter | Utility Master"
        description="Pick any color and get HEX, RGB, HSL, and CSS values. Generate color shades and harmonies for your designs."
        keywords="color picker, hex to rgb, color converter, css colors, color palette generator"
        canonicalUrl="/color-picker"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Pick a Color
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-32 h-32 rounded-xl cursor-pointer border-2 border-border"
                />
              </div>
              <div className="flex-1 w-full">
                <Label htmlFor="hex-input">HEX Value</Label>
                <Input
                  id="hex-input"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formats.map((format) => (
                <div
                  key={format.label}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">{format.label}</p>
                    <p className="font-mono text-sm truncate max-w-[180px]">{format.value}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(format.value, format.label)}
                  >
                    {copied === format.label ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle>Color Shades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {generateShades().map((shade, i) => (
                <button
                  key={i}
                  onClick={() => copyToClipboard(shade, "Shade")}
                  className="w-12 h-12 rounded-lg border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: shade }}
                  title={shade}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle>Color Harmonies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border mb-2"
                  style={{ backgroundColor: color }}
                />
                <p className="text-sm text-muted-foreground">Original</p>
              </div>
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border mb-2"
                  style={{ backgroundColor: complementaryColor }}
                />
                <p className="text-sm text-muted-foreground">Complementary</p>
              </div>
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border mb-2"
                  style={{ backgroundColor: analogous1 }}
                />
                <p className="text-sm text-muted-foreground">Analogous 1</p>
              </div>
              <div className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-border mb-2"
                  style={{ backgroundColor: analogous2 }}
                />
                <p className="text-sm text-muted-foreground">Analogous 2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default ColorPicker;
