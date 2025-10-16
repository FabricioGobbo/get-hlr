import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Signal, ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface LineData {
  status: "ativa" | "inativa";
  ativacao: string;
  bloqueios: string[];
  qualidadeSinal: number;
}

interface LineStatusProps {
  data: LineData;
}

const blockTranslations: Record<string, { label: string; icon: any; variant: "error" | "warning" }> = {
  PCS_BLOCK: { label: "Pagamento Pendente", icon: XCircle, variant: "error" },
  IMEI_BLOCK: { label: "Bloqueio por Perda/Roubo", icon: ShieldAlert, variant: "error" },
  ADM_BLOCK: { label: "Bloqueio Administrativo", icon: AlertTriangle, variant: "warning" },
};

export const LineStatus = ({ data }: LineStatusProps) => {
  const hasBlocks = data.bloqueios.length > 0;
  const StatusIcon = data.status === "ativa" ? CheckCircle2 : XCircle;

  return (
    <LiquidGlassCard>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="glass glass-border rounded-full p-3">
            <Signal className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tighter">Status da Linha</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground tracking-tight">Status Geral</span>
            <LiquidGlassBadge variant={data.status === "ativa" ? "success" : "error"}>
              <StatusIcon className="h-3.5 w-3.5" />
              {data.status === "ativa" ? "Linha Ativa" : "Linha Inativa"}
            </LiquidGlassBadge>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground tracking-tight block">Bloqueios</span>
            {hasBlocks ? (
              <div className="space-y-2">
                {data.bloqueios.map((bloqueio, index) => {
                  const translation = blockTranslations[bloqueio] || {
                    label: bloqueio,
                    icon: AlertTriangle,
                    variant: "warning" as const,
                  };
                  const Icon = translation.icon;
                  return (
                    <LiquidGlassBadge key={index} variant={translation.variant}>
                      <Icon className="h-3.5 w-3.5" />
                      {translation.label}
                    </LiquidGlassBadge>
                  );
                })}
              </div>
            ) : (
              <LiquidGlassBadge variant="success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Sem Bloqueios
              </LiquidGlassBadge>
            )}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground tracking-tight">Qualidade do Sinal</span>
              <span className="font-semibold tracking-tight">{data.qualidadeSinal}%</span>
            </div>
            <div className="glass glass-border rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
                style={{ width: `${data.qualidadeSinal}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
