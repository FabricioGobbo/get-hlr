import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface LiquidGlassAlertProps {
  children: ReactNode;
  variant?: "warning" | "error" | "info";
  className?: string;
}

const variantStyles = {
  warning: "bg-yellow-500/20 border-yellow-400/50 text-yellow-900 dark:text-yellow-200",
  error: "bg-red-500/20 border-red-400/50 text-red-900 dark:text-red-200",
  info: "bg-blue-500/20 border-blue-400/50 text-blue-900 dark:text-blue-200",
};

export const LiquidGlassAlert = ({ children, variant = "warning", className }: LiquidGlassAlertProps) => {
  return (
    <div
      className={cn(
        "glass glass-border rounded-2xl p-4 flex items-start gap-3",
        "backdrop-blur-md transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm tracking-tight">{children}</div>
    </div>
  );
};
