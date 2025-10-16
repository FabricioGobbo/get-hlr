import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Wrench } from "lucide-react";
import { useState } from "react";

interface TechnicalDetailsProps {
  hlrData: any;
}

export const TechnicalDetails = ({ hlrData }: TechnicalDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LiquidGlassCard>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20">
                <Wrench className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-lg tracking-tight">Detalhes Técnicos Avançados</h3>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>

<CollapsibleContent className="mt-4">
  <div className="space-y-4 text-sm">
    
    {/* Card: Parâmetros MILENAGE */}
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
      <h4 className="font-semibold mb-3 text-sm tracking-tighter text-white/90">
        Parâmetros MILENAGE
      </h4>
      <div className="border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="grid grid-cols-5">
          {/* Headers */}
          <div className="border-r border-b border-white/10 bg-white/5 p-3 text-center">
            <span className="text-xs font-semibold text-white/70 tracking-tight">R1</span>
          </div>
          <div className="border-r border-b border-white/10 bg-white/5 p-3 text-center">
            <span className="text-xs font-semibold text-white/70 tracking-tight">R2</span>
          </div>
          <div className="border-r border-b border-white/10 bg-white/5 p-3 text-center">
            <span className="text-xs font-semibold text-white/70 tracking-tight">R3</span>
          </div>
          <div className="border-r border-b border-white/10 bg-white/5 p-3 text-center">
            <span className="text-xs font-semibold text-white/70 tracking-tight">R4</span>
          </div>
          <div className="border-b border-white/10 bg-white/5 p-3 text-center">
            <span className="text-xs font-semibold text-white/70 tracking-tight">R5</span>
          </div>
          
          {/* Valores */}
          <div className="border-r border-white/10 p-3 text-center bg-white/5 hover:bg-white/10 transition-colors">
            <span className="font-mono text-lg font-bold text-white">{hlrData.r1}</span>
          </div>
          <div className="border-r border-white/10 p-3 text-center bg-white/5 hover:bg-white/10 transition-colors">
            <span className="font-mono text-lg font-bold text-white">{hlrData.r2}</span>
          </div>
          <div className="border-r border-white/10 p-3 text-center bg-white/5 hover:bg-white/10 transition-colors">
            <span className="font-mono text-lg font-bold text-white">{hlrData.r3}</span>
          </div>
          <div className="border-r border-white/10 p-3 text-center bg-white/5 hover:bg-white/10 transition-colors">
            <span className="font-mono text-lg font-bold text-white">{hlrData.r4}</span>
          </div>
          <div className="p-3 text-center bg-white/5 hover:bg-white/10 transition-colors">
            <span className="font-mono text-lg font-bold text-white">{hlrData.r5}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Card: Tamanhos de Chave */}
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
      <h4 className="font-semibold mb-3 text-sm tracking-tighter text-white/90">
        Tamanhos de Chave
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
          <span className="text-xs font-medium text-white/70">K Length</span>
          <span className="font-mono text-sm font-bold text-white">{hlrData.k_length}</span>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
          <span className="text-xs font-medium text-white/70">CK Length</span>
          <span className="font-mono text-sm font-bold text-white">{hlrData.ck_length}</span>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
          <span className="text-xs font-medium text-white/70">IK Length</span>
          <span className="font-mono text-sm font-bold text-white">{hlrData.ik_length}</span>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
          <span className="text-xs font-medium text-white/70">RES Length</span>
          <span className="font-mono text-sm font-bold text-white">{hlrData.res_length}</span>
        </div>
      </div>
    </div>

    {/* Card: Outros Parâmetros */}
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
      <h4 className="font-semibold mb-3 text-sm tracking-tighter text-white/90">
        Outros Parâmetros
      </h4>
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all">
        <span className="text-xs font-medium text-white/70">Iterações Keccak</span>
        <span className="font-mono text-base font-bold text-white">{hlrData.keccakIterations}</span>
      </div>
    </div>

  </div>
</CollapsibleContent>
      </Collapsible>
    </LiquidGlassCard>
  );
};
