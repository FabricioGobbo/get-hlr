import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { User, Phone, CreditCard, Calendar } from "lucide-react";

interface ClientData {
  nome: string;
  telefone: string;
  cpf: string;
  plano: string;
  ativacao: string;
}

interface ClientInfoProps {
  data: ClientData;
}

export const ClientInfo = ({ data }: ClientInfoProps) => {
  return (
    <LiquidGlassCard>
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="glass glass-border rounded-full p-3">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tighter">Dados do Cliente</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground tracking-tight">Nome Completo</span>
            <span className="font-semibold tracking-tight text-right">{data.nome}</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground tracking-tight flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Telefone
            </span>
            <span className="font-semibold tracking-tight">{data.telefone}</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground tracking-tight flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              CPF
            </span>
            <span className="font-semibold tracking-tight">{data.cpf}</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground tracking-tight">Plano</span>
            <LiquidGlassBadge variant="info">{data.plano}</LiquidGlassBadge>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground tracking-tight flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Ativação
            </span>
            <span className="font-semibold tracking-tight">
              {new Date(data.ativacao).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};
