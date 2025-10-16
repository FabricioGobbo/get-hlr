import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LiquidGlassBadgeProps {
  children: ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  success: "bg-emerald-500/20 border-emerald-400/50 text-emerald-700 dark:text-emerald-300",
  error: "bg-red-500/20 border-red-400/50 text-red-700 dark:text-red-300",
  warning: "bg-yellow-500/20 border-yellow-400/50 text-yellow-700 dark:text-yellow-300",
  info: "bg-blue-500/20 border-blue-400/50 text-blue-700 dark:text-blue-300",
};

export const LiquidGlassBadge = ({ children, variant = "info", className }: LiquidGlassBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        "backdrop-blur-md border transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
