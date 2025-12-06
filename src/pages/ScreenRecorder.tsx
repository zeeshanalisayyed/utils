import { useState, useRef } from "react";
import { Video, Square, Download, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const ScreenRecorder = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Array<{ id: string; url: string; timestamp: number }>>(() => {
    const saved = localStorage.getItem("recordings");
    return saved ? JSON.parse(saved) : [];
  });
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
        const newRecording = { id: Date.now().toString(), url, timestamp: Date.now() };
        const updated = [newRecording, ...recordings];
        setRecordings(updated);
        localStorage.setItem("recordings", JSON.stringify(updated));
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

  const faqItems = [
    { question: "What formats are supported?", answer: "Recordings are saved in WebM format, which is widely supported by modern browsers and video players." },
    { question: "Can I record with audio?", answer: "Yes, you can choose to include system audio and microphone when starting the recording." },
    { question: "Where are recordings stored?", answer: "Recordings are stored temporarily in your browser. Download them before closing the page to save permanently." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Screen Recorder - Utility Master",
    "applicationCategory": "MultimediaApplication",
    "description": "Record your screen with audio directly in your browser. Free screen recording tool with no download required.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="Screen Recorder"
      description="Record your screen with audio"
    >
      <SEOHead
        title="Screen Recorder - Free Online Screen Recording | Utility Master"
        description="Record your screen with audio directly in your browser. Free screen recording tool with no software download required."
        keywords="screen recorder, screen recording, record screen, video capture, free screen recorder"
        canonicalUrl="https://utilitymaster.app/screen-recorder"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="max-w-4xl mx-auto space-y-6">
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

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default ScreenRecorder;