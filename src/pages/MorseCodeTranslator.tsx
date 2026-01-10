import React, { useState, useRef, useCallback } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowRightLeft, Play, Square, Copy, Volume2, Sparkles } from "lucide-react";
import { InArticleAd } from "@/components/AdBanner";

const morseCodeMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

const reverseMorseMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

const MorseCodeTranslator = () => {
  const [textInput, setTextInput] = useState("");
  const [morseInput, setMorseInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState([600]);
  const [wpm, setWpm] = useState([15]);
  const [showVisual, setShowVisual] = useState(true);
  const [currentSymbol, setCurrentSymbol] = useState("");
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopPlayingRef = useRef(false);

  const textToMorse = (text: string): string => {
    return text.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
  };

  const morseToText = (morse: string): string => {
    return morse.split(' ').map(code => {
      if (code === '/') return ' ';
      return reverseMorseMap[code] || code;
    }).join('');
  };

  const handleTextChange = (value: string) => {
    setTextInput(value);
    setMorseInput(textToMorse(value));
  };

  const handleMorseChange = (value: string) => {
    setMorseInput(value);
    setTextInput(morseToText(value));
  };

  const swapInputs = () => {
    const temp = textInput;
    setTextInput(morseToText(morseInput));
    setMorseInput(textToMorse(temp));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const playMorseCode = useCallback(async () => {
    if (!morseInput) {
      toast.error("Enter some text first!");
      return;
    }

    setIsPlaying(true);
    stopPlayingRef.current = false;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;

    const dotDuration = 1.2 / wpm[0];
    const dashDuration = dotDuration * 3;
    const symbolGap = dotDuration;
    const letterGap = dotDuration * 3;
    const wordGap = dotDuration * 7;

    const playTone = (duration: number): Promise<void> => {
      return new Promise((resolve) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency[0];
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration - 0.01);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
        
        setTimeout(resolve, duration * 1000);
      });
    };

    const wait = (ms: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    try {
      for (const symbol of morseInput.split('')) {
        if (stopPlayingRef.current) break;
        
        setCurrentSymbol(symbol);
        
        if (symbol === '.') {
          await playTone(dotDuration);
          await wait(symbolGap * 1000);
        } else if (symbol === '-') {
          await playTone(dashDuration);
          await wait(symbolGap * 1000);
        } else if (symbol === ' ') {
          await wait(letterGap * 1000);
        } else if (symbol === '/') {
          await wait(wordGap * 1000);
        }
      }
    } finally {
      setIsPlaying(false);
      setCurrentSymbol("");
      ctx.close();
    }
  }, [morseInput, frequency, wpm]);

  const stopPlaying = () => {
    stopPlayingRef.current = true;
    setIsPlaying(false);
    setCurrentSymbol("");
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <PageLayout
      title="Morse Code Translator"
      description="Convert text to Morse code and vice versa, with audio playback"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Text Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Text
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(textInput)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text here..."
                value={textInput}
                onChange={(e) => handleTextChange(e.target.value)}
                className="min-h-[150px] font-mono"
              />
            </CardContent>
          </Card>

          {/* Morse Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Morse Code
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(morseInput)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter morse code (use . - and / for space)..."
                value={morseInput}
                onChange={(e) => handleMorseChange(e.target.value)}
                className="min-h-[150px] font-mono text-lg tracking-wider"
              />
            </CardContent>
          </Card>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={swapInputs} className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            Swap
          </Button>
        </div>

        <InArticleAd />

        {/* Audio Controls */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Audio Playback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Frequency: {frequency[0]} Hz</Label>
                <Slider
                  value={frequency}
                  onValueChange={setFrequency}
                  min={200}
                  max={1000}
                  step={50}
                />
              </div>
              <div className="space-y-2">
                <Label>Speed: {wpm[0]} WPM</Label>
                <Slider
                  value={wpm}
                  onValueChange={setWpm}
                  min={5}
                  max={30}
                  step={1}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={showVisual} onCheckedChange={setShowVisual} />
                <Label>Visual feedback</Label>
              </div>
            </div>

            <div className="flex gap-4">
              {!isPlaying ? (
                <Button onClick={playMorseCode} className="gap-2 gradient-bg">
                  <Play className="h-4 w-4" />
                  Play Morse Code
                </Button>
              ) : (
                <Button onClick={stopPlaying} variant="destructive" className="gap-2">
                  <Square className="h-4 w-4" />
                  Stop
                </Button>
              )}
            </div>

            {/* Visual Feedback */}
            {showVisual && isPlaying && (
              <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
                <div className={`text-8xl font-bold transition-all duration-100 ${
                  currentSymbol === '.' ? 'text-primary scale-110' : 
                  currentSymbol === '-' ? 'text-accent scale-125' : 
                  'text-muted-foreground opacity-50'
                }`}>
                  {currentSymbol || '·'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reference Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Morse Code Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 text-sm">
              {Object.entries(morseCodeMap).slice(0, 36).map(([char, morse]) => (
                <div
                  key={char}
                  className="p-2 bg-muted/50 rounded text-center cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleTextChange(textInput + char)}
                >
                  <div className="font-bold">{char === ' ' ? '␣' : char}</div>
                  <div className="text-xs text-muted-foreground font-mono">{morse}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MorseCodeTranslator;
