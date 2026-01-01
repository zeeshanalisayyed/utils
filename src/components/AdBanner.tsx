import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdBanner = ({ 
  slot = '1203847594', 
  format = 'auto',
  responsive = true,
  className = '',
  style
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.1 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isVisible]);

  return (
    <div 
      ref={adRef}
      className={`ad-container my-6 min-h-[100px] ${className}`}
      style={style}
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