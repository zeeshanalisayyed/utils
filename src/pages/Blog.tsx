import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const blogPosts = [
  {
    id: "sip-calculator-guide",
    title: "Complete Guide to SIP Calculator: Plan Your Investments Smartly",
    excerpt: "Learn how to use the SIP calculator effectively for long-term wealth creation. Understand SIP returns, taxation, and investment strategies.",
    date: "2025-11-28",
    readTime: "8 min",
    category: "Calculators",
    link: "/sip-calculator"
  },
  {
    id: "income-tax-india",
    title: "Income Tax Calculator 2025: Old vs New Regime Comparison",
    excerpt: "Comprehensive guide to Indian income tax calculation for FY 2024-25. Compare old and new tax regimes to make informed decisions.",
    date: "2025-11-25",
    readTime: "10 min",
    category: "Calculators",
    link: "/income-tax"
  },
  {
    id: "image-compression-guide",
    title: "How to Compress Images Without Losing Quality",
    excerpt: "Master image compression techniques. Learn about formats, quality settings, and best practices for web and mobile.",
    date: "2025-11-20",
    readTime: "6 min",
    category: "Image Tools",
    link: "/image-tools"
  },
  {
    id: "video-conversion-basics",
    title: "Video Format Conversion Made Easy: Beginner's Guide",
    excerpt: "Everything you need to know about video formats, codecs, and conversion for any device or platform.",
    date: "2025-11-15",
    readTime: "7 min",
    category: "Media Tools",
    link: "/video-converter"
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Utility Master Blog - Tutorials, Guides & Tips for Online Tools</title>
        <meta name="description" content="Learn how to use online calculators, converters, and productivity tools effectively. Expert tutorials, guides, and tips to maximize your efficiency." />
        <meta name="keywords" content="utility tools blog, calculator tutorials, converter guides, online tools tips, productivity guides" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/blog" />
        
        <meta property="og:title" content="Utility Master Blog - Tutorials & Guides" />
        <meta property="og:description" content="Expert tutorials and guides for using online tools effectively." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://utilitymaster.lovable.app/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Utility Master Blog",
            "description": "Tutorials and guides for online tools",
            "url": "https://utilitymaster.lovable.app/blog",
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "author": { "@type": "Organization", "name": "Utility Master" }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <div className="relative overflow-hidden border-b border-border">
            <div className="absolute inset-0 gradient-mesh" />
            <div className="container mx-auto px-4 py-16 relative text-center">
              <BookOpen className="h-14 w-14 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                <span className="gradient-text">Blog</span> & Tutorials
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert guides to help you get the most out of our free tools
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <AdBanner />

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {blogPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-medium animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-display leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link 
                      to={post.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                    >
                      Try the Tool
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border bg-muted/30 p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold font-display text-foreground mb-2">More Content Coming Soon</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're constantly adding new tutorials and guides. Check back regularly for updates!
              </p>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
