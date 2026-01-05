import { Sparkles, Menu, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
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

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - More engaging */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 rounded-xl gradient-bg flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <Zap className="h-6 w-6 text-primary-foreground" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-display gradient-text tracking-tight">
                Utility Master
              </h1>
              <p className="text-[11px] text-muted-foreground -mt-0.5 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                50+ Free Tools • 100% Private
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              className="ml-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-sm"
            >
              Explore Tools
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block mx-4 mt-2 px-4 py-3 text-sm font-semibold text-center bg-primary text-primary-foreground rounded-lg"
            >
              🚀 Explore All Tools
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
