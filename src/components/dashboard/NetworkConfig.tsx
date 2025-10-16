import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Network, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NetworkConfigProps {
  hlrData: any;
  lteData: any;
}

export const NetworkConfig = ({ hlrData, lteData }: NetworkConfigProps) => {
  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-blue-500/20">
          <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Configuração de Rede</h3>
      </div>

      <TooltipProvider>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Perfil de Rede</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-semibold text-sm tracking-tight cursor-help">{hlrData.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">hlrData.name: "{hlrData.name}"</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Tecnologia</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant="info">
                    {lteData ? "4G/5G Habilitado" : "3G"}
                  </LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">lteData: {lteData ? "presente" : "null"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">AMF</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-semibold text-sm tracking-tight cursor-help">{hlrData.amf}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">hlrData.amf: "{hlrData.amf}"</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <LiquidGlassBadge variant="success" className="w-full justify-center">
              <CheckCircle className="h-3 w-3" />
              Configurações OK
            </LiquidGlassBadge>
          </div>
        </div>
      </TooltipProvider>
    </LiquidGlassCard>
  );
};
