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
  const [cutAudioUrl, setCutAudioUrl] = useState<string>("");
  const [isCutting, setIsCutting] = useState(false);
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

  const handleCut = async () => {
    if (!audioFile) {
      toast({ title: "Please upload an audio file first", variant: "destructive" });
      return;
    }

    setIsCutting(true);
    try {
      const audioContext = new AudioContext();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const start = startTime[0];
      const end = endTime[0];
      const length = end - start;

      const startOffset = Math.floor(start * audioBuffer.sampleRate);
      const endOffset = Math.floor(end * audioBuffer.sampleRate);
      const newLength = endOffset - startOffset;

      const newBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        newLength,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const oldData = audioBuffer.getChannelData(channel);
        const newData = newBuffer.getChannelData(channel);
        for (let i = 0; i < newLength; i++) {
          newData[i] = oldData[startOffset + i];
        }
      }

      // Convert to WAV
      const wavBlob = await audioBufferToWav(newBuffer);
      const url = URL.createObjectURL(wavBlob);
      setCutAudioUrl(url);
      
      setIsCutting(false);
      toast({ title: "Audio cut successfully!" });
    } catch (error) {
      setIsCutting(false);
      toast({ 
        title: "Cut failed", 
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive" 
      });
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer): Promise<Blob> => {
    return new Promise((resolve) => {
      const length = buffer.length * buffer.numberOfChannels * 2 + 44;
      const arrayBuffer = new ArrayBuffer(length);
      const view = new DataView(arrayBuffer);
      const channels: Float32Array[] = [];
      let offset = 0;
      let pos = 0;

      const setUint16 = (data: number) => {
        view.setUint16(pos, data, true);
        pos += 2;
      };

      const setUint32 = (data: number) => {
        view.setUint32(pos, data, true);
        pos += 4;
      };

      // Write WAV header
      setUint32(0x46464952); // "RIFF"
      setUint32(length - 8); // file length - 8
      setUint32(0x45564157); // "WAVE"
      setUint32(0x20746d66); // "fmt " chunk
      setUint32(16); // length = 16
      setUint16(1); // PCM (uncompressed)
      setUint16(buffer.numberOfChannels);
      setUint32(buffer.sampleRate);
      setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels); // avg. bytes/sec
      setUint16(buffer.numberOfChannels * 2); // block-align
      setUint16(16); // 16-bit
      setUint32(0x61746164); // "data" - chunk
      setUint32(length - pos - 4); // chunk length

      // Write interleaved data
      for (let i = 0; i < buffer.numberOfChannels; i++) {
        channels.push(buffer.getChannelData(i));
      }

      while (pos < length) {
        for (let i = 0; i < buffer.numberOfChannels; i++) {
          let sample = Math.max(-1, Math.min(1, channels[i][offset]));
          sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
          view.setInt16(pos, sample, true);
          pos += 2;
        }
        offset++;
      }

      resolve(new Blob([arrayBuffer], { type: "audio/wav" }));
    });
  };

  const handleDownload = () => {
    if (!cutAudioUrl) return;
    const a = document.createElement("a");
    a.href = cutAudioUrl;
    a.download = `cut_${audioFile?.name.replace(/\.[^/.]+$/, "")}.wav`;
    a.click();
    toast({ title: "Audio downloaded" });
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
                    <Button onClick={handleCut} className="flex-1" disabled={isCutting}>
                      <Scissors className="h-4 w-4 mr-2" />
                      {isCutting ? "Cutting..." : "Cut Audio"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      disabled={!cutAudioUrl}
                      onClick={handleDownload}
                    >
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
