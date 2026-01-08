import { useState, useMemo } from "react";
import { Type, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { toast } from "sonner";

const CharacterCounter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    const lines = text.split(/\n/).length;
    
    // Social media limits
    const twitter = 280 - chars;
    const instagram = 2200 - chars;
    const linkedin = 3000 - chars;

    return {
      chars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      twitter,
      instagram,
      linkedin,
    };
  }, [text]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "Why count characters?", answer: "Character counting is essential for social media posts, SMS messages, meta descriptions, and any content with length limits." },
    { question: "What's the difference between characters and characters without spaces?", answer: "Characters includes all text including spaces. Characters without spaces only counts letters, numbers, and punctuation." },
    { question: "What are the social media character limits?", answer: "Twitter: 280, Instagram caption: 2,200, LinkedIn post: 3,000 characters." },
  ];

  return (
    <PageLayout title="Character Counter" description="Count characters, words, and more">
      <SEOHead
        title="Character Counter - Count Characters, Words, Sentences | Utility Master"
        description="Free online character counter. Count characters, words, sentences, and check social media limits instantly."
        keywords="character counter, word counter, character count, twitter character limit, text counter"
        canonicalUrl="/character-counter"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Character Counter
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!text}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="min-h-[200px]"
            />

            {/* Main Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-3xl font-bold text-primary">{stats.chars}</p>
                <p className="text-sm text-muted-foreground">Characters</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.words}</p>
                <p className="text-sm text-muted-foreground">Words</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.sentences}</p>
                <p className="text-sm text-muted-foreground">Sentences</p>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-semibold">{stats.charsNoSpaces}</p>
                <p className="text-xs text-muted-foreground">Without Spaces</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-semibold">{stats.paragraphs}</p>
                <p className="text-xs text-muted-foreground">Paragraphs</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-semibold">{stats.lines}</p>
                <p className="text-xs text-muted-foreground">Lines</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xl font-semibold">{Math.ceil(stats.words / 200)}</p>
                <p className="text-xs text-muted-foreground">Min Read</p>
              </div>
            </div>

            {/* Social Media Limits */}
            <div className="space-y-2">
              <p className="font-semibold text-sm">Social Media Limits</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Twitter/X</span>
                  <span className={`font-mono text-sm ${stats.twitter < 0 ? "text-red-500" : "text-green-500"}`}>
                    {stats.twitter} remaining
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">Instagram</span>
                  <span className={`font-mono text-sm ${stats.instagram < 0 ? "text-red-500" : "text-green-500"}`}>
                    {stats.instagram} remaining
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-sm">LinkedIn</span>
                  <span className={`font-mono text-sm ${stats.linkedin < 0 ? "text-red-500" : "text-green-500"}`}>
                    {stats.linkedin} remaining
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default CharacterCounter;
