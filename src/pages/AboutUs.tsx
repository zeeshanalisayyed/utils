import { Target, Users, Heart, Mail, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Utility Master - Our Mission & Vision | Free Online Tools</title>
        <meta name="description" content="Learn about Utility Master's mission to provide free, powerful online tools for everyone. Discover our vision, values, and commitment to helping users save time with essential utilities." />
        <meta name="keywords" content="about utility master, mission, vision, team, online tools platform, free utilities, tool collection" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/about-us" />
        
        <meta property="og:title" content="About Utility Master - Free Online Tools Platform" />
        <meta property="og:description" content="Learn about our mission to provide free, powerful online tools that help you work smarter and save time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilitymaster.lovable.app/about-us" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Utility Master",
            "description": "Learn about Utility Master's mission to provide free online tools for everyone",
            "url": "https://utilitymaster.lovable.app/about-us",
            "mainEntity": {
              "@type": "Organization",
              "name": "Utility Master",
              "description": "Provider of free online tools and calculators",
              "url": "https://utilitymaster.lovable.app"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <div className="relative overflow-hidden border-b border-border">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="container mx-auto px-4 py-16 relative text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                About <span className="gradient-text">Utility Master</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Empowering users with free, powerful tools to simplify everyday tasks
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <AdBanner />

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-border bg-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-display">
                    <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary-foreground" />
                    </div>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    At Utility Master, our mission is to democratize access to essential digital tools. 
                    We believe everyone deserves high-quality utilities without barriers or hidden costs.
                  </p>
                  <p>
                    From financial calculators to media converters, every tool is designed with 
                    simplicity, speed, and reliability in mind.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-display">
                    <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary-foreground" />
                    </div>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We envision a world where powerful digital tools are accessible to everyone, 
                    regardless of technical expertise or financial resources.
                  </p>
                  <p>
                    We remain committed to user privacy, data security, and continuous innovation 
                    based on real user feedback.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-display">
                  <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Always Free", desc: "No hidden fees, no premium tiers - just powerful utilities for everyone." },
                    { title: "Privacy First", desc: "Most tools work in-browser. We never store personal data without consent." },
                    { title: "Always Available", desc: "Access anywhere on desktop, tablet, or mobile with responsive design." },
                    { title: "No Registration", desc: "Start using tools immediately. No sign-ups or accounts required." },
                    { title: "Regularly Updated", desc: "We continuously improve based on user feedback and emerging needs." },
                    { title: "Fast & Reliable", desc: "Optimized for speed and accuracy, delivering instant results." },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="font-semibold font-display text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-display">
                  <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We value your feedback. Whether you have a feature request or just want to share 
                  how our tools have helped you, we'd love to hear from you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>support@utilitymaster.app</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>www.utilitymaster.app</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Serving users worldwide</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
