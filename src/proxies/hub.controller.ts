import { Controller, Get, Query, UseGuards, Logger } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { PartnerService } from '../services/partner.service';
import {
  PartnerValidationResponseDto,
  ApiResponseDto,
  PartnerTierDadosDto,
} from '../common/dto';
import { ValidateTiersQueryDto } from './dto/hub-request.dto';
import { sanitizeMsisdn } from '../common/utils';

/**
 * HubController - Surf-HUB API endpoints
 *
 * Single Responsibility: HTTP routing for partner operations
 * Thin controller: Delegates to PartnerService
 * DRY: Eliminated code duplication
 * Type Safety: Uses proper DTOs with validation
 */
@ApiTags('Surf-HUB')
@ApiBearerAuth()
@Controller('api/hub')
@UseGuards(SpecTokenGuard)
export class HubController {
  private readonly logger = new Logger(HubController.name);

  constructor(private readonly partnerService: PartnerService) {}

  /**
   * Pague Menos - Validate customer tier/medal status
   */
  @Get('pague-menos/validate-tiers')
  @ApiOperation({
    summary: 'Valida tier/medalha do cliente no programa Pague Menos',
    description:
      'Retorna status de medalha, acumulado e próxima meta do cliente no programa de fidelidade Pague Menos',
  })
  async validatePagueMenosTiers(
    @Query() query: ValidateTiersQueryDto,
  ): Promise<PartnerValidationResponseDto> {
    const sanitizedMsisdn = sanitizeMsisdn(query.msisdn);
    this.logger.log(`[PAGUE-MENOS] Validating tiers for MSISDN: ${sanitizedMsisdn}`);
    return this.partnerService.validateTiers('pague-menos', sanitizedMsisdn);
  }

  /**
   * Pague Menos - Validate if customer is a collaborator/employee
   */
  @Get('pague-menos/collaborator')
  @ApiOperation({
    summary: 'Valida se cliente é colaborador Pague Menos',
    description:
      'Verifica se o cliente é funcionário/colaborador da rede Pague Menos',
  })
  async validatePagueMenosCollaborator(
    @Query() query: ValidateTiersQueryDto,
  ): Promise<ApiResponseDto<PartnerTierDadosDto>> {
    const sanitizedMsisdn = sanitizeMsisdn(query.msisdn);
    this.logger.log(`[PAGUE-MENOS] Validating collaborator for MSISDN: ${sanitizedMsisdn}`);
    return this.partnerService.validateCollaborator(sanitizedMsisdn);
  }

  /**
   * iFood - Validate customer tier status
   */
  @Get('ifood/validate-tiers')
  @ApiOperation({
    summary: 'Valida tier do cliente no programa iFood',
    description: 'Retorna status de tier do cliente no programa iFood',
  })
  async validateIFoodTiers(
    @Query() query: ValidateTiersQueryDto,
  ): Promise<PartnerValidationResponseDto> {
    const sanitizedMsisdn = sanitizeMsisdn(query.msisdn);
    this.logger.log(`[IFOOD] Validating tiers for MSISDN: ${sanitizedMsisdn}`);
    return this.partnerService.validateTiers('ifood', sanitizedMsisdn);
  }

  /**
   * Uber - Validate customer tier status
   */
  @Get('uber/validate-tiers')
  @ApiOperation({
    summary: 'Valida tier do cliente no programa UBER',
    description: 'Retorna status de tier do cliente no programa UBER',
  })
  async validateUber(
    @Query() query: ValidateTiersQueryDto,
  ): Promise<PartnerValidationResponseDto> {
    const sanitizedMsisdn = sanitizeMsisdn(query.msisdn);
    this.logger.log(`[UBER] Validating tiers for MSISDN: ${sanitizedMsisdn}`);
    return this.partnerService.validateTiers('uber', sanitizedMsisdn);
  }

  /**
   * Validate customer in all partner programs
   * KISS: Simple orchestration, delegates to PartnerService
   */
  @Get('validate-partner-tiers')
  @ApiOperation({
    summary: 'Valida tier do cliente em TODOS os programas parceiros',
    description:
      'Verifica Pague Menos, iFood e Uber sequencialmente e retorna o programa onde o cliente está cadastrado. Use este endpoint quando não souber qual programa o cliente participa.',
  })
  async validateAllPartnerTiers(
    @Query() query: ValidateTiersQueryDto,
  ): Promise<PartnerValidationResponseDto | ApiResponseDto<null>> {
    const sanitizedMsisdn = sanitizeMsisdn(query.msisdn);
    this.logger.log(`[ALL-PARTNERS] Searching for customer across all programs: ${sanitizedMsisdn}`);

    const result = await this.partnerService.findCustomerPartner(sanitizedMsisdn);

    if (result) {
      this.logger.log(`[ALL-PARTNERS] Customer found in ${result.partner} program`);
      return result;
    }

    this.logger.log(`[ALL-PARTNERS] Customer not found in any partner program`);

    // No partner found - return 404 response
    return {
      resultado: {
        codigoHttp: 404,
        mensagem: `Cliente com MSISDN ${sanitizedMsisdn} não encontrado em nenhum programa parceiro (Pague Menos | iFood | UBER)`,
        transacao: {
          id: Date.now().toString(36),
          datetime: new Date().toISOString(),
        },
      },
    };
  }
}
