import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  gradient: string;
  index: number;
}

export function ToolCard({ title, description, icon: Icon, path, gradient, index }: ToolCardProps) {
  return (
    <Link to={path} className="block group">
      <div
        className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-strong hover:-translate-y-1"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Background gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Icon */}
        <div
          className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}
        >
          <Icon className="h-7 w-7 text-primary-foreground" />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-lg font-semibold font-display text-foreground mb-1.5 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
