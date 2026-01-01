import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, Zap } from "lucide-react";

const trendingTools = [
  { title: "QR Code Generator", path: "/qr-code-generator", uses: "2.5k" },
  { title: "Password Generator", path: "/password-generator", uses: "1.8k" },
  { title: "Image Compressor", path: "/image-compressor", uses: "1.5k" },
  { title: "JSON Formatter", path: "/json-formatter", uses: "1.2k" },
];

export function EngagementBanner() {
  const [recentTools, setRecentTools] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recent-tools");
    if (saved) {
      setRecentTools(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {/* Trending Tools */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-5 border border-orange-500/20">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold font-display text-foreground">Trending Now</h3>
        </div>
        <div className="space-y-2">
          {trendingTools.slice(0, 3).map((tool, i) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="flex items-center justify-between p-2.5 bg-background/50 hover:bg-background rounded-lg transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-orange-500">#{i + 1}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tool.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">{tool.uses} uses</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Used or Quick Tips */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-4">
          {recentTools.length > 0 ? (
            <>
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold font-display text-foreground">Continue Where You Left</h3>
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold font-display text-foreground">Pro Tips</h3>
            </>
          )}
        </div>
        {recentTools.length > 0 ? (
          <div className="space-y-2">
            {recentTools.slice(0, 3).map((path) => (
              <Link
                key={path}
                to={path}
                className="block p-2.5 bg-background/50 hover:bg-background rounded-lg transition-all text-sm font-medium text-foreground hover:text-primary"
              >
                {path.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              All tools work offline once loaded
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Your files never leave your device
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              Bookmark your favorite tools
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook to track tool usage
export function useToolTracking(toolPath: string) {
  useEffect(() => {
    const saved = localStorage.getItem("recent-tools");
    const recent: string[] = saved ? JSON.parse(saved) : [];
    
    // Add current tool to front, remove duplicates, keep max 5
    const updated = [toolPath, ...recent.filter(p => p !== toolPath)].slice(0, 5);
    localStorage.setItem("recent-tools", JSON.stringify(updated));
  }, [toolPath]);
}
