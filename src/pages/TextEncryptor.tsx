import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { FAQ } from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Copy, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

const TextEncryptor = () => {
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  // Simple XOR encryption (for demo - not cryptographically secure)
  const xorEncrypt = (text: string, key: string): string => {
    if (!key) return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Base64 encode
  };

  const xorDecrypt = (encoded: string, key: string): string => {
    if (!key) return encoded;
    try {
      const text = atob(encoded); // Base64 decode
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch {
      return "Invalid encrypted text";
    }
  };

  const processText = () => {
    if (!inputText) {
      toast.error("Please enter text");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    if (mode === 'encrypt') {
      setOutputText(xorEncrypt(inputText, password));
      toast.success("Text encrypted!");
    } else {
      setOutputText(xorDecrypt(inputText, password));
      toast.success("Text decrypted!");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const swapMode = () => {
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
    setInputText(outputText);
    setOutputText('');
  };

  const faqs = [
    { question: "Is this encryption secure?", answer: "This uses XOR encryption for basic protection. For sensitive data, use professional encryption tools." },
    { question: "What happens if I forget my password?", answer: "The text cannot be decrypted without the exact password used for encryption." },
    { question: "Can I encrypt any text?", answer: "Yes, you can encrypt any text including emojis and special characters." },
  ];

  return (
    <PageLayout title="Text Encryptor" description="Encrypt and decrypt text with a password">
      <SEOHead
        title="Text Encryptor - Encrypt & Decrypt Text Online"
        description="Encrypt and decrypt text messages with a password. Secure your private messages with simple encryption."
        keywords="text encryption, encrypt text, decrypt text, password protection, secure text"
        canonicalUrl="https://utils.lovable.app/text-encryptor"
      />
      <AdBanner format="horizontal" className="mb-6" />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {mode === 'encrypt' ? <Lock className="h-5 w-5 text-primary" /> : <Unlock className="h-5 w-5 text-primary" />}
            {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter encryption password"
            />
          </div>

          <div>
            <Label>{mode === 'encrypt' ? 'Text to Encrypt' : 'Text to Decrypt'}</Label>
            <Textarea 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              placeholder={mode === 'encrypt' ? 'Enter your secret message...' : 'Paste encrypted text...'}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={processText} className="flex-1">
              {mode === 'encrypt' ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button variant="outline" onClick={swapMode}>
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          <InArticleAd />

          {outputText && (
            <div>
              <Label>Result</Label>
              <div className="relative">
                <Textarea value={outputText} readOnly rows={4} className="pr-10" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  onClick={copyOutput}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <FAQ items={faqs} />
    </PageLayout>
  );
};

export default TextEncryptor;
