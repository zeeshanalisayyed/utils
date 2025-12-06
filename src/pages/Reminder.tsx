import { useState, useEffect } from "react";
import { Calendar, Clock, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

interface ReminderItem {
  id: string;
  title: string;
  date: string;
  time: string;
}

const Reminder = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("reminders");
    if (saved) {
      const parsed = JSON.parse(saved);
      setReminders(parsed);
    }
  }, []);

  const addReminder = () => {
    if (!title || !date || !time) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    const newReminder: ReminderItem = {
      id: Date.now().toString(),
      title,
      date,
      time,
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
    
    setTitle("");
    setDate("");
    setTime("");
    toast({ title: "Reminder added successfully!" });
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
    toast({ title: "Reminder deleted" });
  };

  const faqItems = [
    { question: "Are reminders saved locally?", answer: "Yes, all reminders are saved in your browser's local storage and persist across sessions." },
    { question: "Will I get notifications?", answer: "Currently, the app stores reminders for your reference. Browser notification support is coming soon." },
    { question: "Can I edit a reminder?", answer: "To edit a reminder, delete the existing one and create a new one with the updated information." },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Reminder App - Utility Master",
    "applicationCategory": "UtilitiesApplication",
    "description": "Never miss important tasks with our free reminder app. Set reminders with date and time.",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <PageLayout
      title="Reminder App"
      description="Never miss important tasks"
    >
      <SEOHead
        title="Reminder App - Task Reminders | Utility Master"
        description="Never miss important tasks with our free reminder app. Set reminders with custom date and time - no sign up required."
        keywords="reminder app, task reminders, schedule reminders, free reminder, to-do list"
        canonicalUrl="https://utilitymaster.app/reminder"
        structuredData={structuredData}
      />

      <AdBanner />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Reminder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Reminder Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter reminder title"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={addReminder} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Reminders</h2>
          {reminders.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center text-muted-foreground">
                No reminders yet. Add your first reminder above!
              </CardContent>
            </Card>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {reminder.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reminder.time}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <FAQ items={faqItems} />
      </div>
    </PageLayout>
  );
};

export default Reminder;