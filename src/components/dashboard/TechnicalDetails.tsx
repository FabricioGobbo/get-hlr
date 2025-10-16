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
            <div>
              <h4 className="font-semibold mb-2 text-muted-foreground tracking-tight">
                Parâmetros MILENAGE
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R1:</span>
                  <span className="font-mono">{hlrData.r1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R2:</span>
                  <span className="font-mono">{hlrData.r2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R3:</span>
                  <span className="font-mono">{hlrData.r3}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R4:</span>
                  <span className="font-mono">{hlrData.r4}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R5:</span>
                  <span className="font-mono">{hlrData.r5}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-muted-foreground tracking-tight">
                Tamanhos de Chave
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">K Length:</span>
                  <span className="font-mono">{hlrData.k_length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CK Length:</span>
                  <span className="font-mono">{hlrData.ck_length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IK Length:</span>
                  <span className="font-mono">{hlrData.ik_length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RES Length:</span>
                  <span className="font-mono">{hlrData.res_length}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-muted-foreground tracking-tight">Outros</h4>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Iterações Keccak:</span>
                <span className="font-mono">{hlrData.keccakIterations}</span>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </LiquidGlassCard>
  );
};
