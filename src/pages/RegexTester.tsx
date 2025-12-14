import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({ global: true, ignoreCase: false, multiline: false });
  const [matches, setMatches] = useState<Array<{ match: string; index: number }>>([]);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const testRegex = () => {
    if (!pattern) {
      setMatches([]);
      return;
    }

    try {
      let flagString = "";
      if (flags.global) flagString += "g";
      if (flags.ignoreCase) flagString += "i";
      if (flags.multiline) flagString += "m";

      const regex = new RegExp(pattern, flagString);
      const regexMatches: Array<{ match: string; index: number }> = [];
      let match;

      if (flags.global) {
        while ((match = regex.exec(testString)) !== null) {
          regexMatches.push({ match: match[0], index: match.index });
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          regexMatches.push({ match: match[0], index: match.index });
        }
      }

      setMatches(regexMatches);
      if (regexMatches.length === 0) {
        toast({ title: "No matches found" });
      } else {
        toast({ title: `Found ${regexMatches.length} match(es)` });
      }
    } catch (error: any) {
      toast({ title: `Invalid regex: ${error.message}`, variant: "destructive" });
      setMatches([]);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightMatches = () => {
    if (!pattern || !testString) return testString;

    try {
      let flagString = "";
      if (flags.global) flagString += "g";
      if (flags.ignoreCase) flagString += "i";
      if (flags.multiline) flagString += "m";

      const regex = new RegExp(`(${pattern})`, flagString);
      return testString.replace(regex, '<mark>$1</mark>');
    } catch {
      return testString;
    }
  };

  const faqs = [
    { question: "What regex features are supported?", answer: "We support standard JavaScript regex features including flags (global, case-insensitive, multiline) and all common regex patterns." },
    { question: "How do I test my regex?", answer: "Enter your regex pattern, add your test string, configure flags, and click Test. Matches will be highlighted and listed." },
    { question: "Can I use complex regex patterns?", answer: "Yes, any valid JavaScript regex pattern will work, including lookaheads, groups, quantifiers, and more." },
  ];

  return (
    <PageLayout title="Regex Tester" description="Test and debug regular expressions">
      <SEOHead
        title="Regex Tester - Test Regular Expressions | Utility Master"
        description="Test and debug regular expressions with live matching and highlighting. Free and instant."
        keywords="regex tester, regular expression tester, regex debugger, pattern matcher"
        canonicalUrl="/regex-tester"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Regex Tester
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Regular Expression Pattern</Label>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="/pattern/flags"
                className="font-mono mt-2"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="global"
                  checked={flags.global}
                  onCheckedChange={(checked) => setFlags({ ...flags, global: checked })}
                />
                <Label htmlFor="global">Global (g)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="ignoreCase"
                  checked={flags.ignoreCase}
                  onCheckedChange={(checked) => setFlags({ ...flags, ignoreCase: checked })}
                />
                <Label htmlFor="ignoreCase">Ignore Case (i)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="multiline"
                  checked={flags.multiline}
                  onCheckedChange={(checked) => setFlags({ ...flags, multiline: checked })}
                />
                <Label htmlFor="multiline">Multiline (m)</Label>
              </div>
            </div>

            <div>
              <Label>Test String</Label>
              <Textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against the regex..."
                className="min-h-[150px] mt-2"
              />
            </div>

            <Button onClick={testRegex} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Test Regex
            </Button>

            {matches.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Matches ({matches.length})</Label>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(matches.map(m => m.match).join('\n'))}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="border rounded-lg p-4 space-y-2 max-h-[200px] overflow-y-auto">
                  {matches.map((match, idx) => (
                    <div key={idx} className="p-2 bg-primary/10 rounded text-sm font-mono">
                      <span className="text-muted-foreground">#{idx + 1}</span> {match.match} <span className="text-muted-foreground">(at index {match.index})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {testString && pattern && (
              <div className="space-y-2">
                <Label>Highlighted Text</Label>
                <div
                  className="p-4 border rounded-lg min-h-[100px]"
                  dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default RegexTester;

