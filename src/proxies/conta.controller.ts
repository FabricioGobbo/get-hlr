import { Controller, Get, Param, UseGuards, Logger } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { ContaService } from '../services/conta.service';
import { ContaDetalhesResponseDto } from '../common/dto';
import { sanitizeMsisdn } from '../common/utils';

/**
 * ContaController - Handles Conta API endpoints
 *
 * Single Responsibility: HTTP routing for conta operations
 * Thin controller: Delegates to ContaService
 * Type Safety: Uses proper DTOs
 */
@ApiTags('Conta')
@ApiBearerAuth()
@Controller('api/conta')
@UseGuards(SpecTokenGuard)
export class ContaController {
  private readonly logger = new Logger(ContaController.name);

  constructor(private readonly contaService: ContaService) {}

  @Get(':id/detalhes')
  @ApiOperation({
    summary: 'Consulta detalhes da conta por ID',
    description: 'Retorna informações detalhadas da conta via spec-conta',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da conta (MSISDN, CPF/CNPJ ou identificador único)',
    example: '5511999999999',
  })
  async getDetalhes(@Param('id') id: string): Promise<ContaDetalhesResponseDto> {
    const sanitizedId = sanitizeMsisdn(id);
    this.logger.log(`[CONTA] Fetching details for ID: ${sanitizedId}`);
    return this.contaService.getDetalhes(sanitizedId);
  }
}
