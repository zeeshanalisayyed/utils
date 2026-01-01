import { useState } from "react";
import { Download, Link as LinkIcon, AlertCircle, Loader2, CheckCircle2, Video, Image as ImageIcon, Music, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdBanner } from "@/components/AdBanner";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface VideoInfo {
  platform: string;
  title?: string;
  downloadUrl?: string;
  thumbnail?: string;
  duration?: string;
  quality?: string;
  formats?: Array<{ quality: string; url: string; format: string }>;
  error?: string;
}

const platforms = [
  { name: "YouTube", icon: "🎬", color: "bg-red-500/10 text-red-600" },
  { name: "Instagram", icon: "📷", color: "bg-pink-500/10 text-pink-600" },
  { name: "Facebook", icon: "📘", color: "bg-blue-500/10 text-blue-600" },
  { name: "Twitter/X", icon: "🐦", color: "bg-sky-500/10 text-sky-600" },
  { name: "TikTok", icon: "🎵", color: "bg-purple-500/10 text-purple-600" },
  { name: "Pinterest", icon: "📌", color: "bg-red-400/10 text-red-500" },
  { name: "Vimeo", icon: "🎥", color: "bg-cyan-500/10 text-cyan-600" },
  { name: "Dailymotion", icon: "▶️", color: "bg-blue-400/10 text-blue-500" },
];

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>("");
  const { toast } = useToast();

  const faqs = [
    { question: "How do I download videos?", answer: "Simply paste the video URL from any supported platform (YouTube, Instagram, TikTok, etc.) and click 'Get Download Link'. We'll fetch the video information and provide download options." },
    { question: "Is this service free?", answer: "Yes, the downloader is completely free. However, it requires a RapidAPI key for the backend APIs. You can get a free tier API key from RapidAPI.com." },
    { question: "What quality options are available?", answer: "Quality options depend on the source video. Most platforms offer multiple qualities from 360p to 4K when available." },
    { question: "Why isn't my download working?", answer: "Make sure you've added your RAPIDAPI_KEY in the project secrets. Some videos may also be restricted due to privacy settings or regional limitations." },
    { question: "Is it legal to download videos?", answer: "Downloading for personal use is generally allowed. However, re-uploading copyrighted content is prohibited. Always respect content creators' rights." },
    { question: "Can I download private videos?", answer: "No, we can only download publicly available videos. Private or restricted content cannot be accessed." },
  ];

  const detectPlatform = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) return "YouTube";
    if (videoUrl.includes("instagram.com")) return "Instagram";
    if (videoUrl.includes("facebook.com") || videoUrl.includes("fb.watch")) return "Facebook";
    if (videoUrl.includes("twitter.com") || videoUrl.includes("x.com")) return "Twitter/X";
    if (videoUrl.includes("tiktok.com")) return "TikTok";
    if (videoUrl.includes("pinterest.com") || videoUrl.includes("pin.it")) return "Pinterest";
    if (videoUrl.includes("vimeo.com")) return "Vimeo";
    if (videoUrl.includes("dailymotion.com") || videoUrl.includes("dai.ly")) return "Dailymotion";
    if (videoUrl.includes("linkedin.com")) return "LinkedIn";
    if (videoUrl.includes("threads.net")) return "Threads";
    return "Unknown";
  };

  const getPlatformInfo = (platformName: string) => {
    return platforms.find(p => p.name === platformName) || { name: platformName, icon: "🎬", color: "bg-gray-500/10 text-gray-600" };
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setPlatform(detectPlatform(value));
    setVideoInfo(null);
    setSelectedQuality("");
  };

  const handleDownload = async () => {
    if (!url) {
      toast({ title: "URL Required", description: "Please enter a video URL", variant: "destructive" });
      return;
    }

    if (platform === "Unknown") {
      toast({ title: "Unsupported Platform", description: "This platform is not supported yet", variant: "destructive" });
      return;
    }

    setIsDownloading(true);
    setVideoInfo(null);
    
    try {
      console.log("Fetching video info for:", url);
      const { data, error } = await supabase.functions.invoke('download-video', { 
        body: { url } 
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      if (data.error) {
        toast({ title: "Download Failed", description: data.error, variant: "destructive" });
        setVideoInfo({ platform: platform.toLowerCase(), error: data.error });
      } else {
        setVideoInfo(data);
        if (data.formats && data.formats.length > 0) {
          setSelectedQuality(data.formats[0].quality);
        }
        toast({ title: "Video Found!", description: `Ready to download from ${data.platform}` });
      }
    } catch (error: unknown) {
      console.error('Download error:', error);
      const message = error instanceof Error ? error.message : "Failed to process video URL";
      toast({ title: "Download Failed", description: message, variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  const initiateDownload = () => {
    let downloadUrl = videoInfo?.downloadUrl;
    
    // If formats are available and a quality is selected, use that URL
    if (videoInfo?.formats && selectedQuality) {
      const selectedFormat = videoInfo.formats.find(f => f.quality === selectedQuality);
      if (selectedFormat) {
        downloadUrl = selectedFormat.url;
      }
    }

    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      toast({ title: "Download Started!", description: "Your download should begin shortly" });
    } else {
      toast({ title: "No Download URL", description: "Could not find a download link", variant: "destructive" });
    }
  };

  const platformInfo = getPlatformInfo(platform);

  return (
    <PageLayout title="Video Downloader" description="Download videos from YouTube, Instagram, TikTok, Facebook, Twitter and more">
      <SEOHead
        title="Video Downloader - Download from YouTube, Instagram, TikTok, Facebook | Utility Master"
        description="Free online video downloader. Download videos from YouTube, Instagram, TikTok, Facebook, Twitter, Vimeo, and more. Fast and easy to use."
        keywords="video downloader, youtube downloader, instagram downloader, tiktok downloader, facebook video download, twitter video download, free video downloader"
        canonicalUrl="/video-downloader"
      />
      <AdBanner />
      
      <div className="max-w-4xl mx-auto space-y-6">
        {/* API Key Notice */}
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Setup Required:</strong> Add your <code className="px-1 py-0.5 bg-amber-200/50 dark:bg-amber-900/50 rounded">RAPIDAPI_KEY</code> in project secrets.{" "}
            <a 
              href="https://rapidapi.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline font-medium inline-flex items-center gap-1"
            >
              Get free API key <ExternalLink className="h-3 w-3" />
            </a>
          </AlertDescription>
        </Alert>

        {/* Supported Platforms */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {platforms.map((p) => (
            <div 
              key={p.name} 
              className={`p-3 rounded-lg text-center transition-all ${p.color} ${platform === p.name ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}
            >
              <div className="text-2xl mb-1">{p.icon}</div>
              <div className="text-xs font-medium truncate">{p.name}</div>
            </div>
          ))}
        </div>

        {/* URL Input */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="video-url" 
                    value={url} 
                    onChange={(e) => handleUrlChange(e.target.value)} 
                    placeholder="Paste video URL here..." 
                    className="pl-10" 
                  />
                </div>
              </div>
              
              {platform && platform !== "Unknown" && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className={platformInfo.color}>
                    <span className="mr-1">{platformInfo.icon}</span>
                    {platform}
                  </Badge>
                  <span className="text-sm text-muted-foreground">detected</span>
                </div>
              )}
            </div>

            <Button 
              className="w-full" 
              onClick={handleDownload} 
              disabled={!url || isDownloading || platform === "Unknown"}
              size="lg"
            >
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

        {/* Video Result */}
        {videoInfo && !videoInfo.error && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Video Ready to Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                {videoInfo.thumbnail && (
                  <div className="relative w-48 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img 
                      src={videoInfo.thumbnail} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg line-clamp-2">{videoInfo.title || "Untitled Video"}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Platform: {videoInfo.platform.charAt(0).toUpperCase() + videoInfo.platform.slice(1)}
                  </p>
                  {videoInfo.duration && (
                    <p className="text-sm text-muted-foreground">Duration: {videoInfo.duration}</p>
                  )}
                </div>
              </div>

              {/* Quality Selection */}
              {videoInfo.formats && videoInfo.formats.length > 1 && (
                <div className="space-y-2">
                  <Label>Select Quality</Label>
                  <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoInfo.formats.map((format, index) => (
                        <SelectItem key={index} value={format.quality}>
                          {format.quality} ({format.format})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button onClick={initiateDownload} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Video
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Download will open in a new tab. Right-click and "Save As" if needed.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {videoInfo?.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Error:</strong> {videoInfo.error}
              <p className="mt-2 text-sm">
                Make sure your RAPIDAPI_KEY is configured correctly in project secrets.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Setup Guide */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>How to Set Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h4 className="font-semibold mb-1">Get API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Visit <a href="https://rapidapi.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">RapidAPI.com</a> and create a free account
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h4 className="font-semibold mb-1">Add to Secrets</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Settings → Secrets and add <code className="px-1 bg-muted rounded">RAPIDAPI_KEY</code>
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h4 className="font-semibold mb-1">Start Downloading</h4>
                <p className="text-sm text-muted-foreground">
                  Paste any video URL and click "Get Download Link"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default VideoDownloader;
