import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AdBanner } from "@/components/AdBanner";
import { Helmet } from "react-helmet";

const blogPosts = [
  {
    id: "sip-calculator-guide",
    title: "Complete Guide to SIP Calculator: Plan Your Investments Smartly",
    excerpt: "Learn how to use the SIP calculator effectively for long-term wealth creation. Understand SIP returns, taxation, and investment strategies.",
    date: "2025-11-28",
    readTime: "8 min read",
    category: "Calculators",
  },
  {
    id: "income-tax-india",
    title: "Income Tax Calculator 2025: Old vs New Regime Comparison",
    excerpt: "Comprehensive guide to Indian income tax calculation for FY 2024-25. Compare old and new tax regimes to make informed decisions.",
    date: "2025-11-25",
    readTime: "10 min read",
    category: "Calculators",
  },
  {
    id: "image-compression-guide",
    title: "How to Compress Images Without Losing Quality: Complete Tutorial",
    excerpt: "Master image compression techniques. Learn about formats, quality settings, and best practices for web and mobile optimization.",
    date: "2025-11-20",
    readTime: "6 min read",
    category: "Image Tools",
  },
  {
    id: "video-conversion-basics",
    title: "Video Format Conversion Made Easy: Beginner's Guide",
    excerpt: "Everything you need to know about video formats, codecs, and conversion. Convert videos for any device or platform.",
    date: "2025-11-15",
    readTime: "7 min read",
    category: "Media Tools",
  },
  {
    id: "productivity-tools",
    title: "Boost Productivity with Free Online Tools: Notes & Reminders",
    excerpt: "Discover how to organize your life with digital notes and smart reminders. Tips for effective task management and time organization.",
    date: "2025-11-10",
    readTime: "5 min read",
    category: "Productivity",
  },
  {
    id: "unit-conversion-guide",
    title: "Unit Conversion Mastery: From Length to Data & Everything Between",
    excerpt: "Complete guide to unit conversions. Understand metric, imperial systems, and specialized units for cooking, construction, and tech.",
    date: "2025-11-05",
    readTime: "9 min read",
    category: "Converters",
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Utility Master Blog - Tutorials, Guides & Tips for Online Tools</title>
        <meta name="description" content="Learn how to use online calculators, converters, and productivity tools effectively. Expert tutorials, guides, and tips to maximize your efficiency." />
        <meta name="keywords" content="utility tools blog, calculator tutorials, converter guides, online tools tips, productivity guides, image tools tutorials" />
        <link rel="canonical" href="https://utilitymaster.lovable.app/blog" />
        
        <meta property="og:title" content="Utility Master Blog - Tutorials & Guides" />
        <meta property="og:description" content="Expert tutorials and guides for using online tools effectively. Learn tips and tricks for calculators, converters, and productivity tools." />
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
              "url": `https://utilitymaster.lovable.app/blog/${post.id}`,
              "author": {
                "@type": "Organization",
                "name": "Utility Master"
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <AdBanner />
          
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Utility Master Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert tutorials, guides, and tips to get the most out of our free online tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-border hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-block text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    Read full article →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border mt-12">
            <CardHeader>
              <CardTitle>Coming Soon: More Tutorials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We're constantly creating new tutorials and guides to help you master our tools. Here's what's coming:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Advanced BMI calculation and health tracking strategies</li>
                <li>WhatsApp automation tips and best practices</li>
                <li>Screen recording techniques for professional videos</li>
                <li>PDF conversion workflows for business documents</li>
                <li>Battery optimization tips for mobile devices</li>
                <li>Screenshot organization systems for professionals</li>
              </ul>
              <p>
                Have a topic you'd like us to cover? Visit our <Link to="/about" className="text-primary hover:underline">About Us</Link> page to share your suggestions!
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default Blog;