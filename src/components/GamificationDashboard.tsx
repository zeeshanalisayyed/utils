import { useState, useEffect } from "react";
import { 
  Trophy, Star, Zap, Target, Award, Crown, Flame, Medal, 
  TrendingUp, Sparkles, CheckCircle2, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgress, getXPForLevel, getXPForNextLevel, UserProgress } from "@/hooks/useToolUsage";

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  requirement: number;
  color: string;
}

const badges: Badge[] = [
  { id: "starter", name: "Starter", icon: <Star className="h-3.5 w-3.5" />, requirement: 1, color: "from-blue-500 to-cyan-500" },
  { id: "explorer", name: "Explorer", icon: <Target className="h-3.5 w-3.5" />, requirement: 5, color: "from-green-500 to-emerald-500" },
  { id: "enthusiast", name: "Enthusiast", icon: <Zap className="h-3.5 w-3.5" />, requirement: 10, color: "from-yellow-500 to-orange-500" },
  { id: "power_user", name: "Power User", icon: <Flame className="h-3.5 w-3.5" />, requirement: 20, color: "from-orange-500 to-red-500" },
  { id: "expert", name: "Expert", icon: <Award className="h-3.5 w-3.5" />, requirement: 30, color: "from-purple-500 to-pink-500" },
  { id: "champion", name: "Champion", icon: <Medal className="h-3.5 w-3.5" />, requirement: 40, color: "from-pink-500 to-rose-500" },
  { id: "legend", name: "Legend", icon: <Crown className="h-3.5 w-3.5" />, requirement: 50, color: "from-amber-500 to-yellow-500" },
];

const levelTitles: Record<number, string> = {
  1: "Beginner", 2: "Apprentice", 3: "Adept", 4: "Skilled", 5: "Expert",
  6: "Master", 7: "Grandmaster", 8: "Legend", 9: "Mythic", 10: "Ultimate",
};

export const GamificationDashboard = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    const interval = setInterval(() => setProgress(getProgress()), 2000);
    return () => clearInterval(interval);
  }, []);

  if (!progress) return null;

  const { toolsUsed, totalUses, xp, level, streak, dailyChallenges, completedChallenges } = progress;
  const uniqueToolsCount = toolsUsed.length;
  const earnedBadges = badges.filter(badge => uniqueToolsCount >= badge.requirement);
  const levelTitle = levelTitles[Math.min(level, 10)] || "Beginner";
  
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForNextLevel(level);
  const xpProgress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  const completedCount = dailyChallenges.filter(c => completedChallenges.includes(c.id)).length;

  return (
    <Card className="border-border overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left"
      >
        <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent flex items-center gap-4">
          {/* Level Circle */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md">
              {level}
            </div>
            {streak > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shadow">
                <Flame className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          {/* Progress Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{levelTitle}</span>
                <span className="text-xs text-muted-foreground">• {xp} XP</span>
              </div>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </div>
            <Progress value={xpProgress} className="h-2" />
            <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
              <span>{uniqueToolsCount} tools used</span>
              <span>{nextLevelXP - xp} XP to Level {level + 1}</span>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4 border-t border-border">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 py-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <Target className="h-4 w-4 text-primary mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">{uniqueToolsCount}</p>
              <p className="text-[10px] text-muted-foreground">Tools</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <TrendingUp className="h-4 w-4 text-green-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">{totalUses}</p>
              <p className="text-[10px] text-muted-foreground">Uses</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <Flame className="h-4 w-4 text-orange-500 mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">{streak}</p>
              <p className="text-[10px] text-muted-foreground">Streak</p>
            </div>
          </div>

          {/* Daily Challenges */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Daily Challenges
              </span>
              <span className="text-xs text-muted-foreground">{completedCount}/{dailyChallenges.length}</span>
            </div>
            <div className="space-y-2">
              {dailyChallenges.slice(0, 3).map((challenge) => {
                const isCompleted = completedChallenges.includes(challenge.id);
                return (
                  <div 
                    key={challenge.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${
                      isCompleted ? "bg-primary/10" : "bg-muted/30"
                    }`}
                  >
                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${isCompleted ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`flex-1 ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                      {challenge.title}
                    </span>
                    <span className="text-xs text-primary font-medium">+{challenge.xpReward} XP</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                Badges
              </span>
              <span className="text-xs text-muted-foreground">{earnedBadges.length}/{badges.length}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {badges.map((badge) => {
                const isEarned = uniqueToolsCount >= badge.requirement;
                return (
                  <div
                    key={badge.id}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                      isEarned 
                        ? `bg-gradient-to-r ${badge.color} text-white` 
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                    title={`${badge.name}: Use ${badge.requirement} tools`}
                  >
                    {badge.icon}
                    {badge.name}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
