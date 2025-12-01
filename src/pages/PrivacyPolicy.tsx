import { ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Utility Master | How We Protect Your Data</title>
        <meta name="description" content="Utility Master's Privacy Policy explains how we collect, use, and protect your personal information. Learn about our commitment to data privacy and security." />
        <meta name="keywords" content="privacy policy, data protection, user privacy, security, utility master privacy" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/privacy" />
        
        <meta property="og:title" content="Privacy Policy - Utility Master" />
        <meta property="og:description" content="Learn how Utility Master protects your privacy and handles your data securely." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilitymaster.lovable.app/privacy" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <AdBanner />
          
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 1, 2025
            </p>
          </div>

          <div className="space-y-8 prose prose-neutral dark:prose-invert max-w-none">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to Utility Master. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle information when you use our website and tools.
                </p>
                <p>
                  Utility Master provides free online tools including calculators, converters, media processors, and productivity utilities. Most of our tools work entirely in your browser without requiring data transmission to our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">2.1 Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect certain information including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website addresses</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">2.2 Local Storage</h3>
                <p>
                  Some tools store data locally in your browser to save your preferences and work:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Notes and reminders you create</li>
                  <li>App settings and preferences</li>
                  <li>Screen recordings (stored locally only)</li>
                </ul>
                <p>
                  This data never leaves your device unless you explicitly choose to export or share it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our tools and services</li>
                  <li>Improve user experience and functionality</li>
                  <li>Analyze usage patterns and optimize performance</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>4. Data Processing & Storage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">4.1 Client-Side Processing</h3>
                <p>
                  Most of our tools process data entirely in your browser. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unit converters and calculators</li>
                  <li>Image compression and resizing</li>
                  <li>Video format conversion</li>
                  <li>Notes and reminders</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-4">4.2 Server-Side Processing</h3>
                <p>
                  Some advanced features require server processing:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Image to text extraction (OCR)</li>
                  <li>Screenshot categorization</li>
                </ul>
                <p>
                  Files processed on our servers are temporarily stored only during processing and immediately deleted afterward. We do not retain copies of your files.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>5. Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <h3 className="font-semibold text-foreground">5.1 Google AdSense</h3>
                <p>
                  We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
                </p>

                <h3 className="font-semibold text-foreground mt-4">5.2 Analytics</h3>
                <p>
                  We may use analytics services to understand how users interact with our tools. This helps us improve functionality and user experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>6. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar technologies for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Storing user preferences</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Serving relevant advertisements</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Note that disabling cookies may affect functionality of some tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>7. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited data retention policies</li>
                </ul>
                <p>
                  However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>8. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Export your data</li>
                </ul>
                <p>
                  Since most data is stored locally in your browser, you can manage it directly through your browser settings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>9. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>10. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>11. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this privacy policy or how we handle your data, please visit our <Link to="/about" className="text-primary hover:underline">About Us</Link> page for contact information.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;