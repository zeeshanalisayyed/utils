import { ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Utility Master | User Agreement & Guidelines</title>
        <meta name="description" content="Read Utility Master's Terms of Service to understand the rules, guidelines, and conditions for using our free online tools and services." />
        <meta name="keywords" content="terms of service, user agreement, terms and conditions, usage policy, utility master terms" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/terms" />
        
        <meta property="og:title" content="Terms of Service - Utility Master" />
        <meta property="og:description" content="Read our Terms of Service to understand how to use Utility Master's tools responsibly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilitymaster.lovable.app/terms" />
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
            <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 1, 2025
            </p>
          </div>

          <div className="space-y-8 prose prose-neutral dark:prose-invert max-w-none">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using Utility Master, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
                <p>
                  These terms apply to all users, visitors, and others who access or use our online tools and services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Utility Master provides free online tools including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Financial calculators (SIP, Income Tax, BMI)</li>
                  <li>Unit converters (length, mass, time, data, etc.)</li>
                  <li>Media tools (image compression, video conversion)</li>
                  <li>Productivity tools (notes, reminders, screenshot organizer)</li>
                  <li>Communication tools (WhatsApp direct message)</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>3. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>When using our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the tools lawfully and for legitimate purposes only</li>
                  <li>Not attempt to harm, disrupt, or compromise our systems</li>
                  <li>Not use automated systems to access our tools excessively</li>
                  <li>Not upload malicious files or content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not interfere with other users' access to our services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>4. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  All content, features, and functionality of Utility Master are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may use our tools for personal and commercial purposes, but you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reproduce or copy our website design or code</li>
                  <li>Create derivative works based on our services</li>
                  <li>Redistribute or resell our tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>5. User Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You retain all rights to any content you upload or create using our tools. We do not claim ownership of your files, notes, or other user-generated content.
                </p>
                <p>
                  Most content is processed locally in your browser and never reaches our servers. For tools that require server processing, we:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process files only as necessary to provide the service</li>
                  <li>Delete files immediately after processing</li>
                  <li>Do not store, share, or use your content for any other purpose</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>6. Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
                <p>
                  We do not warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our services will be uninterrupted or error-free</li>
                  <li>Results from our tools will be accurate or reliable</li>
                  <li>Any errors will be corrected</li>
                  <li>Our servers are free from viruses or harmful components</li>
                </ul>
                <p>
                  Calculators and converters are provided for informational purposes only. Always verify important calculations independently.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Loss of profits, data, or use</li>
                  <li>Business interruption</li>
                  <li>Loss of goodwill</li>
                  <li>Any other intangible losses</li>
                </ul>
                <p>
                  This applies whether or not we have been advised of the possibility of such damages.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>8. Third-Party Links and Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Content on third-party sites</li>
                  <li>Privacy practices of external services</li>
                  <li>Terms and conditions of linked websites</li>
                </ul>
                <p>
                  Use of third-party services is at your own risk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>9. Advertisements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We display advertisements through Google AdSense to support our free services. By using our tools, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>See advertisements on our website</li>
                  <li>Google's ad serving policies and practices</li>
                  <li>Potential use of cookies for ad personalization</li>
                </ul>
                <p>
                  We do not control the content of advertisements displayed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>10. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend your access to our services immediately, without prior notice, for any reason including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Breach of these Terms of Service</li>
                  <li>Abusive or excessive use of resources</li>
                  <li>Violation of laws or regulations</li>
                  <li>At our sole discretion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>11. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>12. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>13. Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about these Terms of Service, please visit our <Link to="/about" className="text-primary hover:underline">About Us</Link> page for contact information.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfService;