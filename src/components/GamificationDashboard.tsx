import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Trophy, Star, Zap, Target, Award, Crown, Flame, Medal, 
  TrendingUp, ChevronRight, Sparkles, Calendar, Gift,
  CheckCircle2, Circle, Lock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgress, getLevelFromXP, getXPForLevel, getXPForNextLevel, UserProgress, DailyChallenge } from "@/hooks/useToolUsage";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  color: string;
}

const badges: Badge[] = [
  { id: "starter", name: "Starter", description: "Use your first tool", icon: <Star className="h-4 w-4" />, requirement: 1, color: "from-blue-500 to-cyan-500" },
  { id: "explorer", name: "Explorer", description: "Try 5 different tools", icon: <Target className="h-4 w-4" />, requirement: 5, color: "from-green-500 to-emerald-500" },
  { id: "enthusiast", name: "Enthusiast", description: "Use 10 different tools", icon: <Zap className="h-4 w-4" />, requirement: 10, color: "from-yellow-500 to-orange-500" },
  { id: "power_user", name: "Power User", description: "Master 20 tools", icon: <Flame className="h-4 w-4" />, requirement: 20, color: "from-orange-500 to-red-500" },
  { id: "expert", name: "Expert", description: "Conquer 30 tools", icon: <Award className="h-4 w-4" />, requirement: 30, color: "from-purple-500 to-pink-500" },
  { id: "champion", name: "Champion", description: "Master 40 tools", icon: <Medal className="h-4 w-4" />, requirement: 40, color: "from-pink-500 to-rose-500" },
  { id: "legend", name: "Legend", description: "Use all 50+ tools", icon: <Crown className="h-4 w-4" />, requirement: 50, color: "from-amber-500 to-yellow-500" },
];

const levelTitles: Record<number, string> = {
  1: "Beginner",
  2: "Apprentice",
  3: "Adept",
  4: "Skilled",
  5: "Expert",
  6: "Master",
  7: "Grandmaster",
  8: "Legend",
  9: "Mythic",
  10: "Ultimate",
};

const getLevelTitle = (level: number): string => {
  if (level >= 10) return levelTitles[10];
  return levelTitles[level] || "Beginner";
};

export const GamificationDashboard = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    
    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      setProgress(getProgress());
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also poll every 2 seconds for same-tab updates
    const interval = setInterval(() => {
      setProgress(getProgress());
    }, 2000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!progress) return null;

  const { toolsUsed, totalUses, xp, level, streak, dailyChallenges, completedChallenges } = progress;
  const uniqueToolsCount = toolsUsed.length;
  const earnedBadges = badges.filter(badge => uniqueToolsCount >= badge.requirement);
  const nextBadge = badges.find(badge => uniqueToolsCount < badge.requirement);
  
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForNextLevel(level);
  const xpProgress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  const levelTitle = getLevelTitle(level);

  const completedChallengesCount = dailyChallenges.filter(c => 
    completedChallenges.includes(c.id)
  ).length;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Your Progress</h2>
            <p className="text-xs text-muted-foreground">Level {level} • {levelTitle}</p>
          </div>
        </div>
        <Link 
          to="#tools" 
          className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
        >
          Earn More XP <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Level & XP Progress */}
      <Card className="border-border mb-4 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                  {level}
                </div>
                {streak > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
                    <Flame className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-lg">{levelTitle}</p>
                <p className="text-sm text-muted-foreground">{xp.toLocaleString()} XP Total</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Next Level</p>
              <p className="font-semibold text-primary">{(nextLevelXP - xp).toLocaleString()} XP</p>
            </div>
          </div>
          <div className="space-y-1">
            <Progress value={xpProgress} className="h-2.5" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <Target className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-primary">{uniqueToolsCount}</p>
            <p className="text-xs text-muted-foreground">Tools Used</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalUses}</p>
            <p className="text-xs text-muted-foreground">Total Uses</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-3 text-center">
            <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Challenges */}
      <Card className="border-border mb-4">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Daily Challenges
            </div>
            <span className="text-xs font-normal text-muted-foreground">
              {completedChallengesCount}/{dailyChallenges.length} Completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2">
            {dailyChallenges.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              const progressPercent = (challenge.current / challenge.target) * 100;
              
              return (
                <div 
                  key={challenge.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isCompleted 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-muted/30 border-border hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`font-medium text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                          {challenge.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-primary font-semibold whitespace-nowrap">
                          <Sparkles className="h-3 w-3" />
                          +{challenge.xpReward} XP
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>
                      {!isCompleted && (
                        <div className="flex items-center gap-2">
                          <Progress value={progressPercent} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {challenge.current}/{challenge.target}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Badge Progress */}
      {nextBadge && (
        <Card className="border-border mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${nextBadge.color} text-white shadow-sm`}>
                {nextBadge.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Next Badge: {nextBadge.name}</p>
                <p className="text-xs text-muted-foreground">{nextBadge.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{uniqueToolsCount}/{nextBadge.requirement}</p>
              </div>
            </div>
            <Progress 
              value={(uniqueToolsCount / nextBadge.requirement) * 100} 
              className="h-2 mt-3" 
            />
          </CardContent>
        </Card>
      )}

      {/* Badges Grid */}
      <Card className="border-border">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            Achievement Badges
            <span className="text-xs font-normal text-muted-foreground ml-auto">
              {earnedBadges.length}/{badges.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {badges.map((badge) => {
              const isEarned = uniqueToolsCount >= badge.requirement;
              return (
                <div
                  key={badge.id}
                  className={`relative flex flex-col items-center p-2.5 rounded-xl transition-all ${
                    isEarned 
                      ? `bg-gradient-to-br ${badge.color} text-white shadow-md` 
                      : "bg-muted/40 text-muted-foreground"
                  }`}
                  title={badge.description}
                >
                  <div className={`p-1.5 rounded-full ${isEarned ? "bg-white/20" : "bg-muted"}`}>
                    {isEarned ? badge.icon : <Lock className="h-4 w-4" />}
                  </div>
                  <span className="text-[10px] font-semibold mt-1.5 text-center leading-tight">{badge.name}</span>
                  {isEarned && (
                    <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Star className="h-2.5 w-2.5 text-yellow-500 fill-yellow-500" />
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
