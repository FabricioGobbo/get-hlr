import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { User, Phone, Smartphone } from "lucide-react";
import { formatMSISDN, formatIMSI, formatICCID } from "@/utils/formatters";

interface ClientInfoProps {
  msisdn: string;
  imsi: string;
  iccId: string;
  operatorName: string;
  status: string;
  searchedBy?: string;
}

export const ClientInfo = ({ msisdn, imsi, iccId, operatorName, status, searchedBy }: ClientInfoProps) => {
  const getOperatorName = (name: string) => {
    if (name.toLowerCase() === 'surf') return 'Surf Telecom';
    return name;
  };

  return (
    <LiquidGlassCard>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
          <User className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-bold text-lg tracking-tight">Identificação do Chip/Linha</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm tracking-tight">Operadora</span>
          <span className="font-semibold tracking-tight">{getOperatorName(operatorName)}</span>
        </div>

        {searchedBy && (
          <div className="pt-2 border-t border-white/10">
            <LiquidGlassBadge variant="info" className="w-full justify-center">
              Buscado por: {searchedBy}
            </LiquidGlassBadge>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground text-sm tracking-tight">MSISDN</span>
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-right">
              {formatMSISDN(msisdn)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground text-sm tracking-tight">IMSI</span>
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-right">
              {formatIMSI(imsi)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground text-sm tracking-tight">ICCID</span>
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-right break-all">
              {formatICCID(iccId)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-muted-foreground text-sm tracking-tight">Status da Linha</span>
          <LiquidGlassBadge variant={status === "Ativo" ? "success" : "error"}>
            {status}
          </LiquidGlassBadge>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
