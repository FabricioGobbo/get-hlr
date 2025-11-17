import { TransacaoDto } from './transacao.dto';
import { ContaDetalhesResponseDto } from './conta-detalhes-response.dto';
import { PartnerDataDto } from './partner-tier-response.dto';

/**
 * Identifier types supported by the system
 */
export type IdentifierType = 'msisdn' | 'imsi' | 'iccid' | 'unknown';

/**
 * Identifier information in customer profile
 */
export interface IdentifierInfoDto {
  type: IdentifierType;
  value: string;
}

/**
 * Complete customer profile response
 * Maintains backwards compatibility with original API structure
 */
export interface CustomerProfileResponseDto {
  identifier: IdentifierInfoDto;
  account: ContaDetalhesResponseDto | null;  // Direct Conta API response (backwards compatible)
  partner: PartnerDataDto;
  transacao: TransacaoDto;
}
