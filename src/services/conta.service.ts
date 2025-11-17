import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from './proxy.service';
import { ContaDetalhesResponseDto } from '../common/dto';

/**
 * ContaService - Service for handling Conta API calls
 *
 * Single Responsibility: Conta API interactions
 * Type Safety: Uses proper DTOs instead of unknown
 */
@Injectable()
export class ContaService {
  private readonly contaUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.contaUrl = this.configService.getOrThrow<string>('contaUrl');
  }

  /**
   * Get account details by identifier (MSISDN, IMSI, ICCID, CPF/CNPJ)
   *
   * @param id - Account identifier
   * @returns Account details from spec-conta API
   */
  async getDetalhes(id: string): Promise<ContaDetalhesResponseDto> {
    const url = `${this.contaUrl}/conta/${id}/detalhes`;

    return this.proxyService.get<ContaDetalhesResponseDto>({
      url,
      logPrefix: 'CONTA',
      requiresAuth: true,
    });
  }
}
