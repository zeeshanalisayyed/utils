import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, Zap } from "lucide-react";
import { getProgress, saveProgress, getLevelFromXP, UserProgress } from "@/hooks/useToolUsage";

const trendingTools = [
  { title: "QR Code Generator", path: "/qr-code-generator", uses: "2.5k" },
  { title: "Password Generator", path: "/password-generator", uses: "1.8k" },
  { title: "Image Compressor", path: "/image-compressor", uses: "1.5k" },
  { title: "JSON Formatter", path: "/json-formatter", uses: "1.2k" },
];

export function EngagementBanner() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const recentTools = progress?.toolsUsed.slice(-5).reverse() || [];

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

// Category mapping for tools
const toolCategories: Record<string, string> = {
  "/sip-calculator": "financial",
  "/income-tax": "financial",
  "/loan-calculator": "financial",
  "/gst-calculator": "financial",
  "/tip-calculator": "financial",
  "/compound-interest-calculator": "financial",
  "/roi-calculator": "financial",
  "/percentage-calculator": "financial",
  "/bmi-calculator": "financial",
  "/text-case-converter": "text",
  "/word-counter": "text",
  "/lorem-ipsum-generator": "text",
  "/markdown-editor": "text",
  "/text-diff-checker": "text",
  "/email-validator": "text",
  "/character-counter": "text",
  "/emoji-picker": "text",
  "/image-tools": "media",
  "/image-compressor": "media",
  "/image-to-text": "media",
  "/video-converter": "media",
  "/video-downloader": "media",
  "/mp3-cutter": "media",
  "/screen-recorder": "media",
  "/pdf-converter": "media",
  "/text-to-speech": "media",
  "/speech-to-text": "media",
  "/json-formatter": "developer",
  "/regex-tester": "developer",
  "/hash-generator": "developer",
  "/uuid-generator": "developer",
  "/base64-encoder": "developer",
  "/url-encoder": "developer",
  "/binary-converter": "developer",
  "/hex-converter": "developer",
  "/converters": "converters",
  "/csv-to-json-converter": "converters",
  "/roman-numeral-converter": "converters",
  "/unit-converter": "converters",
  "/morse-code-translator": "converters",
  "/age-calculator": "time",
  "/date-calculator": "time",
  "/time-zone-converter": "time",
  "/stopwatch-timer": "time",
  "/pomodoro-timer": "time",
  "/countdown-timer": "time",
  "/notes": "productivity",
  "/reminder": "productivity",
  "/whatsapp-direct": "productivity",
  "/password-generator": "productivity",
  "/password-strength-checker": "productivity",
  "/qr-code-generator": "design",
  "/color-picker": "design",
  "/app-icon-creator": "design",
  "/css-gradient-generator": "design",
  "/color-contrast-checker": "design",
  "/aspect-ratio-calculator": "design",
  "/dice-roller": "random",
  "/coin-flipper": "random",
  "/random-number-generator": "random",
  "/sound-master": "system",
  "/battery-saver": "system",
  "/screenshot-organizer": "system",
};

// Hook to track tool usage with XP system
export function useToolTracking(toolPath: string) {
  useEffect(() => {
    if (!toolPath || toolPath === "/") return;
    
    const progress = getProgress();
    const isNewTool = !progress.toolsUsed.includes(toolPath);
    const category = toolCategories[toolPath];
    
    // Update tools used
    if (isNewTool) {
      progress.toolsUsed.push(toolPath);
      progress.xp += 50; // XP for new tool
    }
    
    // Update total uses
    progress.totalUses += 1;
    progress.xp += 10; // XP per use
    
    // Update level
    progress.level = getLevelFromXP(progress.xp);
    
    // Update daily challenges
    progress.dailyChallenges = progress.dailyChallenges.map(challenge => {
      if (progress.completedChallenges.includes(challenge.id)) {
        return challenge;
      }
      
      let newCurrent = challenge.current;
      
      switch (challenge.type) {
        case "use_tools":
          newCurrent = Math.min(challenge.current + 1, challenge.target);
          break;
        case "new_tools":
          if (isNewTool) {
            newCurrent = Math.min(challenge.current + 1, challenge.target);
          }
          break;
        case "use_category":
          if (category === challenge.category) {
            newCurrent = Math.min(challenge.current + 1, challenge.target);
          }
          break;
      }
      
      // Check if challenge completed
      if (newCurrent >= challenge.target && !progress.completedChallenges.includes(challenge.id)) {
        progress.completedChallenges.push(challenge.id);
        progress.xp += challenge.xpReward;
        progress.level = getLevelFromXP(progress.xp);
      }
      
      return { ...challenge, current: newCurrent };
    });
    
    saveProgress(progress);
    
    // Also update legacy storage
    const saved = localStorage.getItem("recent-tools");
    const recent: string[] = saved ? JSON.parse(saved) : [];
    const updated = [toolPath, ...recent.filter(p => p !== toolPath)].slice(0, 5);
    localStorage.setItem("recent-tools", JSON.stringify(updated));
  }, [toolPath]);
}
