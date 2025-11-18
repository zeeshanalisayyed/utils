import { useState, useRef } from "react";
import { Music, Upload, Scissors, Download, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";

const Mp3Cutter = () => {
  const { toast } = useToast();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState([0]);
  const [endTime, setEndTime] = useState([30]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      toast({ title: "Audio file uploaded" });
    } else {
      toast({ title: "Please upload a valid audio file", variant: "destructive" });
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const dur = audioRef.current.duration;
      setDuration(dur);
      setEndTime([Math.min(30, dur)]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCut = () => {
    if (!audioFile) {
      toast({ title: "Please upload an audio file first", variant: "destructive" });
      return;
    }
    toast({ 
      title: "Cut audio feature", 
      description: "This feature requires backend processing for audio manipulation" 
    });
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
            MP3 Cutter
          </h1>
          <p className="text-muted-foreground">Trim and cut your audio files</p>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Audio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                variant="outline" 
                className="w-full"
              >
                <Music className="h-4 w-4 mr-2" />
                {audioFile ? audioFile.name : "Select Audio File"}
              </Button>
            </CardContent>
          </Card>

          {audioUrl && (
            <>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Audio Player</CardTitle>
                </CardHeader>
                <CardContent>
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    className="w-full"
                    onLoadedMetadata={handleLoadedMetadata}
                  />
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="h-5 w-5" />
                    Cut Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Start Time: {formatTime(startTime[0])}</Label>
                    <Slider
                      value={startTime}
                      onValueChange={setStartTime}
                      max={duration}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>End Time: {formatTime(endTime[0])}</Label>
                    <Slider
                      value={endTime}
                      onValueChange={setEndTime}
                      max={duration}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Selected duration: {formatTime(endTime[0] - startTime[0])}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCut} className="flex-1">
                      <Scissors className="h-4 w-4 mr-2" />
                      Cut Audio
                    </Button>
                    <Button variant="outline" className="flex-1" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Mp3Cutter;
