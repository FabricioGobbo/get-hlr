import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface LiquidGlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const LiquidGlassInput = forwardRef<HTMLInputElement, LiquidGlassInputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "glass glass-border rounded-xl px-4 py-3 w-full",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
          "transition-all duration-200",
          "tracking-tight",
          error && "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50",
          success && "border-emerald-500/50 focus:ring-emerald-500/50 focus:border-emerald-500/50",
          className
        )}
        {...props}
      />
    );
  }
);

LiquidGlassInput.displayName = "LiquidGlassInput";
