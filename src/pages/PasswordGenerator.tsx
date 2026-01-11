import { useState, useCallback } from "react";
import { Key, Copy, RefreshCw, Check, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";
import { useToolUsage } from "@/hooks/useToolUsage";

const PasswordGenerator = () => {
  useToolUsage("/password-generator", "productivity");
  
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      toast({ title: "Select at least one character type", variant: "destructive" });
      return;
    }

    let result = "";
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);
    for (let i = 0; i < length[0]; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  const copyPassword = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast({ title: "Password copied!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length[0] >= 12) score += 1;
    if (length[0] >= 16) score += 1;
    if (length[0] >= 20) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 2;

    if (score <= 3) return { label: "Weak", color: "text-destructive", icon: ShieldAlert, bg: "bg-destructive/20" };
    if (score <= 5) return { label: "Medium", color: "text-yellow-500", icon: Shield, bg: "bg-yellow-500/20" };
    return { label: "Strong", color: "text-primary", icon: ShieldCheck, bg: "bg-primary/20" };
  };

  const strength = getStrength();
  const StrengthIcon = strength.icon;

  const faqs = [
    { question: "How are passwords generated?", answer: "We use cryptographically secure random number generation (crypto.getRandomValues) for maximum security. Passwords are generated locally in your browser." },
    { question: "What makes a strong password?", answer: "A strong password is at least 16 characters long and includes uppercase, lowercase, numbers, and symbols. Avoid common words and patterns." },
    { question: "Are generated passwords stored?", answer: "No. Passwords are generated entirely in your browser and never sent to any server. Close the page and they're gone forever." },
  ];

  return (
    <PageLayout title="Password Generator" description="Generate secure, random passwords">
      <SEOHead
        title="Secure Password Generator - Create Strong Passwords | Utility Master"
        description="Generate cryptographically secure passwords with customizable length and character types. Free, instant, and private."
        keywords="password generator, secure password, random password, strong password generator"
        canonicalUrl="/password-generator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Generate Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {password && (
              <div className="relative">
                <div className="p-4 bg-muted/50 rounded-lg border border-border font-mono text-lg break-all">
                  {password}
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button variant="ghost" size="sm" onClick={copyPassword}>
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {password && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${strength.bg}`}>
                <StrengthIcon className={`h-5 w-5 ${strength.color}`} />
                <span className={`font-medium ${strength.color}`}>
                  Password Strength: {strength.label}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Password Length</Label>
                  <span className="text-sm font-medium">{length[0]} characters</span>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={8}
                  max={64}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                  <Switch
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={setIncludeUppercase}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                  <Switch
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={setIncludeLowercase}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                  <Switch
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={setIncludeNumbers}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <Label htmlFor="symbols">Symbols (!@#$)</Label>
                  <Switch
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={setIncludeSymbols}
                  />
                </div>
              </div>
            </div>

            <Button onClick={generatePassword} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Password
            </Button>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default PasswordGenerator;
