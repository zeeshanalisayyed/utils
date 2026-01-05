import { Calculator, Image, FileText, DollarSign, Video, Lock, Zap, Download } from "lucide-react";

const floatingIcons = [
  { icon: Calculator, position: "top-20 left-[5%]", delay: "0s", size: "h-8 w-8" },
  { icon: Image, position: "top-32 right-[8%]", delay: "1s", size: "h-10 w-10" },
  { icon: DollarSign, position: "top-48 left-[12%]", delay: "2s", size: "h-7 w-7" },
  { icon: Video, position: "bottom-32 right-[5%]", delay: "1.5s", size: "h-9 w-9" },
  { icon: Lock, position: "bottom-20 left-[8%]", delay: "0.5s", size: "h-6 w-6" },
  { icon: FileText, position: "top-24 right-[15%]", delay: "2.5s", size: "h-7 w-7" },
  { icon: Zap, position: "bottom-40 right-[12%]", delay: "3s", size: "h-8 w-8" },
  { icon: Download, position: "bottom-28 left-[15%]", delay: "1.8s", size: "h-6 w-6" },
];

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.position} animate-float opacity-20 hidden lg:block`}
          style={{ animationDelay: item.delay, animationDuration: "6s" }}
        >
          <div className="p-3 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/10">
            <item.icon className={`${item.size} text-primary`} />
          </div>
        </div>
      ))}
    </div>
  );
}
