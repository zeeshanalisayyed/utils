import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { AdBanner } from './AdBanner';

const INTERSTITIAL_COOLDOWN = 45000; // 45 seconds between interstitials (was 60)
const COUNTDOWN_SECONDS = 4; // Reduced from 5 for better UX

export const InterstitialAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canClose, setCanClose] = useState(false);
  const location = useLocation();
  const [lastShown, setLastShown] = useState(0);
  const [navigationCount, setNavigationCount] = useState(0);

  // Track navigations and show interstitial every 3rd tool page visit
  useEffect(() => {
    const isToolPage = location.pathname !== '/' && 
                       !location.pathname.includes('/about') && 
                       !location.pathname.includes('/privacy') &&
                       !location.pathname.includes('/terms') &&
                       !location.pathname.includes('/blog');
    
    if (isToolPage) {
      setNavigationCount(prev => prev + 1);
    }
  }, [location.pathname]);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastShown = now - lastShown;
    
    // Show interstitial every 3rd navigation, with cooldown
    if (navigationCount > 0 && navigationCount % 2 === 0 && timeSinceLastShown > INTERSTITIAL_COOLDOWN) {
      setIsVisible(true);
      setLastShown(now);
      setCountdown(COUNTDOWN_SECONDS);
      setCanClose(false);
    }
  }, [navigationCount, lastShown]);

  // Countdown timer
  useEffect(() => {
    if (!isVisible || canClose) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, canClose]);

  const handleClose = useCallback(() => {
    if (canClose) {
      setIsVisible(false);
    }
  }, [canClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canClose) {
        handleClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isVisible, canClose, handleClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Advertisement</span>
          <button
            onClick={handleClose}
            disabled={!canClose}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              canClose 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {canClose ? (
              <>
                <X className="h-4 w-4" />
                Close
              </>
            ) : (
              `Skip in ${countdown}s`
            )}
          </button>
        </div>
        
        {/* Ad Content */}
        <div className="p-6">
          <AdBanner 
            format="rectangle" 
            style={{ minHeight: '250px' }}
          />
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground">
            Ads help keep Utility Master free for everyone
          </p>
        </div>
      </div>
    </div>
  );
};
