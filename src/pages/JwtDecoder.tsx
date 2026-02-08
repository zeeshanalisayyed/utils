import { useState, useMemo } from "react";
import { Key, Copy, Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const decoded = useMemo(() => {
    if (!token.trim()) return null;

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return { error: "Invalid JWT format. Token must have 3 parts separated by dots." };
      }

      const decodeBase64 = (str: string) => {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        const padding = "=".repeat((4 - (base64.length % 4)) % 4);
        return JSON.parse(atob(base64 + padding));
      };

      const header = decodeBase64(parts[0]);
      const payload = decodeBase64(parts[1]);

      // Check expiration
      let isExpired = false;
      let expirationDate = null;
      if (payload.exp) {
        expirationDate = new Date(payload.exp * 1000);
        isExpired = expirationDate < new Date();
      }

      return { header, payload, signature: parts[2], isExpired, expirationDate };
    } catch (error) {
      return { error: "Failed to decode JWT. Make sure it's a valid token." };
    }
  }, [token]);

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    toast({ title: `${label} copied!` });
    setTimeout(() => setCopied(null), 2000);
  };

  const formatJson = (obj: object) => JSON.stringify(obj, null, 2);

  const faqs = [
    { question: "What is a JWT?", answer: "JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. It's commonly used for authentication and authorization." },
    { question: "Is it safe to decode JWTs here?", answer: "Yes! JWT decoding happens entirely in your browser. Nothing is sent to our servers. However, never share your tokens publicly." },
    { question: "What are the JWT parts?", answer: "A JWT has three parts: Header (algorithm & type), Payload (claims/data), and Signature (verification). They're separated by dots." },
  ];

  return (
    <PageLayout title="JWT Decoder" description="Decode and inspect JSON Web Tokens">
      <SEOHead
        title="JWT Decoder - Decode JSON Web Tokens | Utility Master"
        description="Free online JWT decoder. Inspect and decode JSON Web Tokens to view header, payload, and check expiration. Works offline."
        keywords="jwt decoder, json web token, jwt parser, token decoder, jwt inspector"
        canonicalUrl="https://utils.lovable.app/jwt-decoder"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              JWT Decoder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Paste JWT Token</Label>
              <Textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                className="min-h-[120px] font-mono text-sm mt-2"
              />
            </div>

            {decoded?.error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-destructive">{decoded.error}</span>
              </div>
            )}

            {decoded && !decoded.error && (
              <div className="space-y-4">
                {decoded.isExpired && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="text-destructive">
                      This token has expired on {decoded.expirationDate?.toLocaleString()}
                    </span>
                  </div>
                )}

                {decoded.expirationDate && !decoded.isExpired && (
                  <div className="p-4 bg-accent/20 border border-accent/30 rounded-lg">
                    <span className="text-accent-foreground">
                      Token expires on {decoded.expirationDate.toLocaleString()}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-primary">Header</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatJson(decoded.header), "Header")}
                    >
                      {copied === "Header" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-sm font-mono">
                    {formatJson(decoded.header)}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-primary">Payload</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(formatJson(decoded.payload), "Payload")}
                    >
                      {copied === "Payload" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-sm font-mono">
                    {formatJson(decoded.payload)}
                  </pre>
                </div>

                <div>
                  <Label className="text-muted-foreground">Signature</Label>
                  <div className="p-4 bg-muted/50 rounded-lg mt-2 text-sm font-mono break-all text-muted-foreground">
                    {decoded.signature}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default JwtDecoder;
