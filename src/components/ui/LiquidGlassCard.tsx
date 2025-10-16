import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const LiquidGlassCard = ({ children, className, hover = true }: LiquidGlassCardProps) => {
  return (
    <div
      className={cn(
        "glass glass-border rounded-2xl p-6 shadow-xl transition-all duration-300",
        hover && "hover:bg-white/20 hover:scale-[1.02] dark:hover:bg-white/10",
        "relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
