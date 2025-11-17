import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { CustomerProfileService } from '../services/customer-profile.service';
import { CustomerProfileResponseDto } from '../common/dto';
import { sanitizeMsisdn } from '../common/utils';

/**
 * CustomerController - Unified customer data endpoint
 *
 * Single Responsibility: HTTP routing for customer operations
 * Thin controller: Delegates all business logic to CustomerProfileService
 * KISS: Simple, focused on HTTP concerns only
 *
 * Provides complete customer profile by combining:
 * 1. Account details from BFF's Conta service (accepts MSISDN, IMSI, or ICCID)
 * 2. Partner tier data from Hub API (requires MSISDN)
 */
@ApiTags('Customer')
@ApiBearerAuth()
@Controller('api/customer')
@UseGuards(SpecTokenGuard)
export class CustomerController {
  constructor(
    private readonly customerProfileService: CustomerProfileService,
  ) {}

  /**
   * Get complete customer profile (Account + Partner Tier)
   * Accepts ANY identifier type: MSISDN, IMSI, or ICCID
   *
   * KISS: Simple controller method that delegates to service
   * Single Responsibility: HTTP routing only
   */
  @Get(':identifier/complete-profile')
  @ApiOperation({
    summary: 'Obtém perfil completo do cliente (Conta + Parceiros)',
    description:
      'Aceita MSISDN, IMSI ou ICCID. Retorna dados da conta spec-conta e informações de programas parceiros (Pague Menos/iFood/Uber) em uma única chamada. Primeiro busca os dados da conta, extrai o MSISDN e então consulta os programas parceiros.',
  })
  @ApiParam({
    name: 'identifier',
    description:
      'MSISDN (13 dígitos: 5511999999999), IMSI (15 dígitos: 724031234567890) ou ICCID (começa com 89)',
    examples: {
      msisdn: {
        value: '5511999999999',
        description: 'MSISDN - Número de telefone',
      },
      imsi: { value: '724031234567890', description: 'IMSI - SIM card ID' },
      iccid: {
        value: '8955080220123456789',
        description: 'ICCID - SIM card number',
      },
    },
  })
  async getCompleteProfile(
    @Param('identifier') identifier: string,
  ): Promise<CustomerProfileResponseDto> {
    // Sanitize the identifier to remove spaces, parentheses, hyphens, etc.
    const sanitizedIdentifier = sanitizeMsisdn(identifier);
    return this.customerProfileService.getCompleteProfile(sanitizedIdentifier);
  }
}
