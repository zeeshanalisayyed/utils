import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Activity, Bell, Download, Image, FolderOpen, Wand2, FileType, Volume2, Battery, Scissors, Video, ScanText, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";

const utilities = [
  {
    title: "SIP Calculator",
    description: "Calculate returns on your SIP investments",
    icon: DollarSign,
    path: "/sip-calculator",
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "Income Tax",
    description: "Calculate your income tax in India",
    icon: Calculator,
    path: "/income-tax",
    gradient: "from-accent to-primary-glow",
  },
  {
    title: "Converters",
    description: "Convert units, currency, and more",
    icon: Ruler,
    path: "/converters",
    gradient: "from-primary-glow to-accent",
  },
  {
    title: "BMI Calculator",
    description: "Check your Body Mass Index",
    icon: Activity,
    path: "/bmi-calculator",
    gradient: "from-accent to-primary",
  },
  {
    title: "Notes",
    description: "Quick notes and reminders",
    icon: FileText,
    path: "/notes",
    gradient: "from-primary to-accent",
  },
  {
    title: "WhatsApp Direct",
    description: "Message without saving contact",
    icon: MessageCircle,
    path: "/whatsapp-direct",
    gradient: "from-primary-glow to-primary",
  },
  {
    title: "Reminder App",
    description: "Never miss important tasks",
    icon: Bell,
    path: "/reminder",
    gradient: "from-accent to-primary-glow",
  },
  {
    title: "Video Downloader",
    description: "Download from social media",
    icon: Download,
    path: "/video-downloader",
    gradient: "from-primary to-accent",
  },
  {
    title: "App Icon Creator",
    description: "Create beautiful app icons",
    icon: Wand2,
    path: "/app-icon-creator",
    gradient: "from-primary-glow to-accent",
  },
  {
    title: "Screenshot Organizer",
    description: "Auto-categorize screenshots",
    icon: FolderOpen,
    path: "/screenshot-organizer",
    gradient: "from-accent to-primary",
  },
  {
    title: "Image Tools",
    description: "Resize and transform images",
    icon: Image,
    path: "/image-tools",
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "PDF Converter",
    description: "PDF to Word and vice versa",
    icon: FileType,
    path: "/pdf-converter",
    gradient: "from-primary-glow to-primary",
  },
  {
    title: "Sound Master",
    description: "Control app sounds and notifications",
    icon: Volume2,
    path: "/sound-master",
    gradient: "from-accent to-primary",
  },
  {
    title: "Battery Saver",
    description: "Optimize for longer battery life",
    icon: Battery,
    path: "/battery-saver",
    gradient: "from-primary-glow to-accent",
  },
  {
    title: "MP3 Cutter",
    description: "Trim and cut audio files",
    icon: Scissors,
    path: "/mp3-cutter",
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "Screen Recorder",
    description: "Record your screen with audio",
    icon: Video,
    path: "/screen-recorder",
    gradient: "from-accent to-primary-glow",
  },
  {
    title: "Image to Text",
    description: "Extract text from images",
    icon: ScanText,
    path: "/image-to-text",
    gradient: "from-primary to-accent",
  },
  {
    title: "Video Converter",
    description: "Convert video formats easily",
    icon: RefreshCw,
    path: "/video-converter",
    gradient: "from-primary-glow to-primary",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Utility Master
              </h1>
              <p className="text-xs text-muted-foreground">All-in-one utility toolkit</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Your Complete Digital Utility Suite
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Utility Master brings together 18+ powerful tools in one place, designed to simplify your daily digital tasks. 
            From financial calculators to media converters, we've got everything you need to boost your productivity and save time.
          </p>
        </div>

        {/* Feature Categories */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What You Can Do</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border bg-card">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Financial Planning</h4>
              <p className="text-muted-foreground">
                Make informed financial decisions with our SIP calculator for mutual fund investments, income tax calculator 
                supporting both old and new tax regimes for India, and BMI calculator for health tracking. Get accurate 
                projections with detailed breakdowns and charts to plan your financial future effectively.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Media Processing</h4>
              <p className="text-muted-foreground">
                Transform and optimize your media files with ease. Convert videos between popular formats like MP4, WebM, and AVI. 
                Trim and cut MP3 audio files precisely. Compress and resize images while maintaining quality. Extract text from 
                images using advanced OCR technology. Download videos from social media platforms instantly.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-glow to-accent flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Productivity Tools</h4>
              <p className="text-muted-foreground">
                Boost your daily productivity with our comprehensive toolkit. Take quick notes with categories and export options. 
                Set reminders with notification scheduling. Send WhatsApp messages without saving contacts. Record your screen 
                with audio. Organize screenshots automatically with AI. Convert PDFs to Word and vice versa seamlessly.
              </p>
            </Card>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-12 bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Why Choose Utility Master?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Fast & Efficient</h4>
                <p className="text-muted-foreground">
                  Built with modern web technologies (React, Vite, TypeScript) for lightning-fast performance. Most tools work 
                  offline and process your data locally in the browser for maximum speed and privacy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Privacy First</h4>
                <p className="text-muted-foreground">
                  Your data stays with you. Client-side processing means your files never leave your device unless you explicitly 
                  use cloud-based features. We don't store or track your personal information or files.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Works Everywhere</h4>
                <p className="text-muted-foreground">
                  Fully responsive design works seamlessly on desktop, tablet, and mobile devices. Access your tools anytime, 
                  anywhere with a modern web browser. No installation required.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🆓</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Completely Free</h4>
                <p className="text-muted-foreground">
                  All tools are free to use with no hidden charges or subscriptions. We're ad-supported to keep the service free 
                  for everyone and continuously add new features based on user feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">Choose Tool</h4>
              <p className="text-sm text-muted-foreground">Select from our collection of 18+ specialized utilities</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Input Data</h4>
              <p className="text-sm text-muted-foreground">Enter your data, upload files, or adjust settings</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Process</h4>
              <p className="text-sm text-muted-foreground">Tool processes instantly, securely in your browser</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                4
              </div>
              <h4 className="font-semibold text-foreground mb-2">Get Results</h4>
              <p className="text-sm text-muted-foreground">View, download, or copy your results immediately</p>
            </div>
          </div>
        </section>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4 text-center">All Available Tools</h3>
          <p className="text-center text-muted-foreground mb-6">Click any tool below to get started instantly</p>
        </div>

        <AdBanner slot="top-banner" format="auto" />

        {/* Utility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {utilities.map((utility) => (
            <Link key={utility.path} to={utility.path}>
              <Card className="group relative overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.15)] cursor-pointer bg-card">
                <div className="p-6">
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${utility.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <utility.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {utility.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{utility.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </Link>
          ))}
        </div>

        <AdBanner slot="bottom-banner" format="auto" />

        {/* Popular Tools Section */}
        <section className="mt-12 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Most Popular Tools</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 border-border bg-card">
              <h4 className="text-lg font-semibold text-foreground mb-3">SIP Calculator for India</h4>
              <p className="text-muted-foreground mb-3">
                Plan your mutual fund investments with our comprehensive SIP calculator. Calculate expected returns based on 
                monthly investment amount, time period, and expected annual returns. Visualize your wealth growth with interactive 
                charts showing investment vs returns breakdown. Perfect for Indian investors planning their financial future.
              </p>
              <Link to="/sip-calculator" className="text-primary hover:underline text-sm font-medium">
                Try SIP Calculator →
              </Link>
            </Card>

            <Card className="p-6 border-border bg-card">
              <h4 className="text-lg font-semibold text-foreground mb-3">Income Tax Calculator</h4>
              <p className="text-muted-foreground mb-3">
                Calculate your income tax liability accurately for FY 2024-25. Supports both old tax regime (with deductions) 
                and new tax regime (with lower rates). Input your income, deductions under 80C, 80D, home loan interest, and 
                get detailed tax breakdown with effective tax rate. Specifically designed for Indian taxpayers.
              </p>
              <Link to="/income-tax" className="text-primary hover:underline text-sm font-medium">
                Try Tax Calculator →
              </Link>
            </Card>

            <Card className="p-6 border-border bg-card">
              <h4 className="text-lg font-semibold text-foreground mb-3">Video Converter & Downloader</h4>
              <p className="text-muted-foreground mb-3">
                Convert videos between popular formats including MP4, WebM, MOV, and AVI using powerful FFmpeg technology. 
                Also download videos from social media platforms by simply pasting the URL. All processing is done securely 
                with no file size limits. Perfect for content creators and video enthusiasts.
              </p>
              <Link to="/video-converter" className="text-primary hover:underline text-sm font-medium">
                Try Video Tools →
              </Link>
            </Card>

            <Card className="p-6 border-border bg-card">
              <h4 className="text-lg font-semibold text-foreground mb-3">Unit Converters Suite</h4>
              <p className="text-muted-foreground mb-3">
                Convert between various units including length (meter, feet, inches), weight (kg, pounds), area (sqft, sqm), 
                speed (kmph, mph), temperature (Celsius, Fahrenheit), data (MB, GB, TB), volume, and time. Instant conversions 
                with high precision. Essential tool for students, professionals, and everyday use.
              </p>
              <Link to="/converters" className="text-primary hover:underline text-sm font-medium">
                Try Converters →
              </Link>
            </Card>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12 bg-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Tips for Best Experience</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">💡 Bookmark Frequently Used Tools</h4>
              <p className="text-sm text-muted-foreground">
                Bookmark your favorite tools for quick access. Each tool has its own URL that you can save directly 
                to your browser bookmarks or home screen on mobile devices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">💾 Data Stays Local</h4>
              <p className="text-sm text-muted-foreground">
                Your notes, reminders, and settings are automatically saved in your browser's local storage. They persist 
                across sessions and are never sent to our servers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">🌐 Use Modern Browsers</h4>
              <p className="text-sm text-muted-foreground">
                For best performance, use the latest version of Chrome, Firefox, Safari, or Edge. Some advanced features 
                like screen recording require modern browser APIs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">📤 Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Tools like Notes and Screen Recorder allow you to export your data. Regularly back up important notes 
                and recordings to prevent data loss.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-8 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">About Utility Master</h4>
              <p className="text-sm text-muted-foreground">
                Utility Master is a comprehensive collection of web-based tools designed to simplify your daily digital tasks. 
                We're committed to providing free, fast, and privacy-focused utilities for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Popular Categories</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Financial Calculators (SIP, Tax, BMI)</li>
                <li>Media Tools (Video, Audio, Image)</li>
                <li>Unit Converters (Length, Weight, Time)</li>
                <li>Productivity (Notes, Reminders, WhatsApp)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ 100% Free to Use</li>
                <li>✓ No Registration Required</li>
                <li>✓ Privacy-Focused Design</li>
                <li>✓ Works on All Devices</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-6 border-t border-border">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
            <p>© 2025 Utility Master - Your all-in-one productivity toolkit for daily digital tasks</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
