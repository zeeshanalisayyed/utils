import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const MobileStickyAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Re-show ad after 2 minutes if dismissed
  useEffect(() => {
    if (isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(false);
        setIsVisible(true);
      }, 120000); // 2 minutes
      
      return () => clearTimeout(timer);
    }
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute -top-8 right-2 flex items-center gap-1 px-2 py-1 bg-background border border-border rounded-t-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close ad"
      >
        <X className="h-3 w-3" />
        <span>Close</span>
      </button>
      
      {/* Ad Container */}
      <div className="p-2 pb-[env(safe-area-inset-bottom)]">
        <AdBanner 
          format="horizontal" 
          responsive={true}
          style={{ minHeight: '50px', maxHeight: '100px' }}
          className="!my-0"
        />
      </div>
    </div>
  );
};
