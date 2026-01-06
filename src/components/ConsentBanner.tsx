import { useState, useEffect } from "react";
import { X, Cookie, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "utility_master_consent";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(CONSENT_KEY, "dismissed");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl p-4 md:p-6">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pr-6 md:pr-0">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span>We Value Your Experience</span>
                <Heart className="h-4 w-4 text-red-500" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to improve your experience and show relevant ads to keep our{" "}
                <span className="text-primary font-medium">50+ tools completely free</span>. 
                Your privacy matters to us — no personal data is sold or shared.
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-green-500" />
                  100% Privacy Focused
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  Ad-Supported, Always Free
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDismiss}
                className="flex-1 md:flex-initial"
              >
                Maybe Later
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="flex-1 md:flex-initial gradient-bg text-primary-foreground"
              >
                Accept & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
