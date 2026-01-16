import { useEffect, useRef, useState } from 'react';

// Desktop anchor ad that sticks to the bottom of the viewport
export const AnchorAd = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Delay loading to not block initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isLoaded]);

  return (
    <div 
      ref={adRef}
      className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="container mx-auto px-4 py-2">
        {isLoaded && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-8924261817141821"
            data-ad-slot="1203847594"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
};
