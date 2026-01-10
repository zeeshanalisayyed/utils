import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Video, Sparkles, Wand2, Download, Play, Loader2, Image, Zap, Film, Settings2 } from "lucide-react";
import { InArticleAd } from "@/components/AdBanner";
import { supabase } from "@/integrations/supabase/client";

const AiVideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedFrames, setGeneratedFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  const styles = [
    { value: "cinematic", label: "Cinematic", description: "Hollywood movie quality" },
    { value: "anime", label: "Anime", description: "Japanese animation style" },
    { value: "3d-render", label: "3D Render", description: "High-quality CGI" },
    { value: "watercolor", label: "Watercolor", description: "Artistic painting style" },
    { value: "photorealistic", label: "Photorealistic", description: "Ultra-realistic imagery" },
    { value: "cartoon", label: "Cartoon", description: "Fun animated style" },
  ];

  const generateVideo = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedFrames([]);

    try {
      // Generate multiple frames using AI image generation
      const frameCount = parseInt(duration);
      const frames: string[] = [];
      
      for (let i = 0; i < frameCount; i++) {
        setProgress(((i + 1) / frameCount) * 100);
        
        const framePrompt = `${prompt}, ${style} style, frame ${i + 1} of ${frameCount}, smooth motion, high quality, ${aspectRatio} aspect ratio`;
        
        const response = await supabase.functions.invoke('generate-video-frames', {
          body: { 
            prompt: framePrompt,
            style,
            frameNumber: i + 1,
            totalFrames: frameCount
          }
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to generate frame');
        }

        if (response.data?.imageUrl) {
          frames.push(response.data.imageUrl);
        }
      }

      setGeneratedFrames(frames);
      toast.success("Video frames generated! View your creation below.");
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const playAnimation = () => {
    if (generatedFrames.length === 0) return;
    
    let frame = 0;
    const interval = setInterval(() => {
      setCurrentFrame(frame);
      frame++;
      if (frame >= generatedFrames.length) {
        frame = 0;
      }
    }, 500);

    setTimeout(() => clearInterval(interval), generatedFrames.length * 500 * 3);
  };

  return (
    <PageLayout
      title="AI Video Generator"
      description="Create stunning videos from text prompts using AI"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Info Banner */}
        <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Powered by AI</h3>
                <p className="text-muted-foreground text-sm">
                  Generate video frames from your prompts. The AI creates a sequence of images that can be animated together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Create Your Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Describe your video</Label>
              <Textarea
                placeholder="A majestic eagle soaring through mountain peaks at sunset, cinematic slow motion..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Be descriptive! Include details about motion, lighting, and atmosphere.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        <div>
                          <div className="font-medium">{s.label}</div>
                          <div className="text-xs text-muted-foreground">{s.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                    <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                    <SelectItem value="1:1">1:1 (Square)</SelectItem>
                    <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Frames</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 frames</SelectItem>
                    <SelectItem value="5">5 frames</SelectItem>
                    <SelectItem value="8">8 frames</SelectItem>
                    <SelectItem value="10">10 frames</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={generateVideo} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full gap-2 gradient-bg"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating... {Math.round(progress)}%
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Video
                </>
              )}
            </Button>

            {isGenerating && (
              <Progress value={progress} className="h-2" />
            )}
          </CardContent>
        </Card>

        <InArticleAd />

        {/* Preview Section */}
        {generatedFrames.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Generated Frames
                </span>
                <Button variant="outline" onClick={playAnimation} className="gap-2">
                  <Play className="h-4 w-4" />
                  Play Animation
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Preview */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={generatedFrames[currentFrame]}
                  alt={`Frame ${currentFrame + 1}`}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4">
                  Frame {currentFrame + 1} / {generatedFrames.length}
                </Badge>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {generatedFrames.map((frame, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentFrame(i)}
                    className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                      currentFrame === i ? 'border-primary scale-105' : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img src={frame} alt={`Frame ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Frames
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass-card text-center p-6">
            <Image className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">Advanced AI generates stunning visuals</p>
          </Card>
          <Card className="glass-card text-center p-6">
            <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">Fast Generation</h3>
            <p className="text-sm text-muted-foreground">Get results in seconds</p>
          </Card>
          <Card className="glass-card text-center p-6">
            <Settings2 className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">Customizable</h3>
            <p className="text-sm text-muted-foreground">Multiple styles and ratios</p>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AiVideoGenerator;
