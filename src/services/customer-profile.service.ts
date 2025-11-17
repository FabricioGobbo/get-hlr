import { Injectable, Logger } from '@nestjs/common';
import { ContaService } from './conta.service';
import { PartnerService } from './partner.service';
import { BusinessException } from '../common/exceptions/business.exception';
import {
  CustomerProfileResponseDto,
  IdentifierType,
  ContaDetalhesResponseDto,
  ContaDadosDto,
} from '../common/dto';
import { extractMsisdnFromConta } from '../common/utils';

/**
 * CustomerProfileService - Orchestrates customer profile retrieval
 *
 * Single Responsibility: Coordinate data from multiple sources
 * Separation of Concerns: Controllers handle HTTP, this service handles business logic
 * KISS: Clear, focused methods for each step of the process
 */
@Injectable()
export class CustomerProfileService {
  private readonly logger = new Logger(CustomerProfileService.name);

  constructor(
    private readonly contaService: ContaService,
    private readonly partnerService: PartnerService,
  ) {}

  /**
   * Get complete customer profile by identifier
   * KISS: Single entry point, delegates to smaller methods
   *
   * Flow:
   * 1. Fetch CONTA data to get MVNO
   * 2. Use MVNO to route to specific partner API (NO fallback)
   */
  async getCompleteProfile(
    identifier: string,
  ): Promise<CustomerProfileResponseDto> {
    this.logger.log(
      `[CUSTOMER-PROFILE] Request for identifier: ${identifier}`,
    );

    const identifierType = this.detectIdentifierType(identifier);

    // Step 1: Fetch CONTA data first (need MVNO for partner routing)
    const contaData = await this.fetchContaData(identifier);

    // Step 2: Extract MSISDN (needed for partner API calls)
    const msisdn = identifierType === 'msisdn'
      ? identifier
      : extractMsisdnFromConta(contaData);

    // Step 3: Fetch partner data using STRICT MVNO routing
    const partnerData = await this.fetchPartnerData(msisdn, contaData);

    // Validate we have at least some data
    this.validateHasData(contaData, partnerData, identifier);

    // Build and return the response
    return this.buildCustomerProfile(
      identifier,
      identifierType,
      contaData,
      partnerData,
      msisdn,
    );
  }

  /**
   * Fetch CONTA data (needed to get MVNO for partner routing)
   * Single Responsibility: CONTA API data fetching
   */
  private async fetchContaData(
    identifier: string,
  ): Promise<ContaDetalhesResponseDto | null> {
    try {
      return await this.contaService.getDetalhes(identifier);
    } catch (error) {
      this.logger.warn(
        `[CUSTOMER-PROFILE] Conta API failed for identifier ${identifier}`,
        error,
      );
      return null;
    }
  }

  /**
   * Fetch partner data using STRICT MVNO routing - NO fallback
   * Single Responsibility: Partner data fetching logic
   *
   * Business Rule: Only call partner API if MVNO matches a known partner
   * - UBER CHIP → Uber API only
   * - iFood → iFood API only
   * - Pague Menos Celular → Pague Menos API only
   * - No MVNO or unknown MVNO → No partner data
   */
  private async fetchPartnerData(
    msisdn: string | null,
    contaData: ContaDetalhesResponseDto | null,
  ): Promise<Awaited<ReturnType<typeof this.partnerService.validateByMvno>> | null> {
    if (!msisdn) {
      this.logger.log(
        `[CUSTOMER-PROFILE] No MSISDN available, skipping partner lookup`,
      );
      return null;
    }

    // Extract MVNO from conta data
    const mvno = contaData?.resultado ? this.extractMvno(contaData.resultado) : null;

    if (!mvno) {
      this.logger.log(
        `[CUSTOMER-PROFILE] No MVNO available, skipping partner lookup`,
      );
      return null;
    }

    this.logger.log(
      `[CUSTOMER-PROFILE] MVNO: ${mvno}, routing to partner API...`,
    );

    try {
      // Strict MVNO routing - only calls the matching partner API, NO fallback
      return await this.partnerService.validateByMvno(mvno, msisdn);
    } catch (error) {
      this.logger.warn(
        `[CUSTOMER-PROFILE] Partner lookup failed for MVNO ${mvno}`,
        error,
      );
      return null;
    }
  }

  /**
   * Extract MVNO from conta data
   * Single Responsibility: MVNO extraction logic
   */
  private extractMvno(dados: ContaDadosDto | null): string | null {
    if (!dados) {
      return null;
    }
    const mvno = dados.noMvno || dados.mvno;
    return mvno ? String(mvno) : null;
  }

  /**
   * Detect identifier type based on format
   * KISS: Simple heuristic-based detection
   */
  private detectIdentifierType(identifier: string): IdentifierType {
    const digits = identifier.replace(/\D/g, '');

    // ICCID: starts with 89, typically 19-20 digits
    if (digits.startsWith('89') && digits.length >= 18) {
      return 'iccid';
    }

    // IMSI: 14-15 digits
    if (digits.length === 15 || digits.length === 14) {
      return 'imsi';
    }

    // MSISDN: 12-13 digits, starts with country code (55 for Brazil)
    if (
      (digits.length === 13 || digits.length === 12) &&
      digits.startsWith('55')
    ) {
      return 'msisdn';
    }

    return 'unknown';
  }

  /**
   * Validate that we have at least CONTA data to return
   * Partner data is optional - only fails if CONTA data is missing
   * KISS: Simple validation
   */
  private validateHasData(
    contaData: ContaDetalhesResponseDto | null,
    partnerData: Awaited<ReturnType<typeof this.partnerService.validateByMvno>> | null,
    identifier: string,
  ): void {
    if (!contaData) {
      this.logger.error(
        `[CUSTOMER-PROFILE] No CONTA data available for identifier ${identifier}`,
      );
      throw BusinessException.notFound(
        `Não foi possível recuperar dados da conta para o identificador ${identifier}`,
      );
    }

    // Partner data is optional - log but don't fail
    if (!partnerData) {
      this.logger.log(
        `[CUSTOMER-PROFILE] No partner data available, returning CONTA data only`,
      );
    }
  }

  /**
   * Build the final customer profile response
   * Single Responsibility: Response construction
   * Maintains backwards compatibility with original API structure
   */
  private buildCustomerProfile(
    identifier: string,
    identifierType: IdentifierType,
    contaData: ContaDetalhesResponseDto | null,
    partnerData: Awaited<ReturnType<typeof this.partnerService.validateByMvno>> | null,
    msisdn: string | null,
  ): CustomerProfileResponseDto {
    // Extract MVNO for better error messages
    const mvno = contaData?.resultado ? this.extractMvno(contaData.resultado) : null;

    return {
      identifier: {
        type: identifierType,
        value: identifier,
      },
      account: contaData,  // Return direct Conta API response (backwards compatible)
      partner: this.partnerService.transformToPartnerData(partnerData, msisdn, mvno),
      transacao: {
        id: this.generateTransactionId(),
        datetime: new Date().toISOString(),
      },
    };
  }

  /**
   * Generate unique transaction ID
   * KISS: Simple ID generator
   */
  private generateTransactionId(): string {
    return `${Date.now().toString(36)}${Math.random().toString(36).substring(2, 9)}`;
  }
}
