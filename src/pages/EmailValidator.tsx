import { useState } from "react";
import { Mail, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const EmailValidator = () => {
  const [email, setEmail] = useState("");

  const validate = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValid = email ? validate(email) : null;

  const faqs = [
    { question: "How does email validation work?", answer: "We check if the email follows the standard format: username@domain.extension. This doesn't verify if the email actually exists." },
    { question: "Does this check if the email exists?", answer: "No, this only validates the format. To check if an email exists, you would need to send a verification email." },
    { question: "What makes an email invalid?", answer: "Missing @ symbol, invalid domain, missing top-level domain, or special characters in wrong places." },
  ];

  return (
    <PageLayout title="Email Validator" description="Validate email addresses">
      <SEOHead
        title="Email Validator - Validate Email Addresses | Utility Master"
        description="Validate email address format. Free and instant."
        keywords="email validator, email checker, validate email, email format checker"
        canonicalUrl="/email-validator"
      />
      <AdBanner />

      <div className="max-w-2xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Validator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="mt-2"
              />
            </div>

            {isValid !== null && (
              <div className={`p-4 rounded-lg border flex items-center gap-3 ${
                isValid ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
              }`}>
                {isValid ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-600 dark:text-green-400">Valid Email</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="font-semibold text-red-600 dark:text-red-400">Invalid Email</span>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default EmailValidator;

