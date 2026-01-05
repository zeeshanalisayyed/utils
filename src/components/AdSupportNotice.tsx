import { Heart, Coffee } from "lucide-react";

export function AdSupportNotice() {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/10 rounded-2xl p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <Coffee className="h-6 w-6 text-amber-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm md:text-base text-foreground font-medium mb-1">
            <span className="text-primary">We earn only through ads</span> to bring you 50+ premium tools completely free!
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            Please keep ads enabled — it helps us keep the lights on and continue building amazing tools for you. 
            <span className="inline-flex items-center gap-1 ml-1">
              <Heart className="h-3 w-3 text-red-500 inline" />
              Thank you for your support!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
