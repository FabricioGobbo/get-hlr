import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { HssService } from '../services/hss.service';
import { HssRequestDto, HssNetworkSubscriberDto } from './dto/hss-request.dto';

/**
 * HssController - HSS API endpoints
 *
 * Single Responsibility: HTTP routing only
 * Thin controller: All business logic delegated to HssService
 * Type Safety: Zero use of 'any' type
 */
@ApiTags('HSS')
@ApiBearerAuth()
@Controller('api/hss')
@UseGuards(SpecTokenGuard)
export class HssController {
  constructor(private readonly hssService: HssService) {}

  /**
   * POST /api/hss
   * Accepts any identifier (IMSI, ICCID, MSISDN)
   */
  @Post()
  @ApiOperation({
    summary: 'Consulta Network Subscriber',
    description: 'Aceita IMSI, ICCID ou MSISDN. Busca dados da conta, extrai MSISDN e consulta HSS.',
  })
  @ApiBody({ type: HssRequestDto })
  async postNetworkSubscriber(@Body() body: HssRequestDto): Promise<unknown> {
    const identifier = body.dados.imsi;
    return this.hssService.queryNetworkSubscriber(identifier);
  }

  /**
   * GET /api/hss/network-subscriber/:imsi
   * Accepts any identifier (IMSI, ICCID, MSISDN)
   */
  @Get('network-subscriber/:imsi')
  @ApiOperation({
    summary: 'Consulta Network Subscriber (GET)',
    description: 'Aceita IMSI, ICCID ou MSISDN. Busca dados da conta, extrai MSISDN e consulta HSS.',
  })
  @ApiParam({
    name: 'imsi',
    description: 'IMSI, ICCID ou MSISDN do assinante',
    example: '724170000559312',
  })
  async getNetworkSubscriber(@Param() params: HssNetworkSubscriberDto): Promise<unknown> {
    return this.hssService.queryNetworkSubscriber(params.imsi);
  }
}
