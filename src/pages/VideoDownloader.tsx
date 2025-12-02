import { useState } from "react";
import { Download, Link as LinkIcon, ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VideoInfo {
  platform: string;
  title?: string;
  downloadUrl?: string;
  thumbnail?: string;
  error?: string;
}

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const { toast } = useToast();

  const detectPlatform = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) return "YouTube";
    if (videoUrl.includes("instagram.com")) return "Instagram";
    if (videoUrl.includes("facebook.com")) return "Facebook";
    if (videoUrl.includes("twitter.com") || videoUrl.includes("x.com")) return "Twitter/X";
    if (videoUrl.includes("tiktok.com")) return "TikTok";
    if (videoUrl.includes("linkedin.com")) return "LinkedIn";
    if (videoUrl.includes("threads.net")) return "Threads";
    return "Unknown";
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setPlatform(detectPlatform(value));
    setVideoInfo(null);
  };

  const handleDownload = async () => {
    if (!url) {
      toast({ title: "Please enter a video URL", variant: "destructive" });
      return;
    }

    setIsDownloading(true);
    setVideoInfo(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('download-video', {
        body: { url }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Download failed",
          description: data.error,
          variant: "destructive"
        });
      } else {
        setVideoInfo(data);
        
        toast({
          title: "Video found!",
          description: `Ready to download from ${data.platform}`,
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: error.message || "Failed to process video URL",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const initiateDownload = () => {
    if (videoInfo?.downloadUrl) {
      const link = document.createElement('a');
      link.href = videoInfo.downloadUrl;
      link.download = videoInfo.title || 'video';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      toast({ title: "Download started!" });
    }
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
        <AdBanner />
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Video Downloader
          </h1>
          <p className="text-muted-foreground">Download videos from social media platforms</p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            To use this feature, you need to add your RapidAPI key in Secrets. The dummy API key is currently configured. 
            Get your free API key from <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" className="underline">RapidAPI.com</a> 
            and add it as <strong>RAPIDAPI_KEY</strong> in your project secrets.
          </AlertDescription>
        </Alert>

        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="video-url">Video URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="video-url"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="Paste video URL here (YouTube, Instagram, Facebook, Twitter, TikTok)"
                    className="pl-10"
                  />
                </div>
              </div>
              {platform && platform !== "Unknown" && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Detected platform: <span className="text-foreground font-medium">{platform}</span>
                </div>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Supported Platforms:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <span>• YouTube</span>
                <span>• Instagram</span>
                <span>• Facebook</span>
                <span>• Twitter/X</span>
                <span>• TikTok</span>
                <span>• And more...</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleDownload} disabled={!url || isDownloading}>
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Get Download Link
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {videoInfo && !videoInfo.error && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Video Ready to Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {videoInfo.thumbnail && (
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={videoInfo.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground mb-1">{videoInfo.title}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Platform: {videoInfo.platform.charAt(0).toUpperCase() + videoInfo.platform.slice(1)}
                </p>
                <Button onClick={initiateDownload} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Video
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-border">
          <CardHeader>
            <CardTitle>How to Set Up API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Step 1: Get RapidAPI Key</p>
              <p>Visit <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">RapidAPI.com</a> and sign up for a free account. Subscribe to video downloader APIs.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Step 2: Add to Secrets</p>
              <p>In your project, navigate to Settings → Secrets and add <strong>RAPIDAPI_KEY</strong> with your API key value.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Step 3: Deploy & Use</p>
              <p>After adding the secret, the edge function will automatically use your API key for video downloads.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VideoDownloader;
