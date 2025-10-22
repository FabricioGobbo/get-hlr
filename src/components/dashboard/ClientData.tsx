import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";

interface ClientDataProps {
  data: any;
}

export const ClientData = ({ data }: ClientDataProps) => {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      {/* Bloco 1: Status de Bloqueios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.dados 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.dados ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">DADO BLOQUEADO?</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.velocidade 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.velocidade ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">VELOCIDADE REDUZIDA?</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.chip 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.chip ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">CHIP BLOQUEADO?</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.vozOriginada 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.vozOriginada ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">VOZ ORIGINADA BLOQUEADA?</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.vozTerminada 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.vozTerminada ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">VOZ TERMINADA BLOQUEADA?</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard 
          hover={false} 
          className={data.blockStatus.sms 
            ? "bg-red-600/50 border-red-500/70 shadow-red-500/30 shadow-lg" 
            : "bg-emerald-500/30 border-emerald-400/50 shadow-emerald-400/20 shadow-lg"
          }
        >
          <div className="text-center space-y-2">
            <p className="font-bold text-white text-2xl drop-shadow-lg">
              {data.blockStatus.sms ? "SIM" : "NÃO"}
            </p>
            <p className="text-xs text-muted-foreground tracking-tight">SMS BLOQUEADO?</p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Bloco 2: Informações principais da linha */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.msisdn}</p>
            <p className="text-xs text-muted-foreground tracking-tight">MSISDN</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-green-600 dark:text-green-400 text-lg">{data.status}</p>
            <p className="text-xs text-muted-foreground tracking-tight">STATUS</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.planActivationDate}</p>
            <p className="text-xs text-muted-foreground tracking-tight">ATIVAÇÃO PLANO</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.planEndDate}</p>
            <p className="text-xs text-muted-foreground tracking-tight">FIM DO PLANO</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.dataUsage}</p>
            <p className="text-xs text-muted-foreground tracking-tight">DADOS</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.minutes}</p>
            <p className="text-xs text-muted-foreground tracking-tight">MINUTOS</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.smsRemaining}</p>
            <p className="text-xs text-muted-foreground tracking-tight">SMS RESTANTES</p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Bloco 3: Informações da operadora e plano */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-green-600 dark:text-green-400 text-lg">{data.operadora}</p>
            <p className="text-xs text-muted-foreground tracking-tight">OPERADORA</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center lg:col-span-2">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.planName}</p>
            <p className="text-xs text-muted-foreground tracking-tight">PLANO</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-purple-600 dark:text-purple-400 text-lg">{data.categoria}</p>
            <p className="text-xs text-muted-foreground tracking-tight">CATEGORIA DO ASSINANTE NA MARCA</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.imsi}</p>
            <p className="text-xs text-muted-foreground tracking-tight">IMSI</p>
          </div>
        </LiquidGlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.sistema}</p>
            <p className="text-xs text-muted-foreground tracking-tight">SISTEMA</p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Bloco 4: Informações financeiras e de ativação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.cpf}</p>
            <p className="text-xs text-muted-foreground tracking-tight">CPF</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.chipActivationDate}</p>
            <p className="text-xs text-muted-foreground tracking-tight">ATIVAÇÃO CHIP</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.portIn}</p>
            <p className="text-xs text-muted-foreground tracking-tight">PORT-IN</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.totalBalance}</p>
            <p className="text-xs text-muted-foreground tracking-tight">SALDO TOTAL</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-lg">{data.indicationBalance}</p>
            <p className="text-xs text-muted-foreground tracking-tight">SALDO INDICAÇÃO</p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Bloco 5: Identificadores técnicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.iccId}</p>
            <p className="text-xs text-muted-foreground tracking-tight">ICCID</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.imsi}</p>
            <p className="text-xs text-muted-foreground tracking-tight">IMSI</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.pin}</p>
            <p className="text-xs text-muted-foreground tracking-tight">PIN</p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard hover={false} className="text-center">
          <div className="space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">{data.puk}</p>
            <p className="text-xs text-muted-foreground tracking-tight">PUK</p>
          </div>
        </LiquidGlassCard>
      </div>

    </div>
  );
};
