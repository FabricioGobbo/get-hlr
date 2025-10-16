import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { MapPin, Phone, Globe, AlertTriangle } from "lucide-react";
import { formatMSISDN } from "@/utils/formatters";

interface NetworkLocationProps {
  volatileData: any;
}

export const NetworkLocation = ({ volatileData }: NetworkLocationProps) => {
  const hasMscNumber = volatileData?.mscNumber?.address;
  const hasVlrLocation = volatileData?.vlrLocationInformation && Object.keys(volatileData.vlrLocationInformation).length > 0;
  const hasSgsnLocation = volatileData?.sgsnLocationInformation && Object.keys(volatileData.sgsnLocationInformation).length > 0;

  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/20">
          <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Localização na Rede</h3>
      </div>

      <div className="space-y-3">
        {hasMscNumber ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm tracking-tight">MSC Conectado</span>
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight">
                {formatMSISDN(volatileData.mscNumber.address)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm tracking-tight">Tipo de Numeração</span>
              </div>
              <span className="font-semibold text-sm tracking-tight">
                {volatileData.mscNumber.addressType}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Plano de Numeração</span>
              <span className="font-semibold text-sm tracking-tight">
                {volatileData.mscNumber.numberingPlan}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm tracking-tight">MSC: Não conectado</span>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Localização VLR</span>
            {hasVlrLocation ? (
              <LiquidGlassBadge variant="success">Disponível</LiquidGlassBadge>
            ) : (
              <LiquidGlassBadge variant="warning">
                <AlertTriangle className="h-3 w-3" />
                Não disponível
              </LiquidGlassBadge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm tracking-tight">Localização SGSN</span>
            {hasSgsnLocation ? (
              <LiquidGlassBadge variant="success">Disponível</LiquidGlassBadge>
            ) : (
              <LiquidGlassBadge variant="warning">
                <AlertTriangle className="h-3 w-3" />
                Não disponível
              </LiquidGlassBadge>
            )}
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
