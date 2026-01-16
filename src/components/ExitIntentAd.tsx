import { useEffect, useState, useCallback } from 'react';
import { X, Gift } from 'lucide-react';
import { AdBanner } from './AdBanner';

const EXIT_INTENT_COOLDOWN = 300000; // 5 minutes between exit intent ads

export const ExitIntentAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastShown, setLastShown] = useState(0);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves from the top of the viewport
    if (e.clientY <= 0) {
      const now = Date.now();
      const timeSinceLastShown = now - lastShown;
      
      if (timeSinceLastShown > EXIT_INTENT_COOLDOWN) {
        setIsVisible(true);
        setLastShown(now);
        document.body.style.overflow = 'hidden';
      }
    }
  }, [lastShown]);

  useEffect(() => {
    // Only add listener on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = '';
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 text-center bg-gradient-to-b from-primary/10 to-transparent">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
            <Gift className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Wait! Before You Go...
          </h3>
          <p className="text-sm text-muted-foreground">
            Discover more free tools to boost your productivity
          </p>
        </div>
        
        {/* Ad Content */}
        <div className="px-6 pb-2">
          <AdBanner 
            format="rectangle" 
            style={{ minHeight: '250px' }}
          />
        </div>
        
        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            No thanks, I'll continue browsing
          </button>
        </div>
      </div>
    </div>
  );
};
