import { useEffect, useState } from 'react';
import { AdBanner } from './AdBanner';
import { X } from 'lucide-react';

// Shows an ad when user scrolls past 50% of the page (high engagement indicator)
export const ScrollProgressAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollHeight) * 100;
      
      // Trigger at 60% scroll depth
      if (scrollProgress >= 60) {
        setIsVisible(true);
        setHasTriggered(true);
        
        // Allow close after 3 seconds
        setTimeout(() => setCanClose(true), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered]);

  const handleClose = () => {
    if (canClose) {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-24 right-4 z-50 w-[300px] hidden md:block animate-in slide-in-from-right duration-500">
      <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={!canClose}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all ${
            canClose 
              ? 'bg-muted hover:bg-muted/80 cursor-pointer' 
              : 'bg-muted/50 cursor-not-allowed'
          }`}
          aria-label="Close ad"
        >
          <X className={`h-3 w-3 ${canClose ? 'text-foreground' : 'text-muted-foreground'}`} />
        </button>

        {/* Header */}
        <div className="px-3 py-2 bg-muted/50 border-b border-border">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            You might also like
          </span>
        </div>

        {/* Ad Content */}
        <div className="p-2">
          <AdBanner 
            format="rectangle" 
            style={{ minHeight: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};
