import { useState, FormEvent } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { LiquidGlassInput } from "@/components/ui/LiquidGlassInput";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (phoneNumber: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.length === 11;
  };

  const handleInputChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhoneNumber(formatted);
    if (formatted.length > 0) {
      setIsValid(validatePhoneNumber(formatted));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSearch(phoneNumber);
    }
  };

  return (
    <LiquidGlassCard className="max-w-2xl mx-auto animate-float">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Consulta de Assinante
          </h2>
          <p className="text-muted-foreground tracking-tight">
            Digite o número de telefone para consultar o status
          </p>
        </div>

        <div className="relative">
          <LiquidGlassInput
            type="text"
            placeholder="(11) 98765-4321"
            value={phoneNumber}
            onChange={(e) => handleInputChange(e.target.value)}
            success={isValid === true}
            error={isValid === false}
            maxLength={15}
            className="text-lg pr-12"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <LiquidGlassButton
          type="submit"
          variant="primary"
          loading={loading}
          disabled={!isValid}
          className="w-full text-lg"
        >
          Buscar Status
        </LiquidGlassButton>
      </form>
    </LiquidGlassCard>
  );
};
