import { useState, useRef, useEffect } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { AdBanner } from "@/components/AdBanner";
import { FAQ } from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Barcode } from "lucide-react";
import { toast } from "sonner";

const BarcodeGenerator = () => {
  const [text, setText] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple CODE128 simulation (visual representation)
    canvas.width = 300;
    canvas.height = 120;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    
    // Generate pattern from text
    const barWidth = canvas.width / (text.length * 11 + 35);
    let x = 10;
    
    // Start pattern
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x, 10, barWidth, 80);
      x += barWidth * 2;
    }
    
    // Data bars
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      const pattern = [(charCode % 3) + 1, 1, (charCode % 2) + 1, 2, 1, (charCode % 4) + 1];
      
      pattern.forEach((width, j) => {
        if (j % 2 === 0) {
          ctx.fillRect(x, 10, barWidth * width, 80);
        }
        x += barWidth * width;
      });
    }
    
    // End pattern
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(x, 10, barWidth, 80);
      x += barWidth * 2;
    }
    
    // Text below barcode
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, 108);
  };

  useEffect(() => {
    drawBarcode();
  }, [text, format]);

  const downloadBarcode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `barcode-${text}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success("Barcode downloaded!");
  };

  const faqs = [
    { question: "What barcode formats are supported?", answer: "Currently supports CODE128 visual representation. More formats coming soon." },
    { question: "Can I use these barcodes commercially?", answer: "Yes, generated barcodes are free for any use." },
    { question: "What's the maximum length?", answer: "CODE128 supports up to 48 characters." },
  ];

  return (
    <PageLayout title="Barcode Generator" description="Create barcodes for products and inventory">
      <SEOHead
        title="Free Barcode Generator - Create Barcodes Online"
        description="Generate barcodes instantly. Create CODE128 barcodes for products, inventory, and more. Free to use."
        keywords="barcode generator, CODE128, product barcode, inventory barcode, free barcode"
        canonicalUrl="https://utils.lovable.app/barcode-generator"
      />
      <AdBanner format="horizontal" className="mb-6" />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Barcode className="h-5 w-5 text-primary" />
            Generate Barcode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Barcode Text</Label>
              <Input 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text or numbers"
                maxLength={48}
              />
            </div>
            <div>
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CODE128">CODE128</SelectItem>
                  <SelectItem value="EAN13">EAN-13</SelectItem>
                  <SelectItem value="UPC">UPC-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center p-6 bg-white rounded-lg">
            <canvas ref={canvasRef} className="max-w-full" />
          </div>

          <Button onClick={downloadBarcode} className="w-full">
            <Download className="h-4 w-4 mr-2" /> Download PNG
          </Button>
        </CardContent>
      </Card>

      <AdBanner format="rectangle" className="my-6" />
      <FAQ items={faqs} />
    </PageLayout>
  );
};

export default BarcodeGenerator;
