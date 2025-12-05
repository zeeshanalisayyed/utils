import { useState, useEffect } from "react";
import { Volume2, VolumeX, Bell, BellOff, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";

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

  const saveSettings = (settings: Record<string, unknown>) => {
    localStorage.setItem("sound-settings", JSON.stringify(settings));
    toast({ title: "Settings saved" });
  };

  const handleVolumeChange = (value: number[]) => {
    setMasterVolume(value);
    saveSettings({ masterVolume: value[0], notificationsEnabled, mediaEnabled, systemSoundsEnabled, alarmEnabled });
  };

  const toggleSetting = (key: string, value: boolean) => {
    const settings = { masterVolume: masterVolume[0], notificationsEnabled, mediaEnabled, systemSoundsEnabled, alarmEnabled, [key]: value };
    if (key === "notificationsEnabled") setNotificationsEnabled(value);
    if (key === "mediaEnabled") setMediaEnabled(value);
    if (key === "systemSoundsEnabled") setSystemSoundsEnabled(value);
    if (key === "alarmEnabled") setAlarmEnabled(value);
    saveSettings(settings);
  };

  return (
    <PageLayout title="Sound Master" description="Control all your app sounds and notifications">
      <AdBanner />
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="border-border">
          <CardHeader><CardTitle className="flex items-center gap-2"><Volume2 className="h-5 w-5" />Master Volume</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {masterVolume[0] === 0 ? <VolumeX className="h-6 w-6 text-muted-foreground" /> : <Volume2 className="h-6 w-6 text-primary" />}
              <Slider value={masterVolume} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />
              <span className="text-sm font-medium w-12 text-right">{masterVolume[0]}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader><CardTitle>Sound Categories</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {[
              { key: "notificationsEnabled", label: "Notifications", desc: "App notifications and alerts", enabled: notificationsEnabled, Icon: notificationsEnabled ? Bell : BellOff },
              { key: "mediaEnabled", label: "Media", desc: "Music and video playback", enabled: mediaEnabled, Icon: Music },
              { key: "systemSoundsEnabled", label: "System Sounds", desc: "Clicks and touch feedback", enabled: systemSoundsEnabled, Icon: Volume2 },
              { key: "alarmEnabled", label: "Alarms", desc: "Alarm and reminder sounds", enabled: alarmEnabled, Icon: Bell },
            ].map(({ key, label, desc, enabled, Icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
                  <div>
                    <Label htmlFor={key} className="text-base font-medium">{label}</Label>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <Switch id={key} checked={enabled} onCheckedChange={(checked) => toggleSetting(key, checked)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SoundMaster;