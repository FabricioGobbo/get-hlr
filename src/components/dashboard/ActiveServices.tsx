import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Phone, MessageSquare, Wifi, Globe } from "lucide-react";

interface ServicesData {
  voz: { ativo: boolean; qualidade?: string };
  sms: { ativo: boolean };
  dados: { ativo: boolean; tecnologia?: string; velocidade?: string };
  roaming: { nacional: boolean; internacional: boolean };
}

interface ActiveServicesProps {
  data: ServicesData;
}

export const ActiveServices = ({ data }: ActiveServicesProps) => {
  const services = [
    {
      icon: Phone,
      label: "Chamadas",
      active: data.voz.ativo,
      detail: data.voz.qualidade,
    },
    {
      icon: MessageSquare,
      label: "SMS",
      active: data.sms.ativo,
      detail: null,
    },
    {
      icon: Wifi,
      label: "Dados Móveis",
      active: data.dados.ativo,
      detail: data.dados.tecnologia,
    },
    {
      icon: Globe,
      label: "Roaming",
      active: data.roaming.nacional || data.roaming.internacional,
      detail: data.roaming.internacional ? "Internacional" : data.roaming.nacional ? "Nacional" : null,
    },
  ];

  return (
    <LiquidGlassCard>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="glass glass-border rounded-full p-3">
            <Wifi className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold tracking-tighter">Serviços Ativos</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`glass glass-border rounded-xl p-4 transition-all duration-200 ${
                  service.active
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-gray-500/10 border-gray-500/30 opacity-50"
                }`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className={`glass glass-border rounded-full p-3 ${
                      service.active ? "bg-emerald-500/20" : "bg-gray-500/20"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${service.active ? "text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="font-semibold tracking-tight text-sm">{service.label}</p>
                    {service.detail && (
                      <p className="text-xs text-muted-foreground tracking-tight mt-1">{service.detail}</p>
                    )}
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      service.active ? "bg-emerald-500 animate-pulse-glow" : "bg-gray-400"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {data.dados.ativo && data.dados.velocidade && (
          <div className="glass glass-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground tracking-tight">Velocidade de Dados</span>
              <span className="font-bold tracking-tight text-primary">{data.dados.velocidade}</span>
            </div>
          </div>
        )}
      </div>
    </LiquidGlassCard>
  );
};
