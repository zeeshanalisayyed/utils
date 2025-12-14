import { useState, useMemo } from "react";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "", icon: ShieldAlert };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      long: password.length >= 12,
    };

    if (checks.length) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 2;
    if (checks.long) score += 1;

    if (score <= 2) return { score, label: "Very Weak", color: "text-red-600", bg: "bg-red-500", icon: ShieldAlert, checks };
    if (score <= 4) return { score, label: "Weak", color: "text-orange-600", bg: "bg-orange-500", icon: ShieldAlert, checks };
    if (score <= 6) return { score, label: "Fair", color: "text-yellow-600", bg: "bg-yellow-500", icon: Shield, checks };
    if (score <= 8) return { score, label: "Good", color: "text-blue-600", bg: "bg-blue-500", icon: Shield, checks };
    return { score, label: "Strong", color: "text-green-600", bg: "bg-green-500", icon: ShieldCheck, checks };
  }, [password]);

  const StrengthIcon = strength.icon;
  const progress = (strength.score / 9) * 100;

  const faqs = [
    { question: "What makes a strong password?", answer: "A strong password is at least 12 characters long and includes uppercase, lowercase, numbers, and special characters." },
    { question: "How is password strength calculated?", answer: "We check for length, character variety (uppercase, lowercase, numbers, symbols), and overall complexity." },
    { question: "Is my password stored?", answer: "No, password checking happens entirely in your browser. Your password never leaves your device." },
  ];

  return (
    <PageLayout title="Password Strength Checker" description="Check your password strength">
      <SEOHead
        title="Password Strength Checker - Check Password Security | Utility Master"
        description="Check the strength of your password. Free and private."
        keywords="password strength checker, password security, password validator, strong password"
        canonicalUrl="/password-strength-checker"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Password Strength Checker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Enter Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to check"
                className="mt-2"
              />
            </div>

            {password && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Strength</span>
                    <div className={`flex items-center gap-2 ${strength.color}`}>
                      <StrengthIcon className="h-4 w-4" />
                      <span className="font-semibold">{strength.label}</span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-sm font-medium">Requirements:</div>
                  <div className="space-y-1">
                    {[
                      { key: "length", label: "At least 8 characters" },
                      { key: "uppercase", label: "Contains uppercase letters" },
                      { key: "lowercase", label: "Contains lowercase letters" },
                      { key: "numbers", label: "Contains numbers" },
                      { key: "special", label: "Contains special characters" },
                      { key: "long", label: "At least 12 characters (recommended)" },
                    ].map((req) => (
                      <div key={req.key} className="flex items-center gap-2 text-sm">
                        {strength.checks?.[req.key as keyof typeof strength.checks] ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-muted-foreground">○</span>
                        )}
                        <span className={strength.checks?.[req.key as keyof typeof strength.checks] ? "" : "text-muted-foreground"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default PasswordStrengthChecker;

