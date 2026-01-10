import React from "react";
import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Activity, Bell, Download, Image, FolderOpen, Wand2, FileType, Volume2, Battery, Scissors, Video, ScanText, RefreshCw, Sparkles, Zap, Shield, Globe, Type, BarChart3, GitCompare, Code, Link, Mic, Hash, Search, Palette, TrendingUp, Dice6, Coins, Mail, Calendar, Clock, Timer, Layers, ArrowRight, Crown, Rocket, Smile, Radio, X, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdBanner, InArticleAd, FooterAd, InFeedAd } from "@/components/AdBanner";
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
import { UsageStatsDashboard } from "@/components/UsageStatsDashboard";

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Enhanced */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 gradient-mesh" />
          <FloatingElements />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Top badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">#1 Free Utility App</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">50+ Premium Tools</span>
                </div>
              </div>
              
              {/* Main headline */}
              <div className="text-center mb-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 animate-fade-in-up text-balance leading-tight">
                  <span className="block text-foreground">The Ultimate</span>
                  <span className="block gradient-text animate-gradient bg-[length:200%_auto]">Utility Master</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '100ms' }}>
                  <span className="text-foreground font-semibold">50+ powerful tools</span> for calculators, converters, media editing & more.
                  <br className="hidden md:block" />
                  <span className="text-primary font-medium">100% free • 100% private • Works offline</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <a 
                    href="#tools" 
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl gradient-bg text-primary-foreground font-bold text-lg shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <Rocket className="h-5 w-5" />
                    Start Using Free Tools
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#tools" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-card border-2 border-border hover:border-primary/50 text-foreground font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <Zap className="h-5 w-5 text-primary" />
                    Browse All Tools
                  </a>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <TrustBadges />
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <HeroStats />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, i) => (
                <div key={feature.title} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold font-display text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tool of the Day */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <FeaturedTool />
          </div>
        </section>

        {/* Usage Stats Dashboard */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <UsageStatsDashboard />
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <QuickStart />
          </div>
        </section>

        {/* Ad after Quick Start */}
        <div className="container mx-auto px-4 py-4">
          <AdBanner format="horizontal" />
        </div>

        {/* Engagement Banner */}
        <section className="container mx-auto px-4">
          <EngagementBanner />
        </section>

        {/* Ad Support Notice */}
        <section className="container mx-auto px-4 py-4">
          <AdSupportNotice />
        </section>

        {/* Ad before Tools Grid */}
        <div className="container mx-auto px-4 py-4">
          <InArticleAd />
        </div>

        {/* Tools Grid */}
        <section id="tools" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                All Tools at Your Fingertips
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Click any tool to get started instantly. No signup required.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tools by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-10 h-12 text-base rounded-xl border-2 border-border focus:border-primary transition-colors bg-background"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
                
                {/* Popular Filter Toggle */}
                <button
                  onClick={() => setShowPopularOnly(!showPopularOnly)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                    showPopularOnly
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted hover:bg-muted/80 text-foreground border border-border"
                  }`}
                >
                  <Star className={`h-4 w-4 ${showPopularOnly ? "fill-current" : ""}`} />
                  Popular
                </button>
              </div>
              
              {/* Active Filters Display */}
              {(searchQuery || showPopularOnly || selectedCategory !== "all") && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filters:
                  </span>
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="hover:bg-primary/20 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {showPopularOnly && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm">
                      <Star className="h-3 w-3 fill-current" />
                      Popular Only
                      <button onClick={() => setShowPopularOnly(false)} className="hover:bg-yellow-500/20 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm">
                      {categoryInfo[selectedCategory].label}
                      <button onClick={() => setSelectedCategory("all")} className="hover:bg-accent/20 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowPopularOnly(false);
                      setSelectedCategory("all");
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
              
              {/* Results Count */}
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredUtilities.length}</span> of {utilities.length} tools
                </span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="max-w-6xl mx-auto mb-8">
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)} className="w-full">
                <div className="overflow-x-auto -mx-4 px-4 pb-2">
                  <TabsList className="inline-flex w-auto h-auto p-1.5 bg-muted/50 rounded-2xl min-w-full sm:min-w-0 gap-1">
                    {(Object.keys(categoryInfo) as Category[]).map((category) => {
                      const info = categoryInfo[category];
                      const Icon = info.icon;
                      const count = category === "all" ? utilities.length : utilities.filter(u => u.category === category).length;
                      return (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="flex flex-col items-center gap-1 px-3 sm:px-4 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-xl min-w-[75px] sm:min-w-[95px] flex-shrink-0 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap text-center leading-tight">{info.label}</span>
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">({count})</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              </Tabs>
              
              {/* Category Description and Tools Grid */}
              <div className="mt-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    {React.createElement(categoryInfo[selectedCategory].icon, { className: "h-4 w-4 text-primary" })}
                    <span className="text-sm font-medium text-primary">{categoryInfo[selectedCategory].label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{categoryInfo[selectedCategory].description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredUtilities.map((utility, index) => (
                    <React.Fragment key={utility.path}>
                      <ToolCard {...utility} index={index} isPopular={popularToolPaths.includes(utility.path)} />
                      {/* Insert native in-feed ad after every 8 tools */}
                      {(index + 1) % 8 === 0 && index < filteredUtilities.length - 1 && (
                        <InFeedAd />
                      )}
                    </React.Fragment>
                  ))}
                </div>
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
            </div>
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
        
        {/* Footer Ad */}
        <FooterAd />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
