import { LucideIcon, Star, ArrowRight, Sparkles } from "lucide-react";
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
        className={`relative overflow-hidden rounded-2xl bg-card border transition-all duration-300 h-full ${
          isUsed 
            ? "border-primary/30 bg-primary/5" 
            : "border-border/50 hover:border-primary/30"
        } p-4 sm:p-5 hover:shadow-strong hover:-translate-y-1`}
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {/* Badges and Favorite Button */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-full transition-all ${
              isFav 
                ? "bg-yellow-500/10 hover:bg-yellow-500/20" 
                : "bg-muted/50 hover:bg-muted opacity-0 group-hover:opacity-100"
            }`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`h-3.5 w-3.5 ${isFav ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
          </button>
          {isUsed && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-2.5 w-2.5 text-primary" />
              <span className="text-[9px] font-medium text-primary">Used</span>
            </div>
          )}
          {isPopular && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
              <span className="text-[9px] font-medium text-yellow-600 dark:text-yellow-400">Popular</span>
            </div>
          )}
        </div>
        
        {/* Background gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        {/* Icon */}
        <div
          className={`relative h-11 w-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}
        >
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>

        {/* Content */}
        <div className="relative pr-6">
          <h3 className="text-sm sm:text-base font-semibold font-display text-foreground mb-0.5 group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </Link>
  );
}
