import { useState, useMemo } from "react";
import { FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words.length / 200);
    
    // Average word length
    const avgWordLength = words.length > 0 
      ? (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1)
      : "0";

    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      avgWordLength,
    };
  }, [text]);

  const faqs = [
    { question: "How is word count calculated?", answer: "Words are counted by splitting text on whitespace. Each group of characters separated by spaces counts as one word." },
    { question: "What is reading time based on?", answer: "Reading time is calculated at an average reading speed of 200 words per minute." },
    { question: "Is my text stored?", answer: "No, all counting happens in your browser. Your text never leaves your device." },
  ];

  return (
    <PageLayout title="Word Counter" description="Count words, characters, sentences, and more">
      <SEOHead
        title="Word Counter - Count Words & Characters | Utility Master"
        description="Count words, characters, sentences, paragraphs, and estimate reading time. Free and instant."
        keywords="word counter, character counter, text statistics, word count tool"
        canonicalUrl="/word-counter"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Word Counter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter your text</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to see statistics..."
                className="min-h-[300px]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.words}</div>
                <div className="text-sm text-muted-foreground mt-1">Words</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.characters}</div>
                <div className="text-sm text-muted-foreground mt-1">Characters</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                <div className="text-sm text-muted-foreground mt-1">No Spaces</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
                <div className="text-sm text-muted-foreground mt-1">Sentences</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                <div className="text-sm text-muted-foreground mt-1">Paragraphs</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.readingTime}</div>
                <div className="text-sm text-muted-foreground mt-1">Min Read</div>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{stats.avgWordLength}</div>
                <div className="text-sm text-muted-foreground mt-1">Avg Word Length</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default WordCounter;

