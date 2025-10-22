import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Network, Shield, Wifi, Gauge, Globe, Info } from "lucide-react";

interface VoLteDataProps {
  volteData: any;
}

export const VoLteData = ({ volteData }: VoLteDataProps) => {
  const subscriber = volteData.subscriber;
  const profile = volteData.profile;
  const apnConfigs = profile?.apn_configurations || [];

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <LiquidGlassBadge variant="success">Ativo</LiquidGlassBadge>
    ) : (
      <LiquidGlassBadge variant="error">Inativo</LiquidGlassBadge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Identificação */}
      <LiquidGlassCard>
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-blue-500/20">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Identificação do Assinante</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Número principal da linha</p>
                      <p className="font-medium text-foreground">{subscriber?.basic_msisdn || "N/A"}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>O número de telefone do cliente</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Identificação da linha no chip</p>
                      <p className="font-medium text-foreground">{subscriber?.imsi || "N/A"}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Código único que identifica o chip dentro da rede 4G/VoLTE</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Perfil de assinatura LTE</p>
                      <p className="font-medium text-foreground">{subscriber?.eps_profile_id || "N/A"}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Define o conjunto de serviços e permissões do cliente no 4G/VoLTE</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Código de autenticação adicional</p>
                      <p className="font-medium text-foreground">{subscriber?.amf || "N/A"}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complemento usado na autenticação segura do SIM</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Configurações de Acesso */}
      <LiquidGlassCard>
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Network className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Configurações de Acesso à Rede</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nome do perfil</p>
                      <p className="font-medium text-foreground">{profile?.description || "N/A"}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nome interno do pacote de dados/voz associado</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tipo de acesso</p>
                      <p className="font-medium text-foreground">
                        {profile?.network_access_mode === "ONLY_PACKET" ? "Somente dados (VoLTE/IMS)" : profile?.network_access_mode || "N/A"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ONLY_PACKET = só dados (VoLTE, internet, IMS). Sem voz 2G/3G</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Acesso 2G habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.geran)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite uso de rede 2G (quando disponível)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Acesso 3G habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.utran)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite uso de rede 3G (quando disponível)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Acesso 4G (LTE) habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.wb_e_utran)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite acesso à rede 4G, essencial para VoLTE</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Acesso 5G habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.nr_in_5gs)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite conexão à rede 5G, se disponível</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">LTE-M habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.lte_m)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite uso em redes IoT LTE-M (para dispositivos inteligentes)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">NB-IoT habilitado</p>
                      <div>{getStatusBadge(profile?.access_restriction?.nb_iot)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Permite uso em redes NB-IoT (para dispositivos IoT)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Velocidade e Limites */}
      <LiquidGlassCard>
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-cyan-500/20">
            <Gauge className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Velocidade e Limites</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Velocidade máxima de upload</p>
                      <p className="font-medium text-foreground">
                        {profile?.ambr?.max_bandwidth_uplink ? `${(profile.ambr.max_bandwidth_uplink / 1000000).toFixed(0)} Mbps` : "N/A"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Velocidade máxima para envio de dados</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Velocidade máxima de download</p>
                      <p className="font-medium text-foreground">
                        {profile?.ambr?.max_bandwidth_downlink ? `${(profile.ambr.max_bandwidth_downlink / 1000000).toFixed(0)} Mbps` : "N/A"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Velocidade máxima para recebimento de dados</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Atualização de sessão</p>
                      <p className="font-medium text-foreground">
                        {profile?.subscribed_periodic_rau_tau_timer ? `A cada ${profile.subscribed_periodic_rau_tau_timer} minutos` : "N/A"}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Frequência de atualização da sessão na rede</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Configurações de APN */}
      {apnConfigs.map((apn: any, index: number) => (
        <LiquidGlassCard key={index}>
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-lg bg-emerald-500/20">
              <Wifi className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                APN - {apn.service_selection}
                {apn.service_selection === "ims" && " (Voz VoLTE)"}
                {apn.service_selection === "xcap" && " (Configurações IMS)"}
                {apn.service_selection === "surf.br" && " (Internet)"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tipo de protocolo de dados</p>
                        <p className="font-medium text-foreground">{apn.pdn_type || "N/A"}</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Define se a conexão usa IPv4, IPv6 ou ambos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Classe de qualidade (QoS)</p>
                        <p className="font-medium text-foreground">
                          {apn.eps_subscribed_qos_profile?.qos_class_identifier || "N/A"}
                          {apn.eps_subscribed_qos_profile?.qos_class_identifier === 5 && " (Voz IMS)"}
                          {apn.eps_subscribed_qos_profile?.qos_class_identifier === 9 && " (Dados comuns)"}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Define a prioridade da conexão: 5 = voz IMS, 9 = dados comuns</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Prioridade de retenção</p>
                        <p className="font-medium text-foreground">
                          {apn.eps_subscribed_qos_profile?.allocation_retention_priority?.priority_level || "N/A"}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Quanto menor o número, maior a prioridade na rede (15 = baixa, 1 = alta)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Pode substituir outros usuários</p>
                        <div>
                          {getStatusBadge(apn.eps_subscribed_qos_profile?.allocation_retention_priority?.pre_emption_capability)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Se false, esta conexão não pode derrubar outras em congestionamento</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Pode ser derrubado</p>
                        <div>
                          {getStatusBadge(apn.eps_subscribed_qos_profile?.allocation_retention_priority?.pre_emption_vulnerability)}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Se false, é mais estável durante congestionamentos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">IP dinâmico em roaming</p>
                        <div>{getStatusBadge(apn.vplmn_dynamic_address_allowed)}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Indica se o cliente pode receber IP dinâmico em rede de outra operadora</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Limite de upload desta APN</p>
                        <p className="font-medium text-foreground">
                          {apn.ambr?.max_bandwidth_uplink ? `${(apn.ambr.max_bandwidth_uplink / 1000000).toFixed(0)} Mbps` : "N/A"}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Velocidade máxima de upload para este serviço específico</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Limite de download desta APN</p>
                        <p className="font-medium text-foreground">
                          {apn.ambr?.max_bandwidth_downlink ? `${(apn.ambr.max_bandwidth_downlink / 1000000).toFixed(0)} Mbps` : "N/A"}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Velocidade máxima de download para este serviço específico</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </LiquidGlassCard>
      ))}
    </div>
  );
};
