import { useState } from "react";
import { Image, Upload, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState([0.8]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      toast({ title: "Please select an image file", variant: "destructive" });
    }
  };

  const compress = () => {
    if (!file || !preview) return;

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressed(url);
              setCompressedSize(blob.size);
              toast({ title: "Image compressed!" });
            }
          },
          file.type,
          quality[0]
        );
      }
    };
    img.src = preview;
  };

  const download = () => {
    if (!compressed) return;
    const a = document.createElement("a");
    a.href = compressed;
    a.download = `compressed-${file?.name || "image"}`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const faqs = [
    { question: "How does image compression work?", answer: "We use HTML5 Canvas to compress images by adjusting quality. Higher quality means larger file size." },
    { question: "What image formats are supported?", answer: "We support JPEG, PNG, and WebP formats. The output format matches the input format." },
    { question: "Is the original image modified?", answer: "No, compression creates a new file. Your original image remains unchanged." },
  ];

  return (
    <PageLayout title="Image Compressor" description="Compress images to reduce file size">
      <SEOHead
        title="Image Compressor - Compress Images | Utility Master"
        description="Compress images to reduce file size while maintaining quality. Free and private."
        keywords="image compressor, compress images, reduce image size, image optimizer"
        canonicalUrl="/image-compressor"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Image Compressor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Upload Image</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload image</p>
                </label>
              </div>
            </div>

            {preview && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Original</Label>
                    <img src={preview} alt="Original" className="mt-2 rounded-lg border max-w-full" />
                    <p className="text-sm text-muted-foreground mt-2">Size: {formatSize(originalSize)}</p>
                  </div>
                  {compressed && (
                    <div>
                      <Label>Compressed</Label>
                      <img src={compressed} alt="Compressed" className="mt-2 rounded-lg border max-w-full" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Size: {formatSize(compressedSize)} ({((1 - compressedSize / originalSize) * 100).toFixed(1)}% reduction)
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Quality</Label>
                    <span className="text-sm">{Math.round(quality[0] * 100)}%</span>
                  </div>
                  <Slider value={quality} onValueChange={setQuality} min={0.1} max={1} step={0.1} />
                </div>

                <div className="flex gap-2">
                  <Button onClick={compress} className="flex-1">
                    Compress Image
                  </Button>
                  {compressed && (
                    <Button onClick={download} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default ImageCompressor;

