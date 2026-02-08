import React from "react";
import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Activity, Bell, Download, Image, FolderOpen, Wand2, FileType, Volume2, Battery, Scissors, Video, ScanText, RefreshCw, Sparkles, Zap, Shield, Globe, Type, BarChart3, GitCompare, Code, Link, Mic, Hash, Search, Palette, TrendingUp, Dice6, Coins, Mail, Calendar, Clock, Timer, Layers, ArrowRight, Crown, Rocket, Smile, Radio, X, Filter, Star, Receipt, Lock, BookOpen, Link2, Percent, Repeat, Key, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdBanner, InArticleAd, FooterAd, InFeedAd, PremiumAd } from "@/components/AdBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickStart } from "@/components/QuickStart";
import { EngagementBanner } from "@/components/EngagementBanner";
import { HeroStats } from "@/components/HeroStats";
import { TrustBadges } from "@/components/TrustBadges";
import { FloatingElements } from "@/components/FloatingElements";
import { AdSupportNotice } from "@/components/AdSupportNotice";
import { FeaturedTool } from "@/components/FeaturedTool";
import { GamificationDashboard } from "@/components/GamificationDashboard";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RecentlyUsed } from "@/components/RecentlyUsed";
import { SEOHead } from "@/components/SEOHead";

// Define categories
export type Category = "all" | "financial" | "text" | "media" | "developer" | "converters" | "time" | "productivity" | "design" | "random" | "system";

interface Utility {
  title: string;
  description: string;
  icon: any;
  path: string;
  gradient: string;
  category: Category;
}

