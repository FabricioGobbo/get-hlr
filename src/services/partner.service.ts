import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from './proxy.service';
import {
  PartnerValidationResponseDto,
  PartnerDataDto,
  ApiResponseDto,
  PartnerTierDadosDto,
} from '../common/dto';

/**
 * Partner program types supported
 */
export type PartnerType = 'pague-menos' | 'ifood' | 'uber';

/**
 * Partner configuration
 */
interface PartnerConfig {
  endpoint: string;
  displayName: string;
  logPrefix: string;
}

/**
 * PartnerService - Handles all partner program validations
 *
 * Single Responsibility: Partner tier validation and lookup
 * DRY: Eliminates duplication of partner validation logic
 * KISS: Simple, focused methods for partner operations
 */
@Injectable()
export class PartnerService {
  private readonly logger = new Logger(PartnerService.name);
  private readonly hubUrl: string;

  /**
   * Partner configuration map (DRY principle)
   * Open/Closed: Easy to add new partners without modifying existing code
   */
  private readonly partnerConfigs: Record<PartnerType, PartnerConfig> = {
    'pague-menos': {
      endpoint: 'pague-menos',
      displayName: 'Pague Menos',
      logPrefix: 'HUB-PGM',
    },
    ifood: {
      endpoint: 'ifood',
      displayName: 'iFood',
      logPrefix: 'HUB-IFOOD',
    },
    uber: {
      endpoint: 'uber',
      displayName: 'Uber',
      logPrefix: 'HUB-UBER',
    },
  };

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.hubUrl = this.configService.get<string>('hubUrl') || '';
  }

  /**
   * Validate customer tier for a specific partner
   * DRY: Single method for all partner validations
   */
  async validateTiers(
    partner: PartnerType,
    msisdn: string,
  ): Promise<PartnerValidationResponseDto> {
    const config = this.partnerConfigs[partner];
    const url = `${this.hubUrl}/surf-hub/${config.endpoint}/validate-tiers`;

    this.logger.log(
      `[${config.logPrefix}] Validating tiers for MSISDN: ${msisdn}`,
    );

    const response = await this.proxyService.get<
      ApiResponseDto<PartnerTierDadosDto>
    >({
      url: `${url}?msisdn=${msisdn}`,
      logPrefix: config.logPrefix,
      requiresAuth: true,
      throwOnHttpError: false, // Don't throw on 404/500 - these are expected responses
    });

    return {
      partner,
      ...response,
    };
  }

  /**
   * Validate customer as collaborator (Pague Menos specific)
   */
  async validateCollaborator(msisdn: string): Promise<ApiResponseDto<PartnerTierDadosDto>> {
    const config = this.partnerConfigs['pague-menos'];
    const url = `${this.hubUrl}/surf-hub/${config.endpoint}/collaborator`;

    this.logger.log(
      `[${config.logPrefix}] Validating collaborator for MSISDN: ${msisdn}`,
    );

    return this.proxyService.get<ApiResponseDto<PartnerTierDadosDto>>({
      url: `${url}?msisdn=${msisdn}`,
      logPrefix: `${config.logPrefix}-COLLAB`,
      requiresAuth: true,
      throwOnHttpError: false, // Don't throw on 404/500 - these are expected responses
    });
  }

  /**
   * Check all partner programs and return first match
   * DRY: Reuses validateTiers for each partner
   */
  async findCustomerPartner(
    msisdn: string,
  ): Promise<PartnerValidationResponseDto | null> {
    const partners: PartnerType[] = ['pague-menos', 'ifood', 'uber'];

    for (const partner of partners) {
      try {
        const result = await this.validateTiers(partner, msisdn);

        if (this.isSuccessfulResponse(result)) {
          this.logger.log(
            `[PARTNER-LOOKUP] Customer found in ${this.partnerConfigs[partner].displayName}`,
          );
          return result;
        }
      } catch (error) {
        this.logger.debug(
          `[PARTNER-LOOKUP] ${this.partnerConfigs[partner].displayName} not found, trying next...`,
        );
      }
    }

    this.logger.log(`[PARTNER-LOOKUP] Customer not found in any partner program`);
    return null;
  }

  /**
   * Route to specific partner based on MVNO - STRICT routing, NO fallback
   * Single Responsibility: Partner routing logic
   *
   * Business Rule: MVNO directly maps to partner program
   * - UBER CHIP → Uber API only
   * - iFood → iFood API only
   * - Pague Menos Celular → Pague Menos API only
   * - Unknown MVNO → null (no partner data)
   *
   * IMPORTANT: Does NOT throw exceptions. Returns structured response even on API errors.
   */
  async validateByMvno(
    mvno: string,
    msisdn: string,
  ): Promise<PartnerValidationResponseDto | null> {
    const normalizedMvno = mvno.toLowerCase();

    this.logger.log(
      `[PARTNER-ROUTING] MVNO detected: ${mvno}, routing to specific partner API...`,
    );

    let partner: PartnerType | null = null;

    // Strict MVNO-to-partner mapping
    if (normalizedMvno.includes('ifood')) {
      partner = 'ifood';
    } else if (normalizedMvno.includes('pague menos')) {
      partner = 'pague-menos';
    } else if (normalizedMvno.includes('uber')) {
      partner = 'uber';
    }

    // If no matching partner, return null (no fallback)
    if (!partner) {
      this.logger.log(
        `[PARTNER-ROUTING] MVNO "${mvno}" does not match any known partner - skipping partner lookup`,
      );
      return null;
    }

    // Call only the matching partner API (NO fallback to other partners)
    // Returns structured response even on errors (404, 500, etc.)
    this.logger.log(
      `[PARTNER-ROUTING] MVNO matches ${this.partnerConfigs[partner].displayName} - calling ONLY this partner API`,
    );

    return this.validateTiersWithFallback(partner, msisdn);
  }

  /**
   * Transform Hub API response to standardized partner data
   * Single Responsibility: Data transformation
   */
  transformToPartnerData(
    response: PartnerValidationResponseDto | null,
    msisdn: string | null,
    mvno?: string | null,
  ): PartnerDataDto {
    if (!response || !this.isSuccessfulResponse(response)) {
      // Build friendly message based on context
      let message: string;

      if (!msisdn) {
        message = 'MSISDN não disponível para consulta de parceiros';
      } else if (mvno && response?.partner) {
        // MVNO detected, partner API called but customer not found
        const partnerName = this.partnerConfigs[response.partner]?.displayName || response.partner;
        message = `Cliente com MVNO "${mvno}" não está cadastrado no programa ${partnerName}`;
      } else if (mvno) {
        // MVNO detected but no matching partner
        message = `MVNO "${mvno}" não corresponde a nenhum programa parceiro disponível`;
      } else {
        // Generic fallback
        message = 'Cliente não encontrado em programas parceiros';
      }

      return {
        found: false,
        program: response?.partner || null,
        message,
      };
    }

    return {
      found: true,
      program: response.partner,
      tier: response.resultado.dados,
    };
  }

  /**
   * Helper: Check if response is successful
   * KISS: Simple validation logic
   */
  private isSuccessfulResponse(
    response: PartnerValidationResponseDto,
  ): boolean {
    return (
      response?.resultado?.codigoHttp === 200 &&
      response?.resultado?.dados !== undefined
    );
  }

  /**
   * Helper: Validate tiers without throwing exceptions
   * DRY: Reusable validation wrapper
   *
   * Returns a response object with partner info even on failure (404, 500, etc.),
   * so we can provide better error messages to the user.
   * DOES NOT throw exceptions - always returns a response object.
   *
   * Note: Since validateTiers uses throwOnHttpError=false, it already returns
   * structured responses for errors (404, 500, etc.) without throwing.
   */
  private async validateTiersWithFallback(
    partner: PartnerType,
    msisdn: string,
  ): Promise<PartnerValidationResponseDto> {
    const result = await this.validateTiers(partner, msisdn);

    // Log if the partner API returned an error (for monitoring)
    if (result.resultado?.codigoHttp !== 200) {
      this.logger.log(
        `[PARTNER-ROUTING] ${this.partnerConfigs[partner].displayName} returned HTTP ${result.resultado?.codigoHttp}: ${result.resultado?.mensagem}`,
      );
    }

    return result;
  }
}
