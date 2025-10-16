import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Wifi, Phone, MessageSquare, Signal, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActiveServicesProps {
  volatileData: any;
  lteData: any;
}

export const ActiveServices = ({ volatileData, lteData }: ActiveServicesProps) => {
  const hasVoice = volatileData?.mscNumber?.address;
  const hasSgsnLocation = volatileData?.sgsnLocationInformation && Object.keys(volatileData.sgsnLocationInformation).length > 0;
  const has4G = !!lteData;

  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-green-500/20">
          <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Status de Serviços</h3>
      </div>

      <TooltipProvider>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm tracking-tight">Voz</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant={hasVoice ? "success" : "warning"}>
                    {hasVoice ? "Ativo" : "Inativo"}
                  </LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">mscNumber: {hasVoice ? "presente" : "null"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm tracking-tight">SMS</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant="success">Disponível</LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">SMS: sempre disponível quando linha ativa</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm tracking-tight">Dados 4G</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant={has4G && !hasSgsnLocation ? "warning" : has4G ? "success" : "info"}>
                    {has4G && !hasSgsnLocation ? "Config. OK, sem localização" : has4G ? "Ativo" : "3G"}
                  </LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">lteData: {has4G ? "presente" : "null"}</p>
                <p className="text-xs">sgsnLocationInformation: {hasSgsnLocation ? "presente" : "{}"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm tracking-tight">Roaming</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <LiquidGlassBadge variant="info">Verificar VLR</LiquidGlassBadge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">vlrLocationInformation: verificar para status de roaming</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </LiquidGlassCard>
  );
};
