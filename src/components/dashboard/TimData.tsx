import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Phone, Smartphone, Shield, Globe, CheckCircle, XCircle, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimDataProps {
  timData: any;
}

export const TimData = ({ timData }: TimDataProps) => {
  const hlrSub = timData?.MOAttributes?.hlrSub || {};
  const boic = hlrSub.boic || {};
  const cfnry = hlrSub.cfnry || {};
  const cfu = hlrSub.cfu || {};
  const gprs = hlrSub.gprs?.[0] || {};
  const locationData = hlrSub.locationData || {};

  const getStatusBadge = (isActive: boolean) => {
    return (
      <LiquidGlassBadge variant={isActive ? "success" : "warning"}>
        {isActive ? "✅ Ativo" : "🚫 Inativo"}
      </LiquidGlassBadge>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-0 duration-500">
      {/* Identificação */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Identificação</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Número da linha</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {timData?.MOAttributes?.msisdn || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">MSISDN: Número de telefone completo</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">ID do chip (IMSI)</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {timData?.MOAttributes?.imsi || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Identificação única do chip na operadora</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Perfil de serviço</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {hlrSub.csp || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Tipo de plano habilitado</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Status da Linha */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-green-500/20">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Status da Linha</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Linha ativa</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.nam?.prov === "0")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">nam.prov: "{hlrSub.nam?.prov}" (0 = ativa)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Autenticação na rede</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.authd === "AVAILABLE")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">authd: "{hlrSub.authd}" (AVAILABLE = OK)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Rede 2G/3G</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.bs2g === "1" && hlrSub.bs3g === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">bs2g: {hlrSub.bs2g}, bs3g: {hlrSub.bs3g}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Internet e Dados */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/20">
            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Internet e Dados</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Internet habilitada</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(!!gprs.apnid)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">GPRS presente: {gprs.apnid ? "Sim" : "Não"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">APN configurada</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {gprs.apnid || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Ponto de acesso à internet</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Tipo de protocolo</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <LiquidGlassBadge variant="info">
                      {gprs.pdpty || "N/A"}
                    </LiquidGlassBadge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">pdpty: {gprs.pdpty}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Bloqueios e Restrições */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-500/20">
            <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Bloqueios e Restrições</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Chamadas internacionais</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(boic.provisionState !== "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">boic.provisionState: {boic.provisionState} (1 = bloqueado)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Roaming internacional</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(boic.bs20?.activationState === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">boic.bs20: {boic.bs20?.activationState}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Chamadas originadas</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.tsmo === "0")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">tsmo: {hlrSub.tsmo} (0 = liberado)</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Desvios de Chamadas */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-orange-500/20">
            <Phone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Desvios de Chamadas</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Desvio não atendidas</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(cfnry.provisionState === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">cfnry.provisionState: {cfnry.provisionState}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Desvio incondicional</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(cfu.provisionState === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">cfu.provisionState: {cfu.provisionState}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Status ncfnry</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {timData?.MOAttributes?.ncfnry || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Desvio quando não atende</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Recursos Adicionais */}
      <LiquidGlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/20">
            <Settings className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Recursos Adicionais</h3>
        </div>

        <TooltipProvider>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Identificação de chamadas</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.clip === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">clip: {hlrSub.clip} (mostra número de quem liga)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Ocultar número ao ligar</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.clir === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">clir: {hlrSub.clir}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Espera de chamada</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.hold === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">hold: {hlrSub.hold}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Conferência</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {getStatusBadge(hlrSub.mpty === "1")}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">mpty: {hlrSub.mpty} (chamada em conferência)</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>

      {/* Localização na Rede */}
      <LiquidGlassCard className="md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-bold text-lg tracking-tight">Localização na Rede</h3>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Central VLR</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {locationData.vlrAddress || hlrSub.vlrData || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Central gerenciando a linha</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm tracking-tight">Servidor SGSN</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-semibold text-sm tracking-tight cursor-help">
                    {locationData.sgsnNumber || "N/A"}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Servidor de conexão de dados</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </LiquidGlassCard>
    </div>
  );
};
