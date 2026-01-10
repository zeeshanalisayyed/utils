import { LucideIcon, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <Link to={path} className="block group">
      <div
        className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-strong hover:-translate-y-1 h-full"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400">Popular</span>
          </div>
        )}
        
        {/* Background gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Icon */}
        <div
          className={`relative h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}
        >
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-base font-semibold font-display text-foreground mb-1 group-hover:text-primary transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
