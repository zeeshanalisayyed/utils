import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Star, Zap, Target, Award, Crown, Flame, Medal, TrendingUp, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  color: string;
}

const badges: Badge[] = [
  { id: "starter", name: "Starter", description: "Use your first tool", icon: <Star className="h-5 w-5" />, requirement: 1, color: "from-blue-500 to-cyan-500" },
  { id: "explorer", name: "Explorer", description: "Try 5 different tools", icon: <Target className="h-5 w-5" />, requirement: 5, color: "from-green-500 to-emerald-500" },
  { id: "enthusiast", name: "Enthusiast", description: "Use 10 different tools", icon: <Zap className="h-5 w-5" />, requirement: 10, color: "from-yellow-500 to-orange-500" },
  { id: "power_user", name: "Power User", description: "Master 20 tools", icon: <Flame className="h-5 w-5" />, requirement: 20, color: "from-orange-500 to-red-500" },
  { id: "expert", name: "Expert", description: "Conquer 30 tools", icon: <Award className="h-5 w-5" />, requirement: 30, color: "from-purple-500 to-pink-500" },
  { id: "champion", name: "Champion", description: "Master 40 tools", icon: <Medal className="h-5 w-5" />, requirement: 40, color: "from-pink-500 to-rose-500" },
  { id: "legend", name: "Legend", description: "Use all 50+ tools", icon: <Crown className="h-5 w-5" />, requirement: 50, color: "from-amber-500 to-yellow-500" },
];

export const UsageStatsDashboard = () => {
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [totalUses, setTotalUses] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("recentTools");
    const usageCount = localStorage.getItem("totalToolUses");
    
    if (stored) {
      try {
        const tools = JSON.parse(stored);
        setToolsUsed(tools);
      } catch {
        setToolsUsed([]);
      }
    }
    
    if (usageCount) {
      setTotalUses(parseInt(usageCount, 10) || 0);
    }
  }, []);

  const uniqueToolsCount = toolsUsed.length;
  const earnedBadges = badges.filter(badge => uniqueToolsCount >= badge.requirement);
  const nextBadge = badges.find(badge => uniqueToolsCount < badge.requirement);
  const progressToNext = nextBadge 
    ? Math.round((uniqueToolsCount / nextBadge.requirement) * 100)
    : 100;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <p className="text-sm text-muted-foreground">Track your tool mastery</p>
          </div>
        </div>
        <Link 
          to="/tools" 
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Explore More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Stats Cards */}
        <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tools Used</p>
                <p className="text-3xl font-bold text-primary">{uniqueToolsCount}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Uses</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalUses}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{earnedBadges.length}</p>
              </div>
              <div className="p-3 rounded-full bg-amber-500/10">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Badge */}
      {nextBadge && (
        <Card className="border-border mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Next Badge: {nextBadge.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={progressToNext} className="flex-1" />
              <span className="text-sm font-medium text-muted-foreground">
                {uniqueToolsCount}/{nextBadge.requirement}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{nextBadge.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Badges Grid */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Achievement Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {badges.map((badge) => {
              const isEarned = uniqueToolsCount >= badge.requirement;
              return (
                <div
                  key={badge.id}
                  className={`relative flex flex-col items-center p-4 rounded-xl transition-all ${
                    isEarned 
                      ? `bg-gradient-to-br ${badge.color} text-white shadow-lg scale-105` 
                      : "bg-muted/30 text-muted-foreground opacity-50"
                  }`}
                >
                  <div className={`p-2 rounded-full ${isEarned ? "bg-white/20" : "bg-muted"}`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs font-semibold mt-2 text-center">{badge.name}</span>
                  {isEarned && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
