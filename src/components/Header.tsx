import { Sparkles, Menu, X, Zap, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useState } from "react";

const navLinks = [
  { label: "Tools", path: "/" },
  { label: "About", path: "/about-us" },
  { label: "Blog", path: "/blog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_0_0_hsl(var(--border)/0.5)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shadow-[0_4px_14px_-2px_hsl(var(--primary)/0.5)] group-hover:shadow-[0_6px_20px_-2px_hsl(var(--primary)/0.6)] transition-all duration-300 group-hover:scale-105">
              <Zap className="h-5 w-5 text-primary-foreground" />
              <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-warning animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold font-display gradient-text tracking-tight leading-none block">
                Utility Master
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-success/10 border border-success/25">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-success font-semibold text-[9px]">LIVE</span>
                </span>
                50+ Free Tools
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg gradient-bg text-primary-foreground shadow-[0_2px_10px_-2px_hsl(var(--primary)/0.4)] hover:shadow-[0_4px_16px_-2px_hsl(var(--primary)/0.5)] hover:scale-105 transition-all duration-200"
            >
              Explore Tools
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 mx-1 mt-2 px-4 py-3 text-sm font-semibold gradient-bg text-primary-foreground rounded-xl shadow-sm"
            >
              <Zap className="h-4 w-4" />
              Explore All Tools
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
