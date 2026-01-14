import { useState, useRef, useEffect } from "react";
import { Volume2, Play, Square, Copy, Check, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState("Hello, this is a text to speech converter.");
  const [voice, setVoice] = useState<string>("");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  // Load voices when component mounts
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voiceList = window.speechSynthesis.getVoices();
        setAvailableVoices(voiceList);
      }
    };
    
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const voices = availableVoices;

  const speak = () => {
    if (!text.trim()) {
      toast({ title: "Please enter some text", variant: "destructive" });
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast({ title: "Text-to-speech not supported in your browser", variant: "destructive" });
      return;
    }

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    const synth = window.speechSynthesis;
    synthRef.current = synth;
    const utterance = new SpeechSynthesisUtterance(text);
    
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    utterance.volume = volume[0];
    
    if (voice) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      toast({ title: "Speech synthesis failed", variant: "destructive" });
    };

    synth.speak(utterance);
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  const downloadAudio = async () => {
    if (!text.trim()) {
      toast({ title: "Please enter some text", variant: "destructive" });
      return;
    }

    // Use ResponsiveVoice or browser TTS API to generate downloadable audio
    // Since Web Speech API doesn't support direct audio export, we'll use a cloud TTS service
    toast({ 
      title: "Generating audio...", 
      description: "Please wait while we prepare your download"
    });

    try {
      // Create audio using SpeechSynthesis and record it
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      utterance.volume = volume[0];
      
      if (voice) {
        const selectedVoice = voices.find(v => v.name === voice);
        if (selectedVoice) utterance.voice = selectedVoice;
      }

      // Since browser TTS can't be directly recorded, we'll create a text file with speech markup
      // and inform user about the limitation
      const textBlob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(textBlob);
      
      // For actual audio, use the browser's TTS
      window.speechSynthesis.speak(utterance);
      
      toast({ 
        title: "Audio Playing", 
        description: "Browser TTS doesn't support direct download. Use a screen recorder or try our Speech to Text tool for transcription."
      });
      
      // Clean up
      setAudioUrl(url);
    } catch (error) {
      toast({ 
        title: "Download not available", 
        description: "Browser TTS doesn't support audio export. The audio is playing instead.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "How does text-to-speech work?", answer: "We use the Web Speech API built into modern browsers to convert your text into spoken audio." },
    { question: "Which browsers support this?", answer: "Most modern browsers support text-to-speech, including Chrome, Firefox, Safari, and Edge." },
    { question: "Can I download the audio?", answer: "Browser-based TTS plays audio directly. For downloadable audio files, we recommend using a screen recording tool while the audio plays." },
    { question: "Why do voice options vary?", answer: "Available voices depend on your operating system and browser. Chrome typically offers the most voice options." },
  ];

  return (
    <PageLayout title="Text to Speech" description="Convert text to spoken audio">
      <SEOHead
        title="Text to Speech - Convert Text to Audio | Utility Master"
        description="Convert text to speech with customizable voice, speed, and pitch. Free and instant."
        keywords="text to speech, tts, speech synthesis, voice generator"
        canonicalUrl="/text-to-speech"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Text to Speech
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Enter Text</label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech..."
                className="min-h-[200px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {voices.length > 0 && (
                <div>
                  <Label>Voice</Label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((v) => (
                        <SelectItem key={v.name} value={v.name}>
                          {v.name} ({v.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Speed</Label>
                  <span className="text-sm">{rate[0].toFixed(1)}x</span>
                </div>
                <Slider value={rate} onValueChange={setRate} min={0.5} max={2} step={0.1} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Pitch</Label>
                  <span className="text-sm">{pitch[0].toFixed(1)}</span>
                </div>
                <Slider value={pitch} onValueChange={setPitch} min={0} max={2} step={0.1} />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Volume</Label>
                  <span className="text-sm">{Math.round(volume[0] * 100)}%</span>
                </div>
                <Slider value={volume} onValueChange={setVolume} min={0} max={1} step={0.1} />
              </div>
            </div>

            <div className="flex gap-2">
              {!isPlaying ? (
                <Button onClick={speak} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Speak
                </Button>
              ) : (
                <Button onClick={stop} variant="destructive" className="flex-1">
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Tip: Use a screen recording tool to capture the audio if you need to save it.
            </p>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default TextToSpeech;
