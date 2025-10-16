import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ClientInfo } from "@/components/dashboard/ClientInfo";
import { LineStatus } from "@/components/dashboard/LineStatus";
import { ActiveServices } from "@/components/dashboard/ActiveServices";
import { NetworkLocation } from "@/components/dashboard/NetworkLocation";
import { toast } from "sonner";

const mockData = {
  cliente: {
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    cpf: "***.765.432-**",
    plano: "Pós-Pago Ilimitado 50GB",
    ativacao: "2023-03-15",
  },
  linha: {
    status: "ativa" as const,
    ativacao: "2023-03-15",
    bloqueios: [] as string[],
    qualidadeSinal: 95,
  },
  servicos: {
    voz: { ativo: true, qualidade: "HD" },
    sms: { ativo: true },
    dados: { ativo: true, tecnologia: "5G", velocidade: "250 Mbps" },
    roaming: { nacional: true, internacional: false },
  },
  localizacao: {
    cidade: "São Paulo",
    estado: "SP",
    bairro: "Pinheiros",
    ultimaAtualizacao: new Date().toISOString(),
    statusConexao: "online" as const,
  },
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleSearch = async (phoneNumber: string) => {
    setLoading(true);
    setShowData(false);

    // Simular busca na API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setShowData(true);
    toast.success("Dados carregados com sucesso!");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {loading && (
            <div className="mt-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="glass glass-border rounded-2xl h-48 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          )}

          {showData && !loading && (
            <div
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in-0 duration-500"
              style={{ animationDelay: "100ms" }}
            >
              <div className="space-y-6">
                <ClientInfo data={mockData.cliente} />
                <LineStatus data={mockData.linha} />
              </div>
              <div className="space-y-6">
                <ActiveServices data={mockData.servicos} />
                <NetworkLocation data={mockData.localizacao} />
              </div>
            </div>
          )}

          {!showData && !loading && (
            <div className="mt-16 text-center">
              <div className="glass glass-border rounded-2xl p-12 max-w-md mx-auto">
                <div className="glass glass-border rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tighter mb-2">Comece sua consulta</h3>
                <p className="text-muted-foreground tracking-tight">
                  Digite um número de telefone acima para visualizar todas as informações do assinante
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
