import { useState, useRef, useEffect } from "react";
import { QrCode, Download, Copy, Link, Mail, Phone, Wifi, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrType, setQrType] = useState("url");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQR = async (data: string) => {
    if (!data) {
      setQrDataUrl("");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    // Simple QR code generation using a pattern (for demo, in production use a library)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Create QR using Google Chart API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      setQrDataUrl(canvas.toDataURL("image/png"));
    };
    img.src = qrUrl;
  };

  useEffect(() => {
    let data = "";
    switch (qrType) {
      case "url":
        data = text;
        break;
      case "wifi":
        if (wifiName) {
          data = `WIFI:T:WPA;S:${wifiName};P:${wifiPassword};;`;
        }
        break;
      case "email":
        if (email) {
          data = `mailto:${email}`;
        }
        break;
      case "phone":
        if (phone) {
          data = `tel:${phone}`;
        }
        break;
      default:
        data = text;
    }
    generateQR(data);
  }, [text, qrType, wifiName, wifiPassword, email, phone]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = qrDataUrl;
    link.click();
    toast({ title: "QR Code downloaded!" });
  };

  const copyQR = async () => {
    if (!qrDataUrl) return;
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast({ title: "QR Code copied to clipboard!" });
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const faqs = [
    { question: "What is a QR Code?", answer: "A QR (Quick Response) code is a 2D barcode that can store URLs, text, contact info, WiFi credentials, and more. Scan with any smartphone camera." },
    { question: "How do I scan a QR Code?", answer: "Open your phone's camera app and point it at the QR code. A notification will appear to open the link or content." },
    { question: "Can I create QR codes for WiFi?", answer: "Yes! Use the WiFi tab to enter your network name and password. Guests can scan to connect without typing the password." },
  ];

  return (
    <PageLayout title="QR Code Generator" description="Create QR codes for URLs, WiFi, contacts, and more">
      <SEOHead
        title="Free QR Code Generator - Create Custom QR Codes | Utility Master"
        description="Generate QR codes for URLs, WiFi networks, emails, and phone numbers. Free, instant, and downloadable."
        keywords="qr code generator, create qr code, wifi qr code, url qr code, free qr generator"
        canonicalUrl="/qr-code-generator"
      />
      <AdBanner />
      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Generate QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={qrType} onValueChange={setQrType} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="url" className="flex items-center gap-1">
                  <Link className="h-4 w-4" />
                  <span className="hidden sm:inline">URL</span>
                </TabsTrigger>
                <TabsTrigger value="wifi" className="flex items-center gap-1">
                  <Wifi className="h-4 w-4" />
                  <span className="hidden sm:inline">WiFi</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="url-input">URL or Text</Label>
                  <Input
                    id="url-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com or any text"
                  />
                </div>
              </TabsContent>

              <TabsContent value="wifi" className="space-y-4">
                <div>
                  <Label htmlFor="wifi-name">Network Name (SSID)</Label>
                  <Input
                    id="wifi-name"
                    value={wifiName}
                    onChange={(e) => setWifiName(e.target.value)}
                    placeholder="Your WiFi name"
                  />
                </div>
                <div>
                  <Label htmlFor="wifi-password">Password</Label>
                  <Input
                    id="wifi-password"
                    type="password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="WiFi password"
                  />
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="email-input">Email Address</Label>
                  <Input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <div>
                  <Label htmlFor="phone-input">Phone Number</Label>
                  <Input
                    id="phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {qrDataUrl && (
              <div className="mt-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-soft mb-4">
                  <img src={qrDataUrl} alt="Generated QR Code" className="w-64 h-64" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={downloadQR}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={copyQR}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default QrCodeGenerator;
