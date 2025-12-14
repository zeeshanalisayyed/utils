import { useState } from "react";
import { GitCompare, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const TextDiffChecker = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const computeDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const diff: Array<{ type: 'same' | 'removed' | 'added'; line: string }> = [];

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        diff.push({ type: 'same', line: line1 });
      } else {
        if (line1) diff.push({ type: 'removed', line: line1 });
        if (line2) diff.push({ type: 'added', line: line2 });
      }
    }

    return diff;
  };

  const diff = computeDiff();
  const hasChanges = diff.some(d => d.type !== 'same');

  const copyDiff = async () => {
    const diffText = diff.map(d => {
      if (d.type === 'removed') return `- ${d.line}`;
      if (d.type === 'added') return `+ ${d.line}`;
      return `  ${d.line}`;
    }).join('\n');
    await navigator.clipboard.writeText(diffText);
    setCopied(true);
    toast({ title: "Diff copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "How does the diff checker work?", answer: "It compares two texts line by line and highlights additions, removals, and unchanged lines." },
    { question: "What format is the diff output?", answer: "The diff shows removed lines with a minus sign, added lines with a plus sign, and unchanged lines with spaces." },
    { question: "Can I compare large texts?", answer: "Yes, but very large texts may take a moment to process. The comparison happens entirely in your browser." },
  ];

  return (
    <PageLayout title="Text Diff Checker" description="Compare two texts and find differences">
      <SEOHead
        title="Text Diff Checker - Compare Texts | Utility Master"
        description="Compare two texts and see differences highlighted. Free, instant, and private."
        keywords="text diff, text comparison, diff checker, compare text"
        canonicalUrl="/text-diff-checker"
      />
      <AdBanner />

      <div className="max-w-6xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Text Diff Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Text 1</label>
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Enter first text..."
                  className="min-h-[300px] font-mono"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Text 2</label>
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Enter second text..."
                  className="min-h-[300px] font-mono"
                />
              </div>
            </div>

            {text1 || text2 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Differences:</h3>
                  {hasChanges && (
                    <Button variant="outline" size="sm" onClick={copyDiff}>
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy Diff
                    </Button>
                  )}
                </div>
                <div className="border rounded-lg p-4 min-h-[200px] font-mono text-sm">
                  {diff.length === 0 ? (
                    <div className="text-muted-foreground">Enter texts to compare</div>
                  ) : !hasChanges ? (
                    <div className="text-green-600 dark:text-green-400">✓ Texts are identical</div>
                  ) : (
                    <div className="space-y-1">
                      {diff.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-1 rounded ${
                            item.type === 'removed'
                              ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                              : item.type === 'added'
                              ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                              : 'text-muted-foreground'
                          }`}
                        >
                          <span className="mr-2">
                            {item.type === 'removed' ? '-' : item.type === 'added' ? '+' : ' '}
                          </span>
                          {item.line || <span className="text-muted-foreground">(empty line)</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default TextDiffChecker;

