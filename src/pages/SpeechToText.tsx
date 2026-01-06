import { useState, useEffect, useRef } from "react";
import { Mic, Square, Copy, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [browserInfo, setBrowserInfo] = useState("");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Detect browser for better error messages
    const ua = navigator.userAgent;
    if (ua.includes("Firefox")) {
      setBrowserInfo("Firefox has limited speech recognition support. Please use Chrome or Edge for best results.");
    } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
      setBrowserInfo("Safari has partial support. For best results, use Chrome or Edge.");
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            }
          }

          if (finalTranscript) {
            setText(prev => prev + finalTranscript);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'no-speech') {
            toast({ title: "No speech detected", description: "Please speak clearly into your microphone", variant: "destructive" });
          } else if (event.error === 'not-allowed') {
            toast({ title: "Microphone access denied", description: "Please allow microphone access in your browser settings", variant: "destructive" });
          } else {
            toast({ title: `Error: ${event.error}`, variant: "destructive" });
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognitionInstance;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [toast]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({ title: "Listening... Speak now" });
      } catch (e) {
        toast({ title: "Failed to start", description: "Please refresh and try again", variant: "destructive" });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
        toast({ title: "Stopped listening" });
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText("");
    toast({ title: "Text cleared" });
  };

  const faqs = [
    { question: "How does speech-to-text work?", answer: "We use the Web Speech API to convert your spoken words into text. Make sure to allow microphone access when prompted." },
    { question: "Which browsers support this?", answer: "Chrome, Edge, and Safari support speech recognition. Firefox support is limited." },
    { question: "Is my audio recorded?", answer: "No, the audio is processed in real-time and never stored. All processing happens in your browser." },
  ];

  if (!isSupported) {
    return (
      <PageLayout title="Speech to Text" description="Convert speech to text">
        <SEOHead
          title="Speech to Text - Voice to Text Converter | Utility Master"
          description="Convert your speech to text using your microphone. Free and instant."
          keywords="speech to text, voice to text, speech recognition, voice typing"
          canonicalUrl="/speech-to-text"
        />
        <AdBanner />
        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Speech to Text" description="Convert speech to text">
      <SEOHead
        title="Speech to Text - Voice to Text Converter | Utility Master"
        description="Convert your speech to text using your microphone. Free and instant."
        keywords="speech to text, voice to text, speech recognition, voice typing"
        canonicalUrl="/speech-to-text"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Speech to Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Transcribed Text</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={clearText}>
                    Clear
                  </Button>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Click the microphone button and start speaking..."
                className="min-h-[300px]"
              />
            </div>

            <div className="flex gap-2">
              {!isListening ? (
                <Button onClick={startListening} className="flex-1" size="lg">
                  <Mic className="h-4 w-4 mr-2" />
                  Start Listening
                </Button>
              ) : (
                <Button onClick={stopListening} variant="destructive" className="flex-1" size="lg">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Listening
                </Button>
              )}
            </div>

            {isListening && (
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <div className="animate-pulse text-primary font-semibold">🎤 Listening...</div>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default SpeechToText;

