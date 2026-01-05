import { Shield, Lock, Globe, Award, CheckCircle2 } from "lucide-react";

const badges = [
  { icon: Shield, label: "100% Secure", color: "text-green-500" },
  { icon: Lock, label: "Privacy First", color: "text-blue-500" },
  { icon: Globe, label: "Works Offline", color: "text-purple-500" },
  { icon: Award, label: "Ad-Free Tools", color: "text-yellow-500" },
  { icon: CheckCircle2, label: "No Signup", color: "text-teal-500" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge, i) => (
        <div
          key={badge.label}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur border border-border/50 text-sm font-medium animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <badge.icon className={`h-4 w-4 ${badge.color}`} />
          <span className="text-foreground">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
