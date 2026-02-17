import { Link } from "react-router-dom";
import { Zap, Heart, Github, Twitter, ArrowUpRight } from "lucide-react";

const footerLinks = {
  "Popular Tools": [
    { label: "SIP Calculator", path: "/sip-calculator" },
    { label: "Income Tax", path: "/income-tax" },
    { label: "BMI Calculator", path: "/bmi-calculator" },
    { label: "QR Code Generator", path: "/qr-code-generator" },
  ],
  "Media Tools": [
    { label: "Video Converter", path: "/video-converter" },
    { label: "MP3 Cutter", path: "/mp3-cutter" },
    { label: "Image Compressor", path: "/image-compressor" },
    { label: "PDF Converter", path: "/pdf-converter" },
  ],
  "Company": [
    { label: "About Us", path: "/about-us" },
    { label: "Blog", path: "/blog" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-of-service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto relative overflow-hidden">
      {/* Subtle gradient top bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Faint mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-[0_4px_14px_-2px_hsl(var(--primary)/0.4)] group-hover:scale-105 transition-transform duration-200">
                <Zap className="h-4.5 w-4.5 text-primary-foreground" style={{ height: "1.1rem", width: "1.1rem" }} />
              </div>
              <span className="font-bold text-lg font-display gradient-text">Utility Master</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your complete digital utility suite with 50+ free tools for productivity, calculations, and media.
            </p>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-xs font-medium text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
              All systems operational
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold font-display text-foreground mb-4 text-sm tracking-wide uppercase">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Utility Master. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-accent fill-accent animate-pulse-soft" /> for productivity
          </p>
        </div>
      </div>
    </footer>
  );
}
