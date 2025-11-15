import { useState, useRef } from "react";
import { Video, Square, Download, Monitor, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ScreenRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" } as any,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "Recording started" });
    } catch (error) {
      toast({
        title: "Failed to start recording",
        description: "Please grant screen recording permissions",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({ title: "Recording stopped" });
    }
  };

  const downloadRecording = () => {
    if (recordedUrl) {
      const a = document.createElement("a");
      a.href = recordedUrl;
      a.download = `screen-recording-${Date.now()}.webm`;
      a.click();
      toast({ title: "Recording downloaded" });
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Screen Recorder
          </h1>
          <p className="text-muted-foreground">Record your screen with audio</p>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Screen Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-12 bg-muted/50 rounded-lg">
                {isRecording ? (
                  <div className="text-center">
                    <div className="h-16 w-16 bg-destructive rounded-full mx-auto mb-4 animate-pulse flex items-center justify-center">
                      <Video className="h-8 w-8 text-destructive-foreground" />
                    </div>
                    <p className="text-lg font-medium">Recording in progress...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Monitor className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">Ready to record</p>
                  </div>
                )}
              </div>

              {isRecording ? (
                <Button onClick={stopRecording} variant="destructive" className="w-full">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </Button>
              ) : (
                <Button onClick={startRecording} className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Start Recording
                </Button>
              )}
            </CardContent>
          </Card>

          {recordedUrl && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Recording Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <video src={recordedUrl} controls className="w-full rounded-lg" />
                <Button onClick={downloadRecording} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScreenRecorder;
