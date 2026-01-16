import { useState, useEffect } from 'react';
import { CheckCircle, X, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';
import { Link } from 'react-router-dom';

interface ToolCompletionAdProps {
  isVisible: boolean;
  onClose: () => void;
  toolName?: string;
}

export const ToolCompletionAd = ({ isVisible, onClose, toolName = 'tool' }: ToolCompletionAdProps) => {
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Countdown timer for close button
  useEffect(() => {
    if (!isVisible) {
      setCanClose(false);
      setCountdown(3);
      return;
    }

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
  }, [isVisible]);

  // Prevent body scroll when visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Success Header */}
        <div className="p-6 text-center bg-gradient-to-b from-green-500/10 to-transparent">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4 animate-bounce">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Task Completed! 🎉
          </h3>
          <p className="text-sm text-muted-foreground">
            You've successfully used the {toolName}
          </p>
        </div>

        {/* Ad Content */}
        <div className="px-6 py-4">
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Sponsored
            </span>
          </div>
          <AdBanner 
            format="rectangle" 
            style={{ minHeight: '200px' }}
          />
        </div>

        {/* Actions */}
        <div className="p-4 bg-muted/30 flex flex-col gap-3">
          <Link
            to="/"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-center hover:bg-primary/90 transition-colors"
          >
            Explore More Tools
          </Link>
          <button
            onClick={canClose ? onClose : undefined}
            disabled={!canClose}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              canClose 
                ? 'bg-muted hover:bg-muted/80 text-foreground cursor-pointer' 
                : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {canClose ? (
              <>
                <X className="h-4 w-4" />
                Close
              </>
            ) : (
              `Close in ${countdown}s`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook to trigger completion ad
export const useToolCompletionAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [toolName, setToolName] = useState('');

  const triggerCompletionAd = (name: string) => {
    // Only show occasionally (1 in 3 completions)
    const shouldShow = Math.random() < 0.33;
    if (shouldShow) {
      setToolName(name);
      setShowAd(true);
    }
  };

  const closeAd = () => {
    setShowAd(false);
  };

  return {
    showAd,
    toolName,
    triggerCompletionAd,
    closeAd,
    ToolCompletionAdComponent: () => (
      <ToolCompletionAd 
        isVisible={showAd} 
        onClose={closeAd} 
        toolName={toolName}
      />
    )
  };
};
