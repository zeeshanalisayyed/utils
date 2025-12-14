import { Link } from "react-router-dom";
import { Calculator, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold font-display gradient-text">Utility Master</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your complete digital utility suite with 24+ free tools for productivity, calculations, and media processing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-display text-foreground mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {[
                { label: "SIP Calculator", path: "/sip-calculator" },
                { label: "Income Tax", path: "/income-tax" },
                { label: "Converters", path: "/converters" },
                { label: "BMI Calculator", path: "/bmi-calculator" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="font-semibold font-display text-foreground mb-4">Media Tools</h4>
            <ul className="space-y-2">
              {[
                { label: "Video Converter", path: "/video-converter" },
                { label: "MP3 Cutter", path: "/mp3-cutter" },
                { label: "Image Tools", path: "/image-tools" },
                { label: "PDF Converter", path: "/pdf-converter" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold font-display text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about-us" },
                { label: "Blog", path: "/blog" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Terms of Service", path: "/terms-of-service" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Utility Master. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-accent fill-accent" /> for productivity
          </p>
        </div>
      </div>
    </footer>
  );
}
