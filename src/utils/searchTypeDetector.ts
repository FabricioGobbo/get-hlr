export type SearchType = {
  type: 'MSISDN' | 'IMSI' | 'ICCID' | 'UNKNOWN';
  value: string;
  icon: string;
  label: string;
};

export const detectSearchType = (input: string): SearchType => {
  const cleaned = input.replace(/\D/g, '');
  
  if (cleaned.length >= 19 && cleaned.length <= 20) {
    return { 
      type: 'ICCID', 
      value: cleaned, 
      icon: '💳',
      label: 'Número do Cartão SIM'
    };
  }
  
  if (cleaned.length === 15) {
    return { 
      type: 'IMSI', 
      value: cleaned, 
      icon: '📡',
      label: 'Identificador do Chip na Rede'
    };
  }
  
  if (cleaned.length >= 10 && cleaned.length <= 13) {
    return { 
      type: 'MSISDN', 
      value: cleaned, 
      icon: '📞',
      label: 'Número do Telefone'
    };
  }
  
  return { 
    type: 'UNKNOWN', 
    value: cleaned, 
    icon: '❓',
    label: 'Formato Desconhecido'
  };
};
