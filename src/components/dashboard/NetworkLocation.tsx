import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { MapPin, Clock, Wifi } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LocationData {
  cidade: string;
  estado: string;
  bairro: string;
  ultimaAtualizacao: string;
  statusConexao: "online" | "offline";
}

interface NetworkLocationProps {
  data: LocationData;
}

export const NetworkLocation = ({ data }: NetworkLocationProps) => {
  const timeAgo = formatDistanceToNow(new Date(data.ultimaAtualizacao), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <LiquidGlassCard>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="glass glass-border rounded-full p-3">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tighter">Localização na Rede</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground tracking-tight">Status de Conexão</span>
            <LiquidGlassBadge variant={data.statusConexao === "online" ? "success" : "error"}>
              <div
                className={`w-2 h-2 rounded-full ${
                  data.statusConexao === "online" ? "bg-emerald-500 animate-pulse-glow" : "bg-red-500"
                }`}
              />
              {data.statusConexao === "online" ? "Online" : "Offline"}
            </LiquidGlassBadge>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm text-muted-foreground tracking-tight">Localização Atual</span>
              <div className="text-right">
                <p className="font-semibold tracking-tight">{data.bairro}</p>
                <p className="text-sm text-muted-foreground tracking-tight">
                  {data.cidade} - {data.estado}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground tracking-tight flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Última Atualização
            </span>
            <span className="font-semibold tracking-tight text-sm">{timeAgo}</span>
          </div>

          <div className="glass glass-border rounded-xl p-4 bg-blue-500/5 border-blue-500/20">
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-muted-foreground tracking-tight">Conectado à rede móvel</span>
            </div>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
