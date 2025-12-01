import { ArrowLeft, Target, Users, Heart, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Utility Master - Our Mission & Vision | Free Online Tools</title>
        <meta name="description" content="Learn about Utility Master's mission to provide free, powerful online tools for everyone. Discover our vision, values, and commitment to helping users save time with essential utilities." />
        <meta name="keywords" content="about utility master, mission, vision, team, online tools platform, free utilities, tool collection" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/about" />
        
        <meta property="og:title" content="About Utility Master - Free Online Tools Platform" />
        <meta property="og:description" content="Learn about our mission to provide free, powerful online tools that help you work smarter and save time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilitymaster.lovable.app/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Utility Master",
            "description": "Learn about Utility Master's mission to provide free online tools for everyone",
            "url": "https://utilitymaster.lovable.app/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "Utility Master",
              "description": "Provider of free online tools and calculators",
              "url": "https://utilitymaster.lovable.app"
            }
          })}
        </script>
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

        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <AdBanner />
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Utility Master
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering users with free, powerful online tools to simplify everyday tasks and boost productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  At Utility Master, our mission is to democratize access to essential digital tools. We believe that everyone deserves access to high-quality utilities without barriers, subscriptions, or hidden costs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to building a comprehensive suite of tools that solve real problems, save time, and empower users to work smarter. From financial calculators to media converters, every tool is designed with simplicity, speed, and reliability in mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where powerful digital tools are accessible to everyone, regardless of their technical expertise or financial resources. Our platform serves millions of users worldwide, helping them accomplish their daily tasks efficiently.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As we grow, we remain committed to user privacy, data security, and continuous innovation. We listen to our community and constantly evolve our tools based on real user feedback and emerging needs.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Why Choose Utility Master?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Always Free</h3>
                  <p className="text-sm text-muted-foreground">
                    All our tools are completely free to use. No hidden fees, no premium tiers - just powerful utilities accessible to everyone.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">
                    We respect your privacy. Most tools work entirely in your browser, and we never store your personal data without explicit consent.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Always Available</h3>
                  <p className="text-sm text-muted-foreground">
                    Access our tools anytime, anywhere. Works on desktop, tablet, and mobile devices with a responsive design.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">No Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Start using our tools immediately. No sign-ups, no accounts, no hassle - just instant access to utilities you need.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Regularly Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    We continuously improve our tools based on user feedback and add new features to meet evolving needs.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Fast & Reliable</h3>
                  <p className="text-sm text-muted-foreground">
                    Our tools are optimized for speed and accuracy, delivering results instantly without compromising quality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We value your feedback and suggestions. Whether you have a feature request, found a bug, or just want to share how our tools have helped you, we'd love to hear from you.
              </p>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong>Support:</strong> For technical support or questions about our tools
                </p>
                <p className="text-muted-foreground">
                  <strong>Feedback:</strong> Share your ideas for new tools or improvements
                </p>
                <p className="text-muted-foreground">
                  <strong>Partnerships:</strong> Interested in collaboration or integration opportunities
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default AboutUs;