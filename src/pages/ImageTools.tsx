import { useState, useRef } from "react";
import { Image, Download, ArrowLeft, Maximize2, Minimize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";

const ImageTools = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<string>("");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(800);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          setImage(e.target?.result as string);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      toast({ title: "Image uploaded successfully" });
    }
  };

  const resizeImage = () => {
    if (!image) {
      toast({ title: "Please upload an image first", variant: "destructive" });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      toast({ title: "Image resized!" });
    };
    img.src = image;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast({ title: "Resize the image first", variant: "destructive" });
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "resized-image.png";
        link.href = url;
        link.click();
        toast({ title: "Image downloaded!" });
      }
    });
  };

  const makeSquare = () => {
    const size = Math.min(width, height);
    setWidth(size);
    setHeight(size);
    toast({ title: "Dimensions set to square" });
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AdBanner />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Image Tools
          </h1>
          <p className="text-muted-foreground">Resize, compress, and transform images</p>
        </div>

        <Tabs defaultValue="resize" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resize">Resize</TabsTrigger>
            <TabsTrigger value="square">Square</TabsTrigger>
            <TabsTrigger value="compress">Compress</TabsTrigger>
          </TabsList>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                <Image className="h-4 w-4 mr-2" />
                Select Image
              </Button>
            </CardContent>
          </Card>

          <TabsContent value="resize" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Resize Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={resizeImage} className="flex-1">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Resize
                  </Button>
                  <Button onClick={downloadImage} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="square" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Make Square</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Convert your image to a perfect square format
                </p>
                <Button onClick={makeSquare} className="w-full">
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Make Square
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compress" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Minimize2 className="h-5 w-5" />
                  Compress Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Reduce image file size while maintaining quality
                </p>
                <Button onClick={() => {
                  if (!image) {
                    toast({ title: "Please upload an image first", variant: "destructive" });
                    return;
                  }
                  const canvas = canvasRef.current;
                  if (!canvas) return;
                  const ctx = canvas.getContext("2d");
                  if (!ctx) return;
                  const img = new window.Image();
                  img.onload = () => {
                    // Resize to max 1920px while maintaining aspect ratio
                    const maxSize = 1920;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxSize || height > maxSize) {
                      if (width > height) {
                        height = (height / width) * maxSize;
                        width = maxSize;
                      } else {
                        width = (width / height) * maxSize;
                        height = maxSize;
                      }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Use lower quality for better compression
                    canvas.toBlob((blob) => {
                      if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.download = "compressed-image.jpg";
                        link.href = url;
                        link.click();
                        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                        toast({ 
                          title: "Compressed image downloaded!",
                          description: `File size: ${sizeMB} MB`
                        });
                      }
                    }, "image/jpeg", 0.5);
                  };
                  img.src = image;
                }} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Compress & Download
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {image && (
          <Card className="border-border mt-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={image} alt="Preview" className="max-w-full h-auto rounded-lg" />
            </CardContent>
          </Card>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
};

export default ImageTools;