const utilities: Utility[] = [
  // Financial Calculators
  { title: "SIP Calculator", description: "Calculate returns on your SIP investments", icon: DollarSign, path: "/sip-calculator", gradient: "from-primary to-primary-glow", category: "financial" },
  { title: "Income Tax", description: "Calculate your income tax in India", icon: Calculator, path: "/income-tax", gradient: "from-accent to-primary-glow", category: "financial" },
  { title: "Loan EMI", description: "Calculate loan EMI and interest", icon: Calculator, path: "/loan-calculator", gradient: "from-primary-glow to-accent", category: "financial" },
  { title: "GST Calculator", description: "Calculate GST for Indian users", icon: Calculator, path: "/gst-calculator", gradient: "from-accent to-primary", category: "financial" },
  { title: "Tip Calculator", description: "Calculate tips and split bills", icon: Calculator, path: "/tip-calculator", gradient: "from-primary to-accent", category: "financial" },
  { title: "Compound Interest", description: "Calculate compound interest returns", icon: TrendingUp, path: "/compound-interest-calculator", gradient: "from-primary-glow to-accent", category: "financial" },
  { title: "ROI Calculator", description: "Calculate return on investment", icon: TrendingUp, path: "/roi-calculator", gradient: "from-accent to-primary-glow", category: "financial" },
  { title: "Percentage Calculator", description: "Calculate percentages", icon: Calculator, path: "/percentage-calculator", gradient: "from-primary-glow to-accent", category: "financial" },
  { title: "BMI Calculator", description: "Check your Body Mass Index", icon: Activity, path: "/bmi-calculator", gradient: "from-accent to-primary", category: "financial" },
  
  // Text & Writing Tools
  { title: "Text Case Converter", description: "Convert text between case formats", icon: Type, path: "/text-case-converter", gradient: "from-accent to-primary", category: "text" },
  { title: "Word Counter", description: "Count words, characters, and more", icon: BarChart3, path: "/word-counter", gradient: "from-primary to-accent", category: "text" },
  { title: "Lorem Ipsum Generator", description: "Generate placeholder text", icon: FileText, path: "/lorem-ipsum-generator", gradient: "from-primary-glow to-accent", category: "text" },
  { title: "Markdown Editor", description: "Edit Markdown with live preview", icon: FileText, path: "/markdown-editor", gradient: "from-accent to-primary-glow", category: "text" },
  { title: "Text Diff Checker", description: "Compare two texts and find differences", icon: GitCompare, path: "/text-diff-checker", gradient: "from-primary to-primary-glow", category: "text" },
  { title: "Email Validator", description: "Validate email addresses", icon: Mail, path: "/email-validator", gradient: "from-accent to-primary-glow", category: "text" },
  
  // Media Tools
  { title: "Image Tools", description: "Resize and transform images", icon: Image, path: "/image-tools", gradient: "from-primary to-primary-glow", category: "media" },
  { title: "Image Compressor", description: "Compress images to reduce size", icon: Image, path: "/image-compressor", gradient: "from-primary to-accent", category: "media" },
  { title: "Image to Text", description: "Extract text from images", icon: ScanText, path: "/image-to-text", gradient: "from-primary to-accent", category: "media" },
  { title: "Video Converter", description: "Convert video formats easily", icon: RefreshCw, path: "/video-converter", gradient: "from-primary-glow to-primary", category: "media" },
  { title: "Video Downloader", description: "Download from social media", icon: Download, path: "/video-downloader", gradient: "from-primary to-accent", category: "media" },
  { title: "MP3 Cutter", description: "Trim and cut audio files", icon: Scissors, path: "/mp3-cutter", gradient: "from-primary to-primary-glow", category: "media" },
  { title: "Screen Recorder", description: "Record your screen with audio", icon: Video, path: "/screen-recorder", gradient: "from-accent to-primary-glow", category: "media" },
  { title: "PDF Converter", description: "PDF to Word and vice versa", icon: FileType, path: "/pdf-converter", gradient: "from-primary-glow to-primary", category: "media" },
  { title: "Text to Speech", description: "Convert text to spoken audio", icon: Volume2, path: "/text-to-speech", gradient: "from-accent to-primary-glow", category: "media" },
  { title: "Speech to Text", description: "Convert speech to text", icon: Mic, path: "/speech-to-text", gradient: "from-primary to-accent", category: "media" },
  
  // Developer Tools
  { title: "JSON Formatter", description: "Format, minify, and validate JSON", icon: Code, path: "/json-formatter", gradient: "from-accent to-primary", category: "developer" },
  { title: "Regex Tester", description: "Test and debug regular expressions", icon: Search, path: "/regex-tester", gradient: "from-primary to-primary-glow", category: "developer" },
  { title: "Hash Generator", description: "Generate cryptographic hashes", icon: Hash, path: "/hash-generator", gradient: "from-primary-glow to-primary", category: "developer" },
  { title: "UUID Generator", description: "Generate unique identifiers", icon: Hash, path: "/uuid-generator", gradient: "from-accent to-primary-glow", category: "developer" },
  { title: "Base64 Encoder", description: "Encode and decode Base64", icon: Code, path: "/base64-encoder", gradient: "from-accent to-primary", category: "developer" },
  { title: "URL Encoder", description: "Encode and decode URLs", icon: Link, path: "/url-encoder", gradient: "from-primary-glow to-accent", category: "developer" },
  
  // Converters
  { title: "Converters", description: "Convert units, currency, and more", icon: Ruler, path: "/converters", gradient: "from-primary-glow to-accent", category: "converters" },
  { title: "CSV to JSON", description: "Convert CSV and JSON formats", icon: FileText, path: "/csv-to-json-converter", gradient: "from-accent to-primary", category: "converters" },
  { title: "Roman Numeral Converter", description: "Convert Roman and Arabic numerals", icon: Hash, path: "/roman-numeral-converter", gradient: "from-primary-glow to-primary", category: "converters" },
  
  // Time & Date Tools
  { title: "Age Calculator", description: "Calculate your exact age", icon: Calculator, path: "/age-calculator", gradient: "from-primary to-accent", category: "time" },
  { title: "Date Calculator", description: "Calculate days between dates", icon: Calendar, path: "/date-calculator", gradient: "from-primary to-primary-glow", category: "time" },
  { title: "Time Zone Converter", description: "Convert times between zones", icon: Clock, path: "/time-zone-converter", gradient: "from-accent to-primary", category: "time" },
  { title: "Stopwatch & Timer", description: "Precise timing tools", icon: Bell, path: "/stopwatch-timer", gradient: "from-accent to-primary", category: "time" },
  { title: "Pomodoro Timer", description: "Focus timer with breaks", icon: Timer, path: "/pomodoro-timer", gradient: "from-primary to-primary-glow", category: "time" },
  
  // Productivity Tools
  { title: "Notes", description: "Quick notes and reminders", icon: FileText, path: "/notes", gradient: "from-primary to-accent", category: "productivity" },
  { title: "Reminder App", description: "Never miss important tasks", icon: Bell, path: "/reminder", gradient: "from-accent to-primary-glow", category: "productivity" },
  { title: "WhatsApp Direct", description: "Message without saving contact", icon: MessageCircle, path: "/whatsapp-direct", gradient: "from-primary-glow to-primary", category: "productivity" },
  
  // Design & Graphics
  { title: "QR Code Generator", description: "Create QR codes instantly", icon: Image, path: "/qr-code-generator", gradient: "from-accent to-primary", category: "design" },
  { title: "Color Picker", description: "Pick colors and get formats", icon: Image, path: "/color-picker", gradient: "from-primary-glow to-accent", category: "design" },
  { title: "App Icon Creator", description: "Create beautiful app icons", icon: Wand2, path: "/app-icon-creator", gradient: "from-primary-glow to-accent", category: "design" },
  { title: "CSS Gradient Generator", description: "Generate beautiful CSS gradients", icon: Palette, path: "/css-gradient-generator", gradient: "from-primary-glow to-accent", category: "design" },
  
  // Random & Fun
  { title: "Dice Roller", description: "Roll virtual dice", icon: Dice6, path: "/dice-roller", gradient: "from-accent to-primary-glow", category: "random" },
  { title: "Coin Flipper", description: "Flip a virtual coin", icon: Coins, path: "/coin-flipper", gradient: "from-primary-glow to-accent", category: "random" },
  { title: "Random Number Generator", description: "Generate random numbers", icon: Dice6, path: "/random-number-generator", gradient: "from-accent to-primary", category: "random" },
  
  // New Tools
  { title: "Unit Converter", description: "Convert units of measurement", icon: Ruler, path: "/unit-converter", gradient: "from-primary to-accent", category: "converters" },
  { title: "Color Contrast Checker", description: "Check WCAG accessibility", icon: Palette, path: "/color-contrast-checker", gradient: "from-accent to-primary-glow", category: "design" },
  { title: "Binary Converter", description: "Convert text to binary", icon: Code, path: "/binary-converter", gradient: "from-primary-glow to-accent", category: "developer" },
  { title: "Character Counter", description: "Count characters and words", icon: Type, path: "/character-counter", gradient: "from-primary to-primary-glow", category: "text" },
  { title: "Countdown Timer", description: "Set countdown timers", icon: Timer, path: "/countdown-timer", gradient: "from-accent to-primary", category: "time" },
  { title: "Hex Converter", description: "Convert text to hexadecimal", icon: Hash, path: "/hex-converter", gradient: "from-primary-glow to-primary", category: "developer" },
  { title: "Aspect Ratio Calculator", description: "Calculate aspect ratios", icon: Layers, path: "/aspect-ratio-calculator", gradient: "from-accent to-primary-glow", category: "design" },
  
  // System Tools
  { title: "Sound Master", description: "Control app sounds and notifications", icon: Volume2, path: "/sound-master", gradient: "from-accent to-primary", category: "system" },
  { title: "Battery Saver", description: "Optimize for longer battery life", icon: Battery, path: "/battery-saver", gradient: "from-primary-glow to-accent", category: "system" },
  { title: "Screenshot Organizer", description: "Auto-categorize screenshots", icon: FolderOpen, path: "/screenshot-organizer", gradient: "from-accent to-primary", category: "system" },
  
  // Security & Privacy
  { title: "Password Generator", description: "Generate secure passwords", icon: FileText, path: "/password-generator", gradient: "from-primary to-primary-glow", category: "productivity" },
  { title: "Password Strength", description: "Check password strength", icon: Shield, path: "/password-strength-checker", gradient: "from-primary to-accent", category: "productivity" },
  
  // New Tools
  { title: "Emoji Picker", description: "Search and copy emojis easily", icon: Smile, path: "/emoji-picker", gradient: "from-yellow-500 to-orange-500", category: "text" },
  { title: "Morse Code Translator", description: "Convert text to morse code", icon: Radio, path: "/morse-code-translator", gradient: "from-primary to-accent", category: "converters" },
  { title: "Invoice Generator", description: "Create professional invoices", icon: Receipt, path: "/invoice-generator", gradient: "from-primary-glow to-accent", category: "financial" },
  { title: "Barcode Generator", description: "Generate product barcodes", icon: BarChart3, path: "/barcode-generator", gradient: "from-accent to-primary", category: "design" },
  { title: "Color Palette", description: "Generate color schemes", icon: Palette, path: "/color-palette-generator", gradient: "from-primary to-primary-glow", category: "design" },
  { title: "Text Encryptor", description: "Encrypt and decrypt text", icon: Lock, path: "/text-encryptor", gradient: "from-accent to-primary-glow", category: "developer" },
  { title: "Reading Time", description: "Estimate reading duration", icon: BookOpen, path: "/reading-time-calculator", gradient: "from-primary-glow to-primary", category: "text" },
  { title: "Slug Generator", description: "Create URL-friendly slugs", icon: Link2, path: "/slug-generator", gradient: "from-primary to-accent", category: "developer" },
  { title: "Discount Calculator", description: "Calculate discounts and savings", icon: Percent, path: "/discount-calculator", gradient: "from-accent to-primary-glow", category: "financial" },
  { title: "Text Repeater", description: "Repeat text multiple times", icon: Repeat, path: "/text-repeater", gradient: "from-primary-glow to-accent", category: "text" },
  { title: "JWT Decoder", description: "Decode JSON Web Tokens", icon: Key, path: "/jwt-decoder", gradient: "from-accent to-primary", category: "developer" },
  { title: "Cron Generator", description: "Build cron expressions", icon: Clock, path: "/cron-generator", gradient: "from-primary to-primary-glow", category: "developer" },
  { title: "SQL Formatter", description: "Format and beautify SQL", icon: Database, path: "/sql-formatter", gradient: "from-primary-glow to-accent", category: "developer" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Built with modern tech for instant results. Most tools work offline." },
  { icon: Shield, title: "Privacy First", description: "Your files never leave your device. 100% client-side processing." },
  { icon: Globe, title: "Works Everywhere", description: "Fully responsive. Desktop, tablet, or mobile - it just works." },
  { icon: Sparkles, title: "Always Free", description: "All tools free forever. No hidden charges or subscriptions." },
];

const categoryInfo: Record<Category, { label: string; icon: any; description: string }> = {
  all: { label: "All Tools", icon: Layers, description: "Browse all available tools" },
  financial: { label: "Financial", icon: DollarSign, description: "Calculators and financial tools" },
  text: { label: "Text & Writing", icon: Type, description: "Text manipulation and writing tools" },
  media: { label: "Media", icon: Video, description: "Image, video, and audio tools" },
  developer: { label: "Developer", icon: Code, description: "Code and developer utilities" },
  converters: { label: "Converters", icon: RefreshCw, description: "Format and unit converters" },
  time: { label: "Time & Date", icon: Clock, description: "Time and date calculators" },
  productivity: { label: "Productivity", icon: Zap, description: "Productivity and organization tools" },
  design: { label: "Design", icon: Palette, description: "Design and graphics tools" },
  random: { label: "Random & Fun", icon: Dice6, description: "Random generators and fun tools" },
  system: { label: "System", icon: Battery, description: "System optimization tools" },
};

// Popular tools (marked for quick access)
const popularToolPaths = [
  "/sip-calculator", "/qr-code-generator", "/password-generator", "/image-compressor",
  "/json-formatter", "/color-picker", "/word-counter", "/pdf-converter"
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showPopularOnly, setShowPopularOnly] = React.useState(false);

  const filteredUtilities = React.useMemo(() => {
    let filtered = utilities;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(utility => utility.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(utility => 
        utility.title.toLowerCase().includes(query) ||
        utility.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by popular
    if (showPopularOnly) {
      filtered = filtered.filter(utility => popularToolPaths.includes(utility.path));
    }
    
    return filtered;
  }, [selectedCategory, searchQuery, showPopularOnly]);

  // SEO structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Utility Master",
    "alternateName": ["Utils", "DevTools", "Online Tools", "Free Tools", "Utility Tools"],
    "url": "https://utils.lovable.app",
    "description": "Free online tools suite with 50+ utilities including calculators, converters, developer tools, image tools, and productivity apps.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": utilities.map(u => u.title),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Utility Master - 50+ Free Online Tools | Calculator, Converter, DevTools & Utils"
        description="Free online tools suite with 50+ utilities: SIP Calculator, JSON Formatter, PDF Converter, Password Generator, Unit Converter, DevTools, and more. Fast, secure, works offline."
        keywords="online tools, free tools, utility, utils, devtools, developer tools, calculators, converters, SIP calculator, JSON formatter, PDF converter, password generator, unit converter, QR code generator"
        canonicalUrl="https://utils.lovable.app/"
        structuredData={structuredData}
      />
      <Header />
      <ScrollToTop />

      <main className="flex-1">
        {/* Hero Section - Simplified & Clean */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Simple badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">50+ Free Tools</span>
              </div>
              
              {/* Clean headline */}
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 text-foreground">
                All Your Tools in <span className="gradient-text">One Place</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Free calculators, converters, and utilities. No signup. Works offline.
              </p>

              {/* Single prominent CTA + Search */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search 50+ tools..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Auto-scroll to tools when searching
                      if (e.target.value) {
                        document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="pl-12 h-14 text-base rounded-2xl border-2 border-border focus:border-primary bg-background shadow-sm"
                  />
                </div>
                <a 
                  href="#tools" 
                  className="inline-flex items-center justify-center gap-2 px-6 h-14 rounded-2xl gradient-bg text-primary-foreground font-semibold shadow-lg hover:shadow-glow transition-all hover:scale-105"
                >
                  <Rocket className="h-5 w-5" />
                  <span className="hidden sm:inline">Browse Tools</span>
                  <span className="sm:hidden">Browse</span>
                </a>
              </div>

              {/* Minimal trust indicators */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-primary" />
                  100% Private
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" />
                  Works Offline
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-primary" />
                  No Signup
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Categories - Horizontal Scroll */}
        <section className="py-6 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Jump to:</span>
              {(Object.keys(categoryInfo) as Category[]).slice(1).map((category) => {
                const info = categoryInfo[category];
                const Icon = info.icon;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border hover:border-primary/50 hover:bg-primary/5 transition-all whitespace-nowrap text-sm font-medium"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {info.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recently Used - Quick Access */}
        <RecentlyUsed allTools={utilities} />

        {/* Gamification Dashboard - Compact */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <GamificationDashboard />
          </div>
        </section>

        {/* Ad before Tools */}
        <div className="container mx-auto px-4 py-2">
          <AdBanner format="horizontal" />
        </div>

        {/* Tools Grid - Main Section */}
        <section id="tools" className="py-10">
          <div className="container mx-auto px-4">
            {/* Simple Header with Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                  {selectedCategory === "all" ? "All Tools" : categoryInfo[selectedCategory].label}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredUtilities.length} tools available
                </p>
              </div>
              
              {/* Quick Filters */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPopularOnly(!showPopularOnly)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    showPopularOnly
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${showPopularOnly ? "fill-current" : ""}`} />
                  Popular
                </button>
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm font-medium text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Active Search Display */}
            {searchQuery && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Searching:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:bg-primary/20 rounded-full p-0.5">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>
            )}

            {/* Tools Grid - Clean & Simple */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredUtilities.map((utility, index) => (
                <React.Fragment key={utility.path}>
                  <ToolCard {...utility} index={index} isPopular={popularToolPaths.includes(utility.path)} />
                  {/* Insert native in-feed ad after every 6 tools for higher ad density */}
                  {(index + 1) % 6 === 0 && index < filteredUtilities.length - 1 && (
                    <InFeedAd />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* No Results State */}
            {filteredUtilities.length === 0 && (
              <div className="text-center py-16">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowPopularOnly(false);
                    setSelectedCategory("all");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Ad before CTA */}
        <div className="container mx-auto px-4 py-4">
          <AdBanner format="horizontal" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                Ready to Boost Your Productivity?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who save time every day with Utility Master. All tools are free, fast, and privacy-focused.
              </p>
              <a href="#tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-all duration-300">
                Start Using Tools
              </a>
            </div>
          </div>
        </section>

        {/* Premium Ad before Footer */}
        <PremiumAd />
        
        {/* Footer Ad */}
        <FooterAd />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
