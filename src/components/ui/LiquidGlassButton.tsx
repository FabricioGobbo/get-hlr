import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant = "primary", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "glass glass-border rounded-xl px-6 py-3 font-semibold tracking-tight",
          "transition-all duration-200",
          "hover:scale-105 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          variant === "primary" &&
            "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg hover:shadow-blue-500/50",
          variant === "secondary" && "hover:bg-white/20 dark:hover:bg-white/10",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Carregando...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";
