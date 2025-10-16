import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Shield, Lock, CheckCircle } from "lucide-react";

interface SecurityStatusProps {
  hlrData: any;
}

export const SecurityStatus = ({ hlrData }: SecurityStatusProps) => {
  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-emerald-500/20">
          <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Status de Segurança</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Autenticação</span>
          <LiquidGlassBadge variant={hlrData.active ? "success" : "error"}>
            <CheckCircle className="h-3 w-3" />
            {hlrData.active ? "Ativa" : "Inativa"}
          </LiquidGlassBadge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Criptografia</span>
          <span className="font-semibold text-sm tracking-tight">
            <Lock className="h-3 w-3 inline mr-1" />
            {hlrData.encryption} {hlrData.k_length?.replace('K_', '')}bit
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Protocolo</span>
          <span className="font-semibold text-sm tracking-tight">
            {hlrData.authenticationScheme}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Algoritmo</span>
          <span className="font-semibold text-sm tracking-tight">
            {hlrData.algorithm}
          </span>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
