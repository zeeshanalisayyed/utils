import { useState, useRef, useEffect } from "react";
import { Video, Upload, Download, RefreshCw, CheckCircle2, AlertCircle, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

const VideoConverter = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [quality, setQuality] = useState("medium");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const formats = [
    { value: "mp4", label: "MP4", description: "Most compatible, web-friendly" },
    { value: "webm", label: "WebM", description: "Best for web, smaller size" },
    { value: "avi", label: "AVI", description: "Windows compatible" },
    { value: "mov", label: "MOV", description: "Apple/QuickTime format" },
    { value: "mkv", label: "MKV", description: "High quality, multiple tracks" },
    { value: "gif", label: "GIF", description: "Animated image (no audio)" },
  ];

  const qualityOptions = [
    { value: "low", label: "Low", crf: "35", description: "Smaller file, lower quality" },
    { value: "medium", label: "Medium", crf: "28", description: "Balanced size and quality" },
    { value: "high", label: "High", crf: "20", description: "Larger file, better quality" },
    { value: "original", label: "Original", crf: "0", description: "Lossless quality" },
  ];

  const faqs = [
    { question: "How does the video converter work?", answer: "We use FFmpeg running directly in your browser via WebAssembly. Your video files never leave your device - all processing happens locally on your computer." },
    { question: "What's the maximum file size?", answer: "The limit depends on your browser's memory. For best results, keep videos under 500MB. Larger files may cause browser memory issues." },
    { question: "Why is conversion slow?", answer: "Browser-based video processing is slower than desktop apps since it runs in WebAssembly. Larger files and higher quality settings take longer." },
    { question: "Which format should I choose?", answer: "MP4 is most compatible for sharing. WebM is best for web. MOV for Apple devices. MKV for archiving with multiple audio tracks." },
    { question: "Is my video uploaded anywhere?", answer: "No! All processing happens in your browser. Your files never leave your device. This is 100% private and works offline once loaded." },
  ];

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    try {
      setLoadError("");
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });
      ffmpeg.on("progress", ({ progress: p }) => setProgress(Math.round(p * 100)));
      ffmpeg.on("log", ({ message }) => console.log("FFmpeg:", message));
      setFfmpegLoaded(true);
      toast({ title: "Video converter ready!", description: "You can now upload and convert videos" });
    } catch (error) {
      console.error("Failed to load FFmpeg:", error);
      setLoadError("Failed to load video converter. Please refresh the page or try a different browser.");
      toast({ title: "Failed to load converter", description: "Please refresh the page", variant: "destructive" });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setConvertedUrl("");
      setConvertedSize(0);
      
      // Create video preview
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      
      toast({ title: "Video uploaded", description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)` });
    } else {
      toast({ title: "Invalid file", description: "Please upload a valid video file", variant: "destructive" });
    }
  };

  const getFFmpegArgs = () => {
    const selectedQuality = qualityOptions.find(q => q.value === quality);
    const args = ["-i", "input.video"];
    
    if (outputFormat === "gif") {
      // Special handling for GIF
      args.push("-vf", "fps=10,scale=480:-1:flags=lanczos");
      args.push("-c:v", "gif");
    } else if (outputFormat === "webm") {
      args.push("-c:v", "libvpx-vp9");
      args.push("-crf", selectedQuality?.crf || "28");
      args.push("-b:v", "0");
    } else {
      // For mp4, avi, mov, mkv
      if (quality !== "original") {
        args.push("-crf", selectedQuality?.crf || "28");
      }
    }
    
    args.push(`output.${outputFormat}`);
    return args;
  };

  const handleConvert = async () => {
    if (!videoFile) {
      toast({ title: "No video selected", description: "Please upload a video file first", variant: "destructive" });
      return;
    }
    if (!ffmpegLoaded) {
      toast({ title: "Converter not ready", description: "Please wait for the converter to load", variant: "destructive" });
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setConvertedUrl("");
    setConvertedSize(0);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.video";
      const outputName = `output.${outputFormat}`;
      
      // Write input file
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
      
      // Execute conversion with quality settings
      const args = getFFmpegArgs();
      console.log("FFmpeg args:", args);
      await ffmpeg.exec(args);
      
      // Read output file
      const data = await ffmpeg.readFile(outputName);
      const mimeType = outputFormat === "gif" ? "image/gif" : `video/${outputFormat}`;
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: mimeType });
      
      setConvertedUrl(URL.createObjectURL(blob));
      setConvertedSize(blob.size);
      setIsConverting(false);
      
      toast({ 
        title: "Conversion complete!", 
        description: `Output size: ${(blob.size / (1024 * 1024)).toFixed(2)} MB` 
      });
    } catch (error) {
      console.error("Conversion error:", error);
      setIsConverting(false);
      toast({ 
        title: "Conversion failed", 
        description: error instanceof Error ? error.message : "Unknown error occurred", 
        variant: "destructive" 
      });
    }
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const a = document.createElement("a");
      a.href = convertedUrl;
      const extension = outputFormat === "gif" ? "gif" : outputFormat;
      a.download = `converted-video.${extension}`;
      a.click();
      toast({ title: "Download started!" });
    }
  };

  const compressionRatio = videoFile && convertedSize > 0 
    ? ((1 - convertedSize / videoFile.size) * 100).toFixed(1)
    : null;

  return (
    <PageLayout title="Video Converter" description="Convert videos between different formats - 100% private, works in your browser">
      <SEOHead
        title="Video Converter - Convert MP4, WebM, AVI, MOV, MKV | Utility Master"
        description="Free online video converter. Convert between MP4, WebM, AVI, MOV, MKV, and GIF. No upload needed - works 100% in your browser. Private and secure."
        keywords="video converter, convert mp4, convert webm, convert avi, convert mov, video format converter, free video converter, online video converter"
        canonicalUrl="/video-converter"
      />
      <AdBanner />
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {loadError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        )}

        {/* Upload Section */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="video/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline" 
              className="w-full h-24 border-dashed border-2" 
              disabled={!ffmpegLoaded}
            >
              <div className="flex flex-col items-center gap-2">
                <Video className="h-8 w-8 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {!ffmpegLoaded ? "Loading converter..." : videoFile ? videoFile.name : "Click to select video file"}
                </span>
              </div>
            </Button>
            
            {videoFile && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="font-medium">File uploaded successfully</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium truncate">{videoFile.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <p className="font-medium">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">{videoFile.type}</p>
                  </div>
                </div>
                
                {videoPreview && (
                  <div className="mt-4">
                    <video 
                      src={videoPreview} 
                      controls 
                      className="w-full max-h-48 rounded-lg bg-black"
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Conversion Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        <div className="flex flex-col">
                          <span>{format.label}</span>
                          <span className="text-xs text-muted-foreground">{format.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quality">Quality</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger id="quality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isConverting && (
              <div className="space-y-2 p-4 bg-primary/5 rounded-lg">
                <div className="flex justify-between text-sm">
                  <Label>Converting...</Label>
                  <span className="font-medium text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">Please keep this tab open during conversion</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={handleConvert} 
                disabled={!videoFile || isConverting || !ffmpegLoaded} 
                className="flex-1"
                size="lg"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isConverting ? "animate-spin" : ""}`} />
                {isConverting ? `Converting... ${progress}%` : "Convert Video"}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                disabled={!convertedUrl} 
                onClick={handleDownload}
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Result */}
        {convertedUrl && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Conversion Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="font-bold text-lg">{videoFile ? (videoFile.size / (1024 * 1024)).toFixed(2) : 0} MB</p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground">Converted Size</p>
                  <p className="font-bold text-lg">{(convertedSize / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="text-sm text-muted-foreground">Size Change</p>
                  <p className={`font-bold text-lg ${parseFloat(compressionRatio || "0") > 0 ? "text-green-600" : "text-orange-600"}`}>
                    {parseFloat(compressionRatio || "0") > 0 ? "-" : "+"}{Math.abs(parseFloat(compressionRatio || "0"))}%
                  </p>
                </div>
              </div>
              
              {outputFormat !== "gif" ? (
                <video src={convertedUrl} controls className="w-full rounded-lg bg-black max-h-64" />
              ) : (
                <img src={convertedUrl} alt="Converted GIF" className="w-full rounded-lg max-h-64 object-contain" />
              )}
              
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Converted {outputFormat.toUpperCase()}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Supported Formats */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Supported Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formats.map((format) => (
                <div key={format.value} className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold">{format.label}</p>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default VideoConverter;
