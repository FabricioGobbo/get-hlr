import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SpecTokenGuard } from '../auth/auth.guard';
import { ProxyService } from '../services/proxy.service';
import { SummaRequestDto } from './dto/summa-request.dto';

/**
 * SummaController - Summa API endpoints
 *
 * Single Responsibility: HTTP routing only
 * Thin controller: Simple proxy to Summa API
 */
@ApiTags('Summa')
@ApiBearerAuth()
@Controller('api/summa')
@UseGuards(SpecTokenGuard)
export class SummaController {
  private readonly logger = new Logger(SummaController.name);
  private readonly summaUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.summaUrl = this.configService.getOrThrow<string>('summaUrl');
  }

  @Post()
  @ApiOperation({ summary: 'Proxy para API Summa' })
  async proxy(@Body() body: SummaRequestDto): Promise<unknown> {
    this.logger.log('[SUMMA] Proxy request received');
    return this.proxyService.post({
      url: this.summaUrl,
      body,
      logPrefix: 'SUMMA',
      requiresAuth: true,
    });
  }
}
