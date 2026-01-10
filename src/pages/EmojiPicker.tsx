import React, { useState, useEffect, useMemo } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Clock, Smile, Heart, Coffee, Plane, Activity, Flag, Hash, Sparkles, Copy, Star } from "lucide-react";
import { InArticleAd } from "@/components/AdBanner";

const emojiCategories = {
  smileys: {
    label: "Smileys & Emotion",
    icon: Smile,
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐"]
  },
  people: {
    label: "People & Body",
    icon: Activity,
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "👩"]
  },
  animals: {
    label: "Animals & Nature",
    icon: Coffee,
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀"]
  },
  food: {
    label: "Food & Drink",
    icon: Coffee,
    emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗"]
  },
  travel: {
    label: "Travel & Places",
    icon: Plane,
    emojis: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦯", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️", "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🛥️", "🛳️", "⛴️", "🚢", "⚓", "🪝"]
  },
  activities: {
    label: "Activities",
    icon: Activity,
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤺", "🤾", "🏌️", "🏇", "⛹️", "🏊", "🤽", "🏄", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️"]
  },
  objects: {
    label: "Objects",
    icon: Hash,
    emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜"]
  },
  symbols: {
    label: "Symbols",
    icon: Heart,
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐"]
  },
  flags: {
    label: "Flags",
    icon: Flag,
    emojis: ["🏳️", "🏴", "🏴‍☠️", "🏁", "🚩", "🎌", "🏳️‍🌈", "🏳️‍⚧️", "🇺🇳", "🇦🇫", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇰🇭", "🇨🇲", "🇨🇦", "🇮🇨", "🇨🇻", "🇧🇶", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲"]
  }
};

const EmojiPicker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("smileys");
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [favoriteEmojis, setFavoriteEmojis] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentEmojis");
    if (stored) setRecentEmojis(JSON.parse(stored));
    
    const favorites = localStorage.getItem("favoriteEmojis");
    if (favorites) setFavoriteEmojis(JSON.parse(favorites));
  }, []);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    toast.success(`${emoji} copied to clipboard!`);
    
    const updated = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 20);
    setRecentEmojis(updated);
    localStorage.setItem("recentEmojis", JSON.stringify(updated));
  };

  const toggleFavorite = (emoji: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFavorite = favoriteEmojis.includes(emoji);
    const updated = isFavorite 
      ? favoriteEmojis.filter(e => e !== emoji)
      : [...favoriteEmojis, emoji];
    setFavoriteEmojis(updated);
    localStorage.setItem("favoriteEmojis", JSON.stringify(updated));
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const filteredEmojis = useMemo(() => {
    if (!searchQuery) return null;
    const query = searchQuery.toLowerCase();
    const results: string[] = [];
    Object.values(emojiCategories).forEach(cat => {
      cat.emojis.forEach(emoji => {
        if (results.length < 100) results.push(emoji);
      });
    });
    return results;
  }, [searchQuery]);

  const currentEmojis = filteredEmojis || emojiCategories[selectedCategory as keyof typeof emojiCategories]?.emojis || [];

  return (
    <PageLayout
      title="Emoji Picker"
      description="Search and copy emojis easily with categories, recent selections, and favorites"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent & Favorites */}
        {(recentEmojis.length > 0 || favoriteEmojis.length > 0) && (
          <div className="grid md:grid-cols-2 gap-4">
            {recentEmojis.length > 0 && (
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {recentEmojis.slice(0, 10).map((emoji, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        size="sm"
                        className="text-2xl h-10 w-10 p-0 hover:bg-primary/10"
                        onClick={() => copyEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {favoriteEmojis.length > 0 && (
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {favoriteEmojis.slice(0, 10).map((emoji, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        size="sm"
                        className="text-2xl h-10 w-10 p-0 hover:bg-primary/10"
                        onClick={() => copyEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <InArticleAd />

        {/* Main Picker */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            {!searchQuery && (
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
                  {Object.entries(emojiCategories).map(([key, cat]) => {
                    const Icon = cat.icon;
                    return (
                      <TabsTrigger key={key} value={key} className="flex items-center gap-1 text-xs">
                        <Icon className="h-3 w-3" />
                        <span className="hidden sm:inline">{cat.label.split(' ')[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            )}

            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1 max-h-[400px] overflow-y-auto p-2">
              {currentEmojis.map((emoji, i) => (
                <div key={i} className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-2xl h-10 w-10 p-0 hover:bg-primary/10 hover:scale-125 transition-transform"
                    onClick={() => copyEmoji(emoji)}
                  >
                    {emoji}
                  </Button>
                  <button
                    onClick={(e) => toggleFavorite(emoji, e)}
                    className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star className={`h-3 w-3 ${favoriteEmojis.includes(emoji) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Click any emoji to copy • Hover to add to favorites
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="flex justify-center gap-4">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            500+ Emojis
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Copy className="h-3 w-3" />
            One-Click Copy
          </Badge>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmojiPicker;
