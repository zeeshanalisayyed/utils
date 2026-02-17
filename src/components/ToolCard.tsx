import { LucideIcon, Star, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProgress } from "@/hooks/useToolUsage";
import { isFavorite, toggleFavorite } from "@/components/RecentlyUsed";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
  index: number;
  isPopular?: boolean;
}

export function ToolCard({ title, description, icon: Icon, path, gradient, index, isPopular }: ToolCardProps) {
  const [isUsed, setIsUsed] = useState(false);
  const [isFav, setIsFav] = useState(false);
  
  useEffect(() => {
    const progress = getProgress();
    setIsUsed(progress.toolsUsed.includes(path));
    setIsFav(isFavorite(path));
  }, [path]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(path);
    setIsFav(newState);
  };

  return (
    <Link
      to={path}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
    >
      <div
        className={`relative overflow-hidden rounded-2xl h-full transition-all duration-300 cursor-pointer
          bg-card border
          ${isUsed
            ? "border-primary/40 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
            : "border-border/60 hover:border-primary/40"
          }
          hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.25)]
          p-4 sm:p-5
        `}
        style={{ animationDelay: `${index * 25}ms` }}
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-accent/6" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* Badges + Fav */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-full transition-all duration-200 ${
              isFav
                ? "bg-warning/15 hover:bg-warning/25"
                : "bg-muted/60 hover:bg-muted opacity-0 group-hover:opacity-100"
            }`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`h-3 w-3 ${isFav ? "text-warning fill-warning" : "text-muted-foreground"}`} />
          </button>
          {isPopular && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-warning/10 border border-warning/25">
              <Zap className="h-2.5 w-2.5 text-warning fill-warning" />
              <span className="text-[9px] font-semibold text-warning leading-none">HOT</span>
            </div>
          )}
          {isUsed && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/25">
              <Sparkles className="h-2.5 w-2.5 text-primary" />
              <span className="text-[9px] font-semibold text-primary leading-none">USED</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className={`relative h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3.5
            shadow-[0_4px_12px_-2px_hsl(var(--primary)/0.35)]
            group-hover:scale-110 group-hover:shadow-[0_6px_20px_-2px_hsl(var(--primary)/0.45)]
            transition-all duration-300`}
        >
          <Icon className="h-5.5 w-5.5 text-white drop-shadow-sm" style={{ height: "1.25rem", width: "1.25rem" }} />
          {/* Inner shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent" />
        </div>

        {/* Text */}
        <div className="relative pr-5">
          <h3 className="text-sm sm:text-[0.9rem] font-bold font-display text-foreground mb-0.5 group-hover:text-primary transition-colors duration-200 line-clamp-1 leading-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2 group-hover:text-muted-foreground/80 transition-colors">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
