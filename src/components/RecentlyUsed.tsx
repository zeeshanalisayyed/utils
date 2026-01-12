import { getProgress } from "@/hooks/useToolUsage";
import { Clock, ArrowRight, Heart, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

interface ToolInfo {
  title: string;
  path: string;
  icon: any;
  gradient: string;
}

interface RecentlyUsedProps {
  allTools: ToolInfo[];
}

// Get favorites from localStorage
const getFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem("favoriteTools");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save favorites to localStorage
const saveFavorites = (favorites: string[]) => {
  localStorage.setItem("favoriteTools", JSON.stringify(favorites));
};

export const toggleFavorite = (path: string): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(path);
  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  } else {
    favorites.push(path);
    saveFavorites(favorites);
    return true;
  }
};

export const isFavorite = (path: string): boolean => {
  return getFavorites().includes(path);
};

export const RecentlyUsed = ({ allTools }: RecentlyUsedProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const recentTools = useMemo(() => {
    const progress = getProgress();
    const recentPaths = [...progress.toolsUsed].reverse().slice(0, 6);
    return recentPaths
      .map((path) => allTools.find((tool) => tool.path === path))
      .filter(Boolean) as ToolInfo[];
  }, [allTools]);

  const favoriteTools = useMemo(() => {
    return favorites
      .map((path) => allTools.find((tool) => tool.path === path))
      .filter(Boolean) as ToolInfo[];
  }, [favorites, allTools]);

  const handleToggleFavorite = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(path);
    setFavorites(getFavorites());
  };

  // Show section if there are favorites or recent tools
  const hasContent = favoriteTools.length > 0 || recentTools.length > 0;

  if (!hasContent) {
    return (
      <section className="py-6 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Quick Access</h3>
          </div>
          <div className="text-center py-8 rounded-xl border border-dashed border-border bg-card/50">
            <Star className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Start using tools to see them here, or star your favorites!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-muted/20">
      <div className="container mx-auto px-4 space-y-6">
        {/* Favorites Section */}
        {favoriteTools.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <h3 className="text-sm font-semibold text-foreground">Favorites</h3>
              <span className="text-xs text-muted-foreground">({favoriteTools.length})</span>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {favoriteTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-md transition-all min-w-[200px] flex-shrink-0"
                  >
                    <button
                      onClick={(e) => handleToggleFavorite(tool.path, e)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-yellow-500/10 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    </button>
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-sm text-foreground truncate flex-1 pr-6">
                      {tool.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Used Section */}
        {recentTools.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Recently Used</h3>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {recentTools.map((tool) => {
                const Icon = tool.icon;
                const isFav = favorites.includes(tool.path);
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all min-w-[200px] flex-shrink-0"
                  >
                    <button
                      onClick={(e) => handleToggleFavorite(tool.path, e)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary/10 transition-colors"
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star className={`h-3.5 w-3.5 ${isFav ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                    </button>
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-sm text-foreground truncate flex-1 pr-6">
                      {tool.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
