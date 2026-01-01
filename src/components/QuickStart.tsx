import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const popularTools = [
  { title: "QR Code", path: "/qr-code-generator", emoji: "📱" },
  { title: "Password", path: "/password-generator", emoji: "🔐" },
  { title: "Image Compress", path: "/image-compressor", emoji: "🖼️" },
  { title: "PDF Convert", path: "/pdf-converter", emoji: "📄" },
  { title: "Calculator", path: "/sip-calculator", emoji: "💰" },
];

export function QuickStart() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-6 border border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        <h3 className="font-semibold font-display text-foreground">Quick Start - Try Now!</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularTools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-background hover:bg-primary/10 rounded-full border border-border hover:border-primary/50 transition-all duration-200 hover:scale-105 group"
          >
            <span className="text-lg">{tool.emoji}</span>
            <span className="text-sm font-medium text-foreground">{tool.title}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
