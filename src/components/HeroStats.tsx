import { useEffect, useState } from "react";
import { Users, Star, Download, Zap } from "lucide-react";

interface StatProps {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedStat({ icon: Icon, value, suffix, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const isDecimal = value < 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, isDecimal]);

  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 group">
      <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow duration-300">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <div className="text-2xl font-bold font-display text-foreground">
          {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function HeroStats() {
  const stats = [
    { icon: Users, value: 50000, suffix: "+", label: "Active Users", delay: 0 },
    { icon: Star, value: 4.9, suffix: "★", label: "User Rating", delay: 200 },
    { icon: Download, value: 2, suffix: "M+", label: "Tools Used", delay: 400 },
    { icon: Zap, value: 50, suffix: "+", label: "Free Tools", delay: 600 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <AnimatedStat key={stat.label} {...stat} />
      ))}
    </div>
  );
}
