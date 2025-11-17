import { useState } from "react";
import { Download, Link as LinkIcon, ArrowLeft, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");

  const detectPlatform = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) return "YouTube";
    if (videoUrl.includes("instagram.com")) return "Instagram";
    if (videoUrl.includes("facebook.com")) return "Facebook";
    if (videoUrl.includes("twitter.com") || videoUrl.includes("x.com")) return "Twitter/X";
    if (videoUrl.includes("linkedin.com")) return "LinkedIn";
    if (videoUrl.includes("threads.net")) return "Threads";
    return "Unknown";
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setPlatform(detectPlatform(value));
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
            Video Downloader
          </h1>
          <p className="text-muted-foreground">Download videos from social media platforms</p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Video downloading requires platform-specific APIs or third-party services. Direct downloads from 
            YouTube, Instagram, Facebook, and other platforms need their official APIs with proper authentication.
            Consider using services like yt-dlp, RapidAPI, or platform-specific developer APIs.
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
                    placeholder="Paste video URL here"
                    className="pl-10"
                  />
                </div>
              </div>
              {platform && platform !== "Unknown" && (
                <p className="text-sm text-muted-foreground mt-2">
                  Detected platform: <span className="text-foreground font-medium">{platform}</span>
                </p>
              )}
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Supported Platforms:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <span>• YouTube</span>
                <span>• Instagram</span>
                <span>• Facebook</span>
                <span>• Twitter/X</span>
                <span>• LinkedIn</span>
                <span>• Threads</span>
              </div>
            </div>

            <Button className="w-full" disabled>
              <Download className="h-4 w-4 mr-2" />
              Download Video (Requires API Setup)
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Implementation Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Option 1: Third-Party APIs</p>
              <p>Use services like RapidAPI's Video Downloader APIs or SaveFrom.net API for multi-platform support.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Option 2: Platform-Specific APIs</p>
              <p>Integrate official APIs from YouTube Data API, Instagram Graph API, etc. with proper OAuth authentication.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Option 3: yt-dlp Service</p>
              <p>Deploy yt-dlp as a backend service for YouTube and many other platforms (requires server setup).</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VideoDownloader;
