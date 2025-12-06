import { useState, useEffect } from "react";
import { Battery, BatteryCharging, Zap, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

const BatterySaver = () => {
  const { toast } = useToast();
  const [batterySaverMode, setBatterySaverMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reducedAnimations, setReducedAnimations] = useState(false);
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(75);

  useEffect(() => {
    const saved = localStorage.getItem("battery-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setBatterySaverMode(settings.batterySaverMode);
      setDarkMode(settings.darkMode);
      setReducedAnimations(settings.reducedAnimations);
      setBackgroundSync(settings.backgroundSync);
    }

    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(0, prev - 0.1));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const saveSettings = (settings: any) => {
    localStorage.setItem("battery-settings", JSON.stringify(settings));
    toast({ title: "Battery settings saved" });
  };

  const toggleBatterySaver = (enabled: boolean) => {
    setBatterySaverMode(enabled);
    if (enabled) {
      setDarkMode(true);
      setReducedAnimations(true);
      setBackgroundSync(false);
    }
    saveSettings({
      batterySaverMode: enabled,
      darkMode: enabled || darkMode,
      reducedAnimations: enabled || reducedAnimations,
      backgroundSync: enabled ? false : backgroundSync,
    });
  };

  const toggleSetting = (key: string, value: boolean) => {
    const settings = {
      batterySaverMode,
      darkMode,
      reducedAnimations,
      backgroundSync,
      [key]: value,
    };
    
    if (key === "darkMode") setDarkMode(value);
    if (key === "reducedAnimations") setReducedAnimations(value);
    if (key === "backgroundSync") setBackgroundSync(value);
    
    saveSettings(settings);
  };

  const faqItems = [
    { question: "How does Battery Saver work?", answer: "Battery Saver optimizes your device settings to reduce power consumption, including enabling dark mode, reducing animations, and disabling background sync." },
    { question: "Will Battery Saver affect my app's functionality?", answer: "No, Battery Saver only affects visual and background settings. All core functionality remains available." },
    { question: "How much battery can I save?", answer: "Depending on your usage, you can save up to 20-30% battery life by enabling all optimization features." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Battery Saver - Utility Master",
    "applicationCategory": "UtilitiesApplication",
    "description": "Optimize your device for longer battery life with dark mode, reduced animations, and background sync control.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="Battery Saver"
      description="Optimize your device for longer battery life"
    >
      <SEOHead
        title="Battery Saver - Extend Battery Life | Utility Master"
        description="Optimize your device for longer battery life with dark mode, reduced animations, and background sync control. Free battery optimization tool."
        keywords="battery saver, extend battery life, power optimization, dark mode, reduce animations"
        canonicalUrl="https://utilitymaster.app/battery-saver"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BatteryCharging className="h-5 w-5" />
              Battery Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Battery className={`h-8 w-8 ${batteryLevel > 20 ? "text-primary" : "text-destructive"}`} />
                <div>
                  <p className="text-2xl font-bold">{Math.round(batteryLevel)}%</p>
                  <p className="text-sm text-muted-foreground">Current level</p>
                </div>
              </div>
            </div>
            <Progress value={batteryLevel} className="h-3" />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Battery Saver Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="battery-saver" className="text-base font-medium">
                  Enable Battery Saver
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically optimizes settings to extend battery life
                </p>
              </div>
              <Switch
                id="battery-saver"
                checked={batterySaverMode}
                onCheckedChange={toggleBatterySaver}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Power Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Reduces screen power usage</p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={(checked) => toggleSetting("darkMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="animations" className="text-base font-medium">
                    Reduced Animations
                  </Label>
                  <p className="text-sm text-muted-foreground">Minimize visual effects</p>
                </div>
              </div>
              <Switch
                id="animations"
                checked={reducedAnimations}
                onCheckedChange={(checked) => toggleSetting("reducedAnimations", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="background" className="text-base font-medium">
                    Background Sync
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow apps to sync in background</p>
                </div>
              </div>
              <Switch
                id="background"
                checked={backgroundSync}
                onCheckedChange={(checked) => toggleSetting("backgroundSync", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default BatterySaver;