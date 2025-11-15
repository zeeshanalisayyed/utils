import { Calculator, FileText, MessageCircle, DollarSign, Ruler, Thermometer, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const utilities = [
  {
    title: "SIP Calculator",
    description: "Calculate returns on your SIP investments",
    icon: DollarSign,
    path: "/sip-calculator",
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "Income Tax",
    description: "Calculate your income tax in India",
    icon: Calculator,
    path: "/income-tax",
    gradient: "from-accent to-primary-glow",
  },
  {
    title: "Converters",
    description: "Convert units, currency, and more",
    icon: Ruler,
    path: "/converters",
    gradient: "from-primary-glow to-accent",
  },
  {
    title: "BMI Calculator",
    description: "Check your Body Mass Index",
    icon: Activity,
    path: "/bmi-calculator",
    gradient: "from-accent to-primary",
  },
  {
    title: "Notes",
    description: "Quick notes and reminders",
    icon: FileText,
    path: "/notes",
    gradient: "from-primary to-accent",
  },
  {
    title: "WhatsApp Direct",
    description: "Message without saving contact",
    icon: MessageCircle,
    path: "/whatsapp-direct",
    gradient: "from-primary-glow to-primary",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Utility Master
              </h1>
              <p className="text-xs text-muted-foreground">All-in-one utility toolkit</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            Powerful Utilities at Your Fingertips
          </h2>
          <p className="text-muted-foreground">
            Everything you need for calculations, conversions, and productivity - all in one place
          </p>
        </div>

        {/* Utility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {utilities.map((utility) => (
            <Link key={utility.path} to={utility.path}>
              <Card className="group relative overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_24px_hsl(var(--primary)/0.15)] cursor-pointer bg-card">
                <div className="p-6">
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${utility.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <utility.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {utility.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{utility.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-muted/50 to-secondary/30 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">
              More Utilities Coming Soon
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Reminder App</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Video Downloader</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-glow" />
                <span>App Icon Creator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Screenshot Organizer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Image Tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary-glow" />
                <span>PDF Converter</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Utility Master - Your all-in-one productivity toolkit</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
