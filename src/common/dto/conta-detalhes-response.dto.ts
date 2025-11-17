/**
 * Conta API response structure
 * Note: Data is directly in 'resultado', not nested in 'resultado.dados'
 */
export interface ContaDadosDto {
  // Identifiers
  nuMsisdn?: number | string;
  msisdn?: number | string;
  nuImsi?: number | string;
  imsi?: number | string;
  nuIccid?: string;
  iccid?: string;
  coMsisdn?: number;

  // MVNO info
  noMvno?: string;
  mvno?: string;
  coMvno?: number;
  noSubmvno?: string;
  coSubmvno?: number;

  // Plan info
  noPlano?: string;
  coPlano?: number;
  dtPlanoExpira?: string;

  // Customer info
  nuDocumento?: string;
  cpf?: string;
  cnpj?: string;
  nome?: string;
  email?: string;

  // Status
  noMsisdnStatus?: string;
  status?: string;
  stPortin?: number;
  dtPortin?: string;
  dtPortout?: string | null;

  // Balance and usage
  vlSaldo?: number;
  qtDadoRestante?: number;
  qtMinutoRestante?: number;
  qtSmsRestante?: number;
  qtConsumoDado?: number;
  qtConsumoVoz?: number;
  qtConsumoSMS?: number;

  // Dates
  dtAtivacao?: string;
  dtValidade?: string | null;
  dtUltimaRecarga?: string;

  // Blocks
  stBloqueioVozOriginada?: number;
  stBloqueioSmsOriginado?: number;
  stBloqueioDado?: number;
  stBloqueioConsumo?: number;
  stBloqueioChip?: number;
  stBloqueioVozTerminada?: number;
  dtBloqueioVozTerminada?: string;

  // Other
  dsObservacao?: string;
  stInadimplencia?: number;
  stBlackFriday?: number;
  stMsisdnGold?: number | null;
  nuPin1?: string;
  nuPuk1?: string;
  nuPin2?: string;
  nuPuk2?: string;

  [key: string]: unknown; // Allow additional fields from spec-conta
}

/**
 * Response from Conta API
 * Data is directly in resultado, not nested
 */
export interface ContaDetalhesResponseDto {
  sucesso?: number;
  transacao?: string;
  resultado: ContaDadosDto;
  transaction?: {
    globalTransactionId?: string;
    localTransactionId?: string;
    localTransactionDate?: string;
  };
}
