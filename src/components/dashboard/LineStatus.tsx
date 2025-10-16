import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Signal, CheckCircle } from "lucide-react";

interface LineStatusProps {
  isActive: boolean;
}

export const LineStatus = ({ isActive }: LineStatusProps) => {
  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-green-500/20">
          <Signal className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Status da Linha</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Status Geral</span>
          <LiquidGlassBadge variant={isActive ? "success" : "error"}>
            <CheckCircle className="h-3 w-3" />
            {isActive ? "Linha Ativa" : "Linha Inativa"}
          </LiquidGlassBadge>
        </div>

        <div className="glass glass-border rounded-xl p-4 bg-green-500/5 border-green-500/20">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-muted-foreground tracking-tight">
              {isActive ? "Linha operacional e pronta para uso" : "Linha desativada"}
            </span>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
