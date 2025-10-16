import { useState, FormEvent } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassInput } from "@/components/ui/LiquidGlassInput";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import { LiquidGlassBadge } from "@/components/ui/LiquidGlassBadge";
import { Search } from "lucide-react";
import { detectSearchType } from "@/utils/searchTypeDetector";

interface SearchBarProps {
  onSearch: (searchValue: string, searchType: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [detectedType, setDetectedType] = useState<ReturnType<typeof detectSearchType> | null>(null);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    if (value.length > 0) {
      const type = detectSearchType(value);
      setDetectedType(type);
    } else {
      setDetectedType(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (detectedType && detectedType.type !== 'UNKNOWN') {
      onSearch(searchValue, detectedType.type);
    }
  };

  const isValid = detectedType && detectedType.type !== 'UNKNOWN';

  return (
    <LiquidGlassCard className="max-w-2xl mx-auto animate-float">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Consulta de Assinante
          </h2>
          <p className="text-muted-foreground tracking-tight text-sm">
            Digite MSISDN, IMSI ou ICCID para consultar o status
          </p>
          <p className="text-xs text-muted-foreground tracking-tight mt-1">
            Ex: +55 11 99999-9999 | 724110123456789 | 8955170000123389877
          </p>
        </div>

        <div className="relative">
          <LiquidGlassInput
            type="text"
            placeholder="Digite o número..."
            value={searchValue}
            onChange={(e) => handleInputChange(e.target.value)}
            success={isValid}
            error={detectedType?.type === 'UNKNOWN'}
            className="text-lg pr-12"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          
          {detectedType && (
            <div className="mt-2">
              <LiquidGlassBadge 
                variant={detectedType.type === 'UNKNOWN' ? 'error' : 'info'}
                className="text-xs"
              >
                {detectedType.icon} {detectedType.label}
              </LiquidGlassBadge>
            </div>
          )}
        </div>

        <LiquidGlassButton
          type="submit"
          variant="primary"
          loading={loading}
          disabled={!isValid}
          className="w-full text-lg hover:shadow-glow-blue"
        >
          Buscar Status
        </LiquidGlassButton>
      </form>
    </LiquidGlassCard>
  );
};
