import { getProgress } from "@/hooks/useToolUsage";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface ToolInfo {
  title: string;
  path: string;
  icon: any;
  gradient: string;
}

interface RecentlyUsedProps {
  allTools: ToolInfo[];
}

export const RecentlyUsed = ({ allTools }: RecentlyUsedProps) => {
  const recentTools = useMemo(() => {
    const progress = getProgress();
    // Get last 6 used tools (most recent first)
    const recentPaths = [...progress.toolsUsed].reverse().slice(0, 6);
    return recentPaths
      .map((path) => allTools.find((tool) => tool.path === path))
      .filter(Boolean) as ToolInfo[];
  }, [allTools]);

  if (recentTools.length === 0) return null;

  return (
    <section className="py-6 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Recently Used</h3>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {recentTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all min-w-[200px] flex-shrink-0"
              >
                <div
                  className={`h-10 w-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                >
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-sm text-foreground truncate flex-1">
                  {tool.title}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
