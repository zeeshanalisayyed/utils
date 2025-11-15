import { useState, useEffect } from "react";
import { Volume2, VolumeX, Bell, BellOff, Music, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SoundMaster = () => {
  const { toast } = useToast();
  const [masterVolume, setMasterVolume] = useState([50]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [mediaEnabled, setMediaEnabled] = useState(true);
  const [systemSoundsEnabled, setSystemSoundsEnabled] = useState(true);
  const [alarmEnabled, setAlarmEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sound-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setMasterVolume([settings.masterVolume]);
      setNotificationsEnabled(settings.notificationsEnabled);
      setMediaEnabled(settings.mediaEnabled);
      setSystemSoundsEnabled(settings.systemSoundsEnabled);
      setAlarmEnabled(settings.alarmEnabled);
    }
  }, []);

  const saveSettings = (settings: any) => {
    localStorage.setItem("sound-settings", JSON.stringify(settings));
    toast({ title: "Settings saved" });
  };

  const handleVolumeChange = (value: number[]) => {
    setMasterVolume(value);
    saveSettings({
      masterVolume: value[0],
      notificationsEnabled,
      mediaEnabled,
      systemSoundsEnabled,
      alarmEnabled,
    });
  };

  const toggleSetting = (key: string, value: boolean) => {
    const settings = {
      masterVolume: masterVolume[0],
      notificationsEnabled,
      mediaEnabled,
      systemSoundsEnabled,
      alarmEnabled,
      [key]: value,
    };
    
    if (key === "notificationsEnabled") setNotificationsEnabled(value);
    if (key === "mediaEnabled") setMediaEnabled(value);
    if (key === "systemSoundsEnabled") setSystemSoundsEnabled(value);
    if (key === "alarmEnabled") setAlarmEnabled(value);
    
    saveSettings(settings);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sound Master
          </h1>
          <p className="text-muted-foreground">Control all your app sounds and notifications</p>
        </div>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Master Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {masterVolume[0] === 0 ? (
                  <VolumeX className="h-6 w-6 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-6 w-6 text-primary" />
                )}
                <Slider
                  value={masterVolume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12 text-right">{masterVolume[0]}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sound Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? (
                    <Bell className="h-5 w-5 text-primary" />
                  ) : (
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <Label htmlFor="notifications" className="text-base font-medium">
                      Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">App notifications and alerts</p>
                  </div>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={(checked) => toggleSetting("notificationsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="media" className="text-base font-medium">
                      Media
                    </Label>
                    <p className="text-sm text-muted-foreground">Music and video playback</p>
                  </div>
                </div>
                <Switch
                  id="media"
                  checked={mediaEnabled}
                  onCheckedChange={(checked) => toggleSetting("mediaEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="system" className="text-base font-medium">
                      System Sounds
                    </Label>
                    <p className="text-sm text-muted-foreground">Clicks and touch feedback</p>
                  </div>
                </div>
                <Switch
                  id="system"
                  checked={systemSoundsEnabled}
                  onCheckedChange={(checked) => toggleSetting("systemSoundsEnabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <Label htmlFor="alarm" className="text-base font-medium">
                      Alarms
                    </Label>
                    <p className="text-sm text-muted-foreground">Alarm and reminder sounds</p>
                  </div>
                </div>
                <Switch
                  id="alarm"
                  checked={alarmEnabled}
                  onCheckedChange={(checked) => toggleSetting("alarmEnabled", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SoundMaster;
