import { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const CssGradientGenerator = () => {
  const [type, setType] = useState("linear");
  const [direction, setDirection] = useState("to right");
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState([90]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getGradientCSS = () => {
    if (type === "linear") {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const getGradientStyle = () => {
    if (type === "linear") {
      return { background: `linear-gradient(${direction}, ${color1}, ${color2})` };
    } else {
      return { background: `radial-gradient(circle, ${color1}, ${color2})` };
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getGradientCSS());
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const directions = [
    { value: "to right", label: "To Right" },
    { value: "to left", label: "To Left" },
    { value: "to bottom", label: "To Bottom" },
    { value: "to top", label: "To Top" },
    { value: "to bottom right", label: "To Bottom Right" },
    { value: "to bottom left", label: "To Bottom Left" },
    { value: "to top right", label: "To Top Right" },
    { value: "to top left", label: "To Top Left" },
  ];

  const faqs = [
    { question: "What gradient types are supported?", answer: "We support linear and radial gradients with customizable colors and directions." },
    { question: "Can I use the generated CSS directly?", answer: "Yes, the generated CSS can be copied and used directly in your stylesheets." },
    { question: "Can I add more colors?", answer: "Currently, we support two-color gradients. Multi-color support may be added in the future." },
  ];

  return (
    <PageLayout title="CSS Gradient Generator" description="Generate beautiful CSS gradients">
      <SEOHead
        title="CSS Gradient Generator - Create CSS Gradients | Utility Master"
        description="Generate beautiful CSS gradients with custom colors and directions. Free and instant."
        keywords="css gradient generator, gradient maker, css gradients, linear gradient"
        canonicalUrl="/css-gradient-generator"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              CSS Gradient Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Gradient Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {type === "linear" && (
                <div>
                  <Label>Direction</Label>
                  <Select value={direction} onValueChange={setDirection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {directions.map((dir) => (
                        <SelectItem key={dir.value} value={dir.value}>
                          {dir.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Color 1</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <Label>Color 2</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="h-64 rounded-lg border-2 border-dashed" style={getGradientStyle()} />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>CSS Code</Label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border">
                <code className="text-sm font-mono">{getGradientCSS()}</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default CssGradientGenerator;

