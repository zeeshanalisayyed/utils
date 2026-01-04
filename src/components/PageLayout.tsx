import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { RelatedTools, getRelatedTools } from "./RelatedTools";
import { useToolTracking } from "./EngagementBanner";
import { AdBanner, InArticleAd, FooterAd } from "./AdBanner";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export function PageLayout({ children, title, description, showBackButton = true }: PageLayoutProps) {
  const location = useLocation();
  const relatedTools = getRelatedTools(location.pathname);
  
  // Track tool usage for engagement
  useToolTracking(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Top Banner Ad */}
      <div className="container mx-auto px-4 pt-4">
        <AdBanner format="horizontal" className="mb-0" />
      </div>
      
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            {showBackButton && (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Tools
              </Link>
            )}
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>
        </div>

        {/* Page Content with Sidebar */}
        <div className="container mx-auto px-4 py-8">
          {/* Full-width top ad before content */}
          <AdBanner format="horizontal" className="mb-8" />
          
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {children}
              
              {/* Mid-content Ad */}
              <InArticleAd className="my-8" />
              
              {/* Related Tools Section */}
              {relatedTools.length > 0 && (
                <div className="mt-8">
                  <RelatedTools tools={relatedTools} />
                </div>
              )}
              
              {/* Ad before CTA */}
              <AdBanner format="auto" className="my-6" />
              
              {/* Explore More CTA */}
              <div className="mt-8 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium transition-all hover:scale-105"
                >
                  <Home className="h-4 w-4" />
                  Explore 50+ More Tools
                </Link>
              </div>
            </div>
            
            {/* Sticky Sidebar Ad - Hidden on mobile/tablet */}
            <aside className="hidden xl:block w-[300px] flex-shrink-0">
              <div className="sticky top-20 space-y-6">
                <AdBanner 
                  format="rectangle" 
                  style={{ minHeight: '250px' }}
                />
                <AdBanner 
                  format="rectangle" 
                  style={{ minHeight: '250px' }}
                />
                <AdBanner 
                  format="vertical" 
                  style={{ minHeight: '600px' }}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer Ad */}
      <FooterAd />
      
      <Footer />
    </div>
  );
}
