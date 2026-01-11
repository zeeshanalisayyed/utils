import { useEffect, useCallback } from "react";

const XP_PER_USE = 10;
const XP_PER_NEW_TOOL = 50;
const XP_DAILY_BONUS = 25;

export interface UserProgress {
  toolsUsed: string[];
  totalUses: number;
  xp: number;
  level: number;
  lastActiveDate: string;
  streak: number;
  dailyChallenges: DailyChallenge[];
  completedChallenges: string[];
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  type: "use_tools" | "use_category" | "streak" | "new_tools";
  category?: string;
}

const getDefaultProgress = (): UserProgress => ({
  toolsUsed: [],
  totalUses: 0,
  xp: 0,
  level: 1,
  lastActiveDate: "",
  streak: 0,
  dailyChallenges: [],
  completedChallenges: [],
});

export const getLevelFromXP = (xp: number): number => {
  // Level formula: level = floor(sqrt(xp / 100)) + 1
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getXPForLevel = (level: number): number => {
  // XP needed for a specific level
  return Math.pow(level - 1, 2) * 100;
};

export const getXPForNextLevel = (level: number): number => {
  return Math.pow(level, 2) * 100;
};

const generateDailyChallenges = (): DailyChallenge[] => {
  const today = new Date().toDateString();
  const seed = today.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const challenges: DailyChallenge[] = [
    {
      id: `use_3_${today}`,
      title: "Getting Started",
      description: "Use any 3 tools today",
      target: 3,
      current: 0,
      xpReward: 30,
      type: "use_tools",
    },
    {
      id: `use_5_${today}`,
      title: "Tool Explorer",
      description: "Use any 5 tools today",
      target: 5,
      current: 0,
      xpReward: 50,
      type: "use_tools",
    },
    {
      id: `new_tool_${today}`,
      title: "Try Something New",
      description: "Use a tool you haven't used before",
      target: 1,
      current: 0,
      xpReward: 75,
      type: "new_tools",
    },
  ];

  // Add category-specific challenge based on seed
  const categories = ["financial", "text", "media", "developer", "converters", "time", "productivity", "design"];
  const categoryIndex = seed % categories.length;
  const selectedCategory = categories[categoryIndex];
  
  challenges.push({
    id: `category_${selectedCategory}_${today}`,
    title: `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Master`,
    description: `Use 2 ${selectedCategory} tools`,
    target: 2,
    current: 0,
    xpReward: 40,
    type: "use_category",
    category: selectedCategory,
  });

  return challenges;
};

export const getProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem("userProgress");
    if (stored) {
      const progress = JSON.parse(stored) as UserProgress;
      
      // Check if we need to refresh daily challenges
      const today = new Date().toDateString();
      if (progress.lastActiveDate !== today) {
        // Reset daily challenge progress
        progress.dailyChallenges = generateDailyChallenges();
        
        // Check streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (progress.lastActiveDate === yesterday.toDateString()) {
          progress.streak += 1;
          progress.xp += XP_DAILY_BONUS * Math.min(progress.streak, 7); // Bonus caps at 7-day streak
        } else if (progress.lastActiveDate !== today) {
          progress.streak = 1;
        }
        
        progress.lastActiveDate = today;
        localStorage.setItem("userProgress", JSON.stringify(progress));
      }
      
      return progress;
    }
  } catch {
    // Ignore parse errors
  }
  
  const defaultProgress = getDefaultProgress();
  defaultProgress.dailyChallenges = generateDailyChallenges();
  defaultProgress.lastActiveDate = new Date().toDateString();
  return defaultProgress;
};

export const saveProgress = (progress: UserProgress): void => {
  localStorage.setItem("userProgress", JSON.stringify(progress));
  
  // Also update legacy storage for backward compatibility
  localStorage.setItem("recentTools", JSON.stringify(progress.toolsUsed));
  localStorage.setItem("totalToolUses", progress.totalUses.toString());
};

export const useToolUsage = (toolPath: string, toolCategory?: string) => {
  const trackUsage = useCallback(() => {
    const progress = getProgress();
    const isNewTool = !progress.toolsUsed.includes(toolPath);
    
    // Update tools used
    if (isNewTool) {
      progress.toolsUsed.push(toolPath);
      progress.xp += XP_PER_NEW_TOOL;
    }
    
    // Update total uses
    progress.totalUses += 1;
    progress.xp += XP_PER_USE;
    
    // Update level
    progress.level = getLevelFromXP(progress.xp);
    
    // Update daily challenges
    const today = new Date().toDateString();
    progress.dailyChallenges = progress.dailyChallenges.map(challenge => {
      // Skip already completed challenges
      if (progress.completedChallenges.includes(challenge.id)) {
        return challenge;
      }
      
      let newCurrent = challenge.current;
      
      switch (challenge.type) {
        case "use_tools":
          newCurrent = Math.min(challenge.current + 1, challenge.target);
          break;
        case "new_tools":
          if (isNewTool) {
            newCurrent = Math.min(challenge.current + 1, challenge.target);
          }
          break;
        case "use_category":
          if (toolCategory === challenge.category) {
            newCurrent = Math.min(challenge.current + 1, challenge.target);
          }
          break;
      }
      
      // Check if challenge completed
      if (newCurrent >= challenge.target && !progress.completedChallenges.includes(challenge.id)) {
        progress.completedChallenges.push(challenge.id);
        progress.xp += challenge.xpReward;
        progress.level = getLevelFromXP(progress.xp);
      }
      
      return { ...challenge, current: newCurrent };
    });
    
    saveProgress(progress);
  }, [toolPath, toolCategory]);

  // Track on mount (tool open)
  useEffect(() => {
    trackUsage();
  }, [trackUsage]);

  return { trackUsage };
};
