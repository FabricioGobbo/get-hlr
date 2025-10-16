import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Network, CheckCircle } from "lucide-react";

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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Perfil de Rede</span>
          <span className="font-semibold text-sm tracking-tight">{hlrData.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Tecnologia</span>
          <LiquidGlassBadge variant="info">
            {lteData ? "4G/5G Habilitado" : "3G"}
          </LiquidGlassBadge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">AMF</span>
          <span className="font-semibold text-sm tracking-tight">{hlrData.amf}</span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <LiquidGlassBadge variant="success" className="w-full justify-center">
            <CheckCircle className="h-3 w-3" />
            Configurações OK
          </LiquidGlassBadge>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
