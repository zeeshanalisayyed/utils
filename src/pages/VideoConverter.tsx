import { useState, useRef, useEffect } from "react";
import { Video, Upload, Download, RefreshCw } from "lucide-react";
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

const VideoConverter = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const formats = [
    { value: "mp4", label: "MP4" },
    { value: "avi", label: "AVI" },
    { value: "mov", label: "MOV" },
    { value: "webm", label: "WebM" },
    { value: "mkv", label: "MKV" },
  ];

  useEffect(() => { loadFFmpeg(); }, []);

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    try {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });
      ffmpeg.on("progress", ({ progress: p }) => setProgress(Math.round(p * 100)));
      setFfmpegLoaded(true);
      toast({ title: "Video converter ready!" });
    } catch (error) {
      console.error("Failed to load FFmpeg:", error);
      toast({ title: "Failed to load converter", description: "Please refresh the page", variant: "destructive" });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setConvertedUrl("");
      toast({ title: "Video file uploaded" });
    } else {
      toast({ title: "Please upload a valid video file", variant: "destructive" });
    }
  };

  const handleConvert = async () => {
    if (!videoFile) { toast({ title: "Please upload a video file first", variant: "destructive" }); return; }
    if (!ffmpegLoaded) { toast({ title: "Converter is still loading", variant: "destructive" }); return; }
    setIsConverting(true);
    setProgress(0);
    setConvertedUrl("");
    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = "input.mp4";
      const outputName = `output.${outputFormat}`;
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
      await ffmpeg.exec(["-i", inputName, outputName]);
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: `video/${outputFormat}` });
      setConvertedUrl(URL.createObjectURL(blob));
      setIsConverting(false);
      toast({ title: "Conversion complete!" });
    } catch (error) {
      console.error("Conversion error:", error);
      setIsConverting(false);
      toast({ title: "Conversion failed", description: error instanceof Error ? error.message : "Unknown error", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (convertedUrl) {
      const a = document.createElement("a");
      a.href = convertedUrl;
      a.download = `converted.${outputFormat}`;
      a.click();
      toast({ title: "Download started" });
    }
  };

  return (
    <PageLayout title="Video Converter" description="Convert videos between different formats">
      <AdBanner />
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="border-border">
          <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" />Upload Video</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full" disabled={!ffmpegLoaded}>
              <Video className="h-4 w-4 mr-2" />
              {videoFile ? videoFile.name : ffmpegLoaded ? "Select Video File" : "Loading converter..."}
            </Button>
            {videoFile && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium">File details:</p>
                <p className="text-sm text-muted-foreground mt-1">Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                <p className="text-sm text-muted-foreground">Type: {videoFile.type}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader><CardTitle className="flex items-center gap-2"><RefreshCw className="h-5 w-5" />Conversion Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="format">Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger id="format"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {formats.map((format) => <SelectItem key={format.value} value={format.value}>{format.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {isConverting && (
              <div className="space-y-2">
                <Label>Converting: {progress}%</Label>
                <Progress value={progress} />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleConvert} disabled={!videoFile || isConverting || !ffmpegLoaded} className="flex-1">
                <RefreshCw className={`h-4 w-4 mr-2 ${isConverting ? "animate-spin" : ""}`} />
                {isConverting ? `Converting... ${progress}%` : "Convert Video"}
              </Button>
              <Button variant="outline" className="flex-1" disabled={!convertedUrl} onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader><CardTitle>Supported Formats</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
              {formats.map((format) => <span key={format.value}>• {format.label}</span>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VideoConverter;