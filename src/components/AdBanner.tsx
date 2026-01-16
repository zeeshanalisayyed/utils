import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Different ad slots for better targeting and higher CPM
const AD_SLOTS = {
  default: '1203847594',
  premium: '1203847594', // Use same slot but can be different
  sidebar: '1203847594',
  footer: '1203847594',
};

export const AdBanner = ({ 
  slot = AD_SLOTS.default, 
  format = 'auto',
  responsive = true,
  className = '',
  style
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adKey] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    // Use IntersectionObserver to load ads only when visible (lazy loading)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' } // Load slightly before visible
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense error:', err);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div 
      ref={adRef}
      className={`ad-container my-6 min-h-[100px] ${className}`}
      style={style}
      data-ad-key={adKey}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client="ca-pub-8924261817141821"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      )}
    </div>
  );
};

// Specialized ad components for different placements
export const InArticleAd = ({ className = '' }: { className?: string }) => (
  <AdBanner 
    format="fluid" 
    className={`my-8 ${className}`}
    style={{ textAlign: 'center' }}
  />
);

export const SidebarAd = ({ className = '' }: { className?: string }) => (
  <AdBanner 
    format="rectangle" 
    className={`sticky top-4 ${className}`}
  />
);

export const BannerAd = ({ className = '' }: { className?: string }) => (
  <AdBanner 
    format="horizontal" 
    className={`w-full ${className}`}
  />
);

export const FooterAd = ({ className = '' }: { className?: string }) => (
  <div className={`bg-muted/30 py-4 ${className}`}>
    <div className="container mx-auto px-4">
      <AdBanner format="horizontal" />
    </div>
  </div>
);

// Native in-feed ad that blends with tool cards
export const InFeedAd = ({ className = '' }: { className?: string }) => (
  <div className={`group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${className}`}>
    <div className="absolute top-2 right-2">
      <span className="text-[10px] text-primary/60 uppercase tracking-wider font-medium">Sponsored</span>
    </div>
    <AdBanner 
      format="fluid" 
      responsive={true}
      style={{ minHeight: '120px' }}
    />
  </div>
);

// Premium large ad for high-visibility placements
export const PremiumAd = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gradient-to-r from-primary/5 via-transparent to-accent/5 py-8 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Featured Partner</span>
      </div>
      <AdBanner 
        format="horizontal" 
        style={{ minHeight: '90px' }}
      />
    </div>
  </div>
);