import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { TokenManagerService } from '../services/token-manager.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly tokenManager: TokenManagerService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check with authentication status' })
  check() {
    const tokenStatus = this.tokenManager.getTokenStatus();

    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'hlr-service-bff',
      authentication: {
        ...tokenStatus,
        status: tokenStatus.hasToken ? 'AUTHENTICATED' : 'NO_TOKEN',
      },
    };
  }
}
