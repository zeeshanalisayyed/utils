import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedTool {
  title: string;
  path: string;
  emoji: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
}

export function RelatedTools({ tools, title = "You might also like" }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="bg-muted/50 rounded-xl p-5 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="flex items-center gap-3 p-3 bg-background hover:bg-primary/5 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 group"
          >
            <span className="text-xl">{tool.emoji}</span>
            <span className="text-sm font-medium text-foreground flex-1">{tool.title}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Tool relationships mapping
export const toolRelations: Record<string, RelatedTool[]> = {
  "/qr-code-generator": [
    { title: "Color Picker", path: "/color-picker", emoji: "🎨" },
    { title: "App Icon Creator", path: "/app-icon-creator", emoji: "📲" },
    { title: "Image Compressor", path: "/image-compressor", emoji: "🖼️" },
  ],
  "/password-generator": [
    { title: "Password Strength", path: "/password-strength-checker", emoji: "🔒" },
    { title: "Hash Generator", path: "/hash-generator", emoji: "#️⃣" },
    { title: "Base64 Encoder", path: "/base64-encoder", emoji: "🔐" },
  ],
  "/image-compressor": [
    { title: "Image Tools", path: "/image-tools", emoji: "🖼️" },
    { title: "PDF Converter", path: "/pdf-converter", emoji: "📄" },
    { title: "QR Code Generator", path: "/qr-code-generator", emoji: "📱" },
  ],
  "/sip-calculator": [
    { title: "Compound Interest", path: "/compound-interest-calculator", emoji: "📈" },
    { title: "ROI Calculator", path: "/roi-calculator", emoji: "💹" },
    { title: "Loan EMI", path: "/loan-calculator", emoji: "🏦" },
  ],
  "/json-formatter": [
    { title: "CSV to JSON", path: "/csv-to-json-converter", emoji: "📊" },
    { title: "Regex Tester", path: "/regex-tester", emoji: "🔍" },
    { title: "Base64 Encoder", path: "/base64-encoder", emoji: "🔐" },
  ],
  "/word-counter": [
    { title: "Text Case Converter", path: "/text-case-converter", emoji: "Aa" },
    { title: "Lorem Ipsum Generator", path: "/lorem-ipsum-generator", emoji: "📝" },
    { title: "Markdown Editor", path: "/markdown-editor", emoji: "✍️" },
  ],
  "/video-downloader": [
    { title: "Video Converter", path: "/video-converter", emoji: "🎬" },
    { title: "MP3 Cutter", path: "/mp3-cutter", emoji: "✂️" },
    { title: "Screen Recorder", path: "/screen-recorder", emoji: "📹" },
  ],
  "/age-calculator": [
    { title: "Date Calculator", path: "/date-calculator", emoji: "📅" },
    { title: "Time Zone Converter", path: "/time-zone-converter", emoji: "🌍" },
    { title: "BMI Calculator", path: "/bmi-calculator", emoji: "⚖️" },
  ],
  "/stopwatch-timer": [
    { title: "Pomodoro Timer", path: "/pomodoro-timer", emoji: "🍅" },
    { title: "Reminder App", path: "/reminder", emoji: "⏰" },
    { title: "Date Calculator", path: "/date-calculator", emoji: "📅" },
  ],
};

export function getRelatedTools(currentPath: string): RelatedTool[] {
  return toolRelations[currentPath] || [];
}
