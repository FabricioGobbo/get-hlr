import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

      <TooltipProvider>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Autenticação</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant={hlrData.active ? "success" : "error"}>
                    <CheckCircle className="h-3 w-3" />
                    {hlrData.active ? "Ativa" : "Inativa"}
                  </LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">hlrData.active: {hlrData.active.toString()}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Criptografia</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-semibold text-sm tracking-tight cursor-help">
                  <Lock className="h-3 w-3 inline mr-1" />
                  {hlrData.encryption} {hlrData.k_length?.replace('K_', '')}bit
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">encryption: "{hlrData.encryption}"</p>
                <p className="text-xs">k_length: "{hlrData.k_length}"</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Protocolo</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-semibold text-sm tracking-tight cursor-help">
                  {hlrData.authenticationScheme}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">authenticationScheme: "{hlrData.authenticationScheme}"</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Algoritmo</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-semibold text-sm tracking-tight cursor-help">
                  {hlrData.algorithm}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">algorithm: "{hlrData.algorithm}"</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </LiquidGlassCard>
  );
};
