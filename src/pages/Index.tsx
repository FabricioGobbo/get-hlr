import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ClientInfo } from "@/components/dashboard/ClientInfo";

import { ActiveServices } from "@/components/dashboard/ActiveServices";
import { NetworkLocation } from "@/components/dashboard/NetworkLocation";
import { SecurityStatus } from "@/components/dashboard/SecurityStatus";
import { NetworkConfig } from "@/components/dashboard/NetworkConfig";
import { TechnicalDetails } from "@/components/dashboard/TechnicalDetails";
import { ClientData } from "@/components/dashboard/ClientData";
import { TimData } from "@/components/dashboard/TimData";
import { VoLteData } from "@/components/dashboard/VoLteData";
import { LiquidGlassAlert } from "@/components/ui/LiquidGlassAlert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subscriberData } from "@/data/mockData";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [searchedBy, setSearchedBy] = useState<string>("");

  const handleSearch = async (searchValue: string, searchType: string) => {
    setLoading(true);
    setShowData(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSearchedBy(searchType);
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
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          )}

          {showData && !loading && (
            <>
              {subscriberData.warning && (
                <LiquidGlassAlert variant="warning" className="mt-8">
                  <strong>Atenção:</strong> Alguns dados podem estar incompletos devido a falha temporária na comunicação com elementos da rede.
                </LiquidGlassAlert>
              )}

              <Tabs defaultValue="cliente" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/20 backdrop-blur-lg border-2 border-white/30 p-1">
                  <TabsTrigger 
                    value="cliente" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                  >
                    Dados do Cliente
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rede"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                  >
                    Status na Rede
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cliente" className="mt-6">
                  <ClientData data={subscriberData} />
                </TabsContent>

                <TabsContent value="rede" className="mt-6 space-y-6">
                  <Tabs defaultValue="summa">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/20 backdrop-blur-lg border-2 border-white/30 p-1">
                      <TabsTrigger 
                        value="summa" 
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                      >
                        Summa
                      </TabsTrigger>
                      <TabsTrigger 
                        value="volte"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                      >
                        VoLTE
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tim"
                        className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                      >
                        Tim
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="summa" className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-0 duration-500">
                        <ClientInfo
                          msisdn={subscriberData.msisdn}
                          imsi={subscriberData.imsi}
                          iccId={subscriberData.iccId}
                          operatorName={subscriberData.operatorName}
                          status={subscriberData.hlrData.active ? "Ativo" : "Inativo"}
                          searchedBy={searchedBy}
                        />
                        <ActiveServices volatileData={subscriberData.volatileData} lteData={subscriberData.lteData} volteActive={subscriberData.volteActive} />
                        <NetworkConfig hlrData={subscriberData.hlrData} lteData={subscriberData.lteData} />
                        <NetworkLocation volatileData={subscriberData.volatileData} />
                        <SecurityStatus hlrData={subscriberData.hlrData} />
                      </div>

                      <TechnicalDetails hlrData={subscriberData.hlrData} />
                    </TabsContent>

                    <TabsContent value="volte" className="mt-6">
                      <VoLteData volteData={subscriberData.volteData} />
                    </TabsContent>

                    <TabsContent value="tim" className="mt-6">
                      <TimData timData={subscriberData.timData} />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </>
          )}

          {!showData && !loading && (
            <div className="mt-16 text-center">
              <div className="glass glass-border rounded-2xl p-12 max-w-md mx-auto">
                <div className="glass glass-border rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold tracking-tighter mb-2">Comece sua consulta</h3>
                <p className="text-muted-foreground tracking-tight text-sm">
                  Digite MSISDN, IMSI ou ICCID acima para visualizar informações do assinante
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
