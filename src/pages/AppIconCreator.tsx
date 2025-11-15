import { useState, useRef } from "react";
import { Image, Download, ArrowLeft, Type } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AppIconCreator = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#4F46E5");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const generateIcon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 512;
    canvas.height = 512;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 512, 512);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text.substring(0, 2).toUpperCase(), 256, 256);

    setPreviewUrl(canvas.toDataURL("image/png"));
    toast({ title: "Icon generated!" });
  };

  const downloadIcon = () => {
    if (!previewUrl) {
      toast({ title: "Generate an icon first", variant: "destructive" });
      return;
    }

    const link = document.createElement("a");
    link.download = "app-icon.png";
    link.href = previewUrl;
    link.click();
    toast({ title: "Icon downloaded!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            App Icon Creator
          </h1>
          <p className="text-muted-foreground">Create beautiful app icons instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Icon Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="text">Text (Max 2 characters)</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value.substring(0, 2))}
                  placeholder="AB"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    placeholder="#4F46E5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
              <Button onClick={generateIcon} className="w-full">
                <Image className="h-4 w-4 mr-2" />
                Generate Icon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="App icon preview" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-muted-foreground">Icon will appear here</p>
                )}
              </div>
              <Button onClick={downloadIcon} variant="outline" className="w-full" disabled={!previewUrl}>
                <Download className="h-4 w-4 mr-2" />
                Download Icon
              </Button>
            </CardContent>
          </Card>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default AppIconCreator;
