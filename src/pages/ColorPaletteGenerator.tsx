import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { AdBanner } from "@/components/AdBanner";
import { FAQ } from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Lock, Unlock, Palette } from "lucide-react";
import { toast } from "sonner";

interface ColorSwatch {
  hex: string;
  locked: boolean;
}

const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState<ColorSwatch[]>(
    Array(5).fill(null).map(() => ({ hex: generateRandomColor(), locked: false }))
  );

  const generatePalette = () => {
    setColors(colors.map(color => 
      color.locked ? color : { hex: generateRandomColor(), locked: false }
    ));
  };

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex}`);
  };

  const copyAllColors = () => {
    const allHex = colors.map(c => c.hex).join(', ');
    navigator.clipboard.writeText(allHex);
    toast.success("All colors copied!");
  };

  // Handle spacebar to generate
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      generatePalette();
    }
  };

  const faqs = [
    { question: "How do I generate new colors?", answer: "Click 'Generate' or press Spacebar for new random colors." },
    { question: "Can I keep colors I like?", answer: "Yes! Click the lock icon to keep a color when generating." },
    { question: "What color format is used?", answer: "Colors are in HEX format (e.g., #FF5733)." },
  ];

  return (
    <PageLayout title="Color Palette Generator" description="Generate beautiful color palettes instantly">
      <SEOHead
        title="Color Palette Generator - Create Beautiful Color Schemes"
        description="Generate stunning color palettes for your designs. Lock colors you like, copy hex codes, and create harmonious color schemes."
        keywords="color palette, color scheme, color generator, design colors, hex colors"
        canonicalUrl="https://utils.lovable.app/color-palette-generator"
      />
      <AdBanner format="horizontal" className="mb-6" />

      <Card className="glass-card" onKeyDown={handleKeyDown} tabIndex={0}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Color Palette
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-full aspect-[3/4] rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex)}
                />
                <div className="mt-2 text-center">
                  <code className="text-xs md:text-sm font-mono">{color.hex.toUpperCase()}</code>
                  <div className="flex gap-1 justify-center mt-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => toggleLock(index)}
                    >
                      {color.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => copyColor(color.hex)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={generatePalette} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" /> Generate (Spacebar)
            </Button>
            <Button variant="outline" onClick={copyAllColors}>
              <Copy className="h-4 w-4 mr-2" /> Copy All
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> to generate new colors
          </p>
        </CardContent>
      </Card>

      <AdBanner format="rectangle" className="my-6" />
      <FAQ items={faqs} />
    </PageLayout>
  );
};

export default ColorPaletteGenerator;
