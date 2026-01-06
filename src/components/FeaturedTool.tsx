import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Star, TrendingUp, Zap } from "lucide-react";
import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Activity, Bell, Download, Image, FolderOpen, Wand2, FileType, Volume2, Battery, Scissors, Video, ScanText, RefreshCw, Type, BarChart3, GitCompare, Code, Link as LinkIcon, Mic, Hash, Search, Palette, TrendingUp as TrendingUpIcon, Dice6, Coins, Mail, Calendar, Clock, Timer, Shield } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  icon: any;
  path: string;
  gradient: string;
  highlight: string;
}

const featuredTools: Tool[] = [
  { title: "SIP Calculator", description: "Calculate returns on your SIP investments with beautiful projections", icon: DollarSign, path: "/sip-calculator", gradient: "from-emerald-500 to-teal-600", highlight: "Most Popular" },
  { title: "Image Compressor", description: "Compress images up to 90% without losing quality", icon: Image, path: "/image-compressor", gradient: "from-pink-500 to-rose-600", highlight: "Trending" },
  { title: "Password Generator", description: "Create ultra-secure passwords with custom rules", icon: Shield, path: "/password-generator", gradient: "from-violet-500 to-purple-600", highlight: "Security" },
  { title: "QR Code Generator", description: "Generate stunning QR codes in seconds", icon: Image, path: "/qr-code-generator", gradient: "from-blue-500 to-indigo-600", highlight: "Quick & Easy" },
  { title: "Video Converter", description: "Convert videos to any format right in your browser", icon: Video, path: "/video-converter", gradient: "from-orange-500 to-red-600", highlight: "Powerful" },
  { title: "JSON Formatter", description: "Format, validate, and beautify JSON instantly", icon: Code, path: "/json-formatter", gradient: "from-cyan-500 to-blue-600", highlight: "Developer Favorite" },
  { title: "Color Picker", description: "Pick and convert colors across all formats", icon: Palette, path: "/color-picker", gradient: "from-fuchsia-500 to-pink-600", highlight: "Design Tool" },
  { title: "Pomodoro Timer", description: "Boost productivity with focused work sessions", icon: Timer, path: "/pomodoro-timer", gradient: "from-amber-500 to-orange-600", highlight: "Productivity" },
  { title: "Text to Speech", description: "Convert any text to natural-sounding audio", icon: Volume2, path: "/text-to-speech", gradient: "from-green-500 to-emerald-600", highlight: "Accessibility" },
  { title: "Markdown Editor", description: "Write and preview Markdown in real-time", icon: FileText, path: "/markdown-editor", gradient: "from-slate-500 to-gray-600", highlight: "Writer's Choice" },
];

// Get tool of the day based on current date (changes daily)
const getToolOfTheDay = (): Tool => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % featuredTools.length;
  return featuredTools[index];
};

export function FeaturedTool() {
  const tool = getToolOfTheDay();
  const IconComponent = tool.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/50 border border-border p-1">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-gradient opacity-50" />
      
      <div className="relative bg-card rounded-[calc(1.5rem-4px)] p-6 md:p-8">
        {/* Header badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
              <Star className="h-4 w-4 text-white fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground font-display">Tool of the Day</h3>
              <p className="text-xs text-muted-foreground">Updated daily • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">{tool.highlight}</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Icon showcase */}
          <div className="relative group">
            <div className={`h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
              <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-white" />
            </div>
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10`} />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
              {tool.title}
            </h4>
            <p className="text-muted-foreground mb-4 max-w-md">
              {tool.description}
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                ⚡ Instant Results
              </span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                🔒 100% Private
              </span>
              <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                🆓 Always Free
              </span>
            </div>

            {/* CTA */}
            <Link
              to={tool.path}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group`}
            >
              <Zap className="h-4 w-4" />
              Try {tool.title} Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-10">
          <Sparkles className="h-24 w-24 text-primary" />
        </div>
      </div>
    </div>
  );
}
