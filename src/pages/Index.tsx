import React from "react";
import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Activity, Bell, Download, Image, FolderOpen, Wand2, FileType, Volume2, Battery, Scissors, Video, ScanText, RefreshCw, Sparkles, Zap, Shield, Globe, Type, BarChart3, GitCompare, Code, Link, Mic, Hash, Search, Palette, TrendingUp, Dice6, Coins, Mail, Calendar, Clock, Timer, Layers } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  // System Tools
  { title: "Sound Master", description: "Control app sounds and notifications", icon: Volume2, path: "/sound-master", gradient: "from-accent to-primary", category: "system" },
  { title: "Battery Saver", description: "Optimize for longer battery life", icon: Battery, path: "/battery-saver", gradient: "from-primary-glow to-accent", category: "system" },
  { title: "Screenshot Organizer", description: "Auto-categorize screenshots", icon: FolderOpen, path: "/screenshot-organizer", gradient: "from-accent to-primary", category: "system" },
  
  // Security & Privacy
  { title: "Password Generator", description: "Generate secure passwords", icon: FileText, path: "/password-generator", gradient: "from-primary to-primary-glow", category: "productivity" },
  { title: "Password Strength", description: "Check password strength", icon: Shield, path: "/password-strength-checker", gradient: "from-primary to-accent", category: "productivity" },
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

const Index = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("all");

  const filteredUtilities = selectedCategory === "all" 
    ? utilities 
    : utilities.filter(utility => utility.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">50+ Free Utilities</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 animate-fade-in-up text-balance">
                Your Complete{" "}
                <span className="gradient-text">Digital Utility</span>{" "}
                Suite
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '100ms' }}>
                From financial calculators to media converters, everything you need to boost productivity in one beautiful, free toolkit.
              </p>

              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <a href="#tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5">
                  Explore Tools
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
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

        <AdBanner slot="top-banner" format="auto" />

        {/* Tools Grid */}
        <section id="tools" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                All Tools at Your Fingertips
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Click any tool to get started instantly. No signup required.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="max-w-6xl mx-auto mb-8">
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)} className="w-full">
                <div className="overflow-x-auto -mx-4 px-4">
                  <TabsList className="inline-flex w-auto h-auto p-1 bg-muted/50 min-w-full sm:min-w-0">
                    {(Object.keys(categoryInfo) as Category[]).map((category) => {
                      const info = categoryInfo[category];
                      const Icon = info.icon;
                      const count = category === "all" ? utilities.length : utilities.filter(u => u.category === category).length;
                      return (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="flex flex-col items-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm min-w-[70px] sm:min-w-[90px] flex-shrink-0"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap text-center leading-tight">{info.label}</span>
                          <span className="text-[9px] sm:text-[10px] text-muted-foreground">({count})</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredUtilities.map((utility, index) => (
                    <ToolCard key={utility.path} {...utility} index={index} />
                  ))}
                </div>
                {filteredUtilities.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No tools found in this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <AdBanner slot="bottom-banner" format="auto" />

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
      </main>

      <Footer />
    </div>
  );
};

export default Index;
