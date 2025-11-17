import { ApiResponseDto } from './resultado.dto';

/**
 * Partner tier/medal data
 */
export interface PartnerTierDadosDto {
  tier?: string;
  medalha?: string;
  acumulado?: number;
  proximaMeta?: number;
  beneficios?: string[];
  isCollaborator?: boolean;
  [key: string]: unknown; // Allow additional partner-specific fields
}

/**
 * Partner validation response with partner identification
 */
export interface PartnerValidationResponseDto extends ApiResponseDto<PartnerTierDadosDto> {
  partner: 'pague-menos' | 'ifood' | 'uber';
}

/**
 * Standardized partner data for customer profile
 */
export interface PartnerDataDto {
  found: boolean;
  program: 'pague-menos' | 'ifood' | 'uber' | null;
  tier?: PartnerTierDadosDto;
  message?: string;
}
