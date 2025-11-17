import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { ProxyService } from '../services/proxy.service';
import { HlrRequestDto } from './dto/hlr-request.dto';

/**
 * HlrController - HLR API endpoints
 *
 * Single Responsibility: HTTP routing only
 * Thin controller: Simple proxy to HLR API
 */
@ApiTags('HLR')
@ApiBearerAuth()
@Controller('api/hlr')
@UseGuards(SpecTokenGuard)
export class HlrController {
  private readonly logger = new Logger(HlrController.name);
  private readonly hlrUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.hlrUrl = this.configService.getOrThrow<string>('hlrUrl');
  }

  @Post()
  @ApiOperation({ summary: 'Proxy para API HLR' })
  async proxy(@Body() body: HlrRequestDto): Promise<unknown> {
    this.logger.log('[HLR] Proxy request received');
    return this.proxyService.post({
      url: this.hlrUrl,
      body,
      logPrefix: 'HLR',
      requiresAuth: true,
    });
  }
}
