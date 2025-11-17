import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { envConfig } from './config/env.config';
import { SpecTokenGuard } from './auth/auth.guard';
import { CustomExceptionFilter } from './common/exceptions/custom-exception.filter';

// Services
import { ProxyService } from './services/proxy.service';
import { TokenManagerService } from './services/token-manager.service';
import { ContaService } from './services/conta.service';
import { PartnerService } from './services/partner.service';
import { CustomerProfileService } from './services/customer-profile.service';
import { HssService } from './services/hss.service';

// Controllers
import { HssController } from './proxies/hss.controller';
import { ContaController } from './proxies/conta.controller';
import { SummaController } from './proxies/summa.controller';
import { HlrController } from './proxies/hlr.controller';
import { HubController } from './proxies/hub.controller';
import { CustomerController } from './proxies/customer.controller';
import { HealthController } from './proxies/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 segundo
        limit: 10, // 10 requisições por segundo
      },
      {
        name: 'medium',
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requisições por minuto
      },
      {
        name: 'long',
        ttl: 3600000, // 1 hora
        limit: 1000, // 1000 requisições por hora
      },
    ]),

    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get<number>('httpTimeout'),
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    HssController,
    ContaController,
    SummaController,
    HlrController,
    HubController,
    CustomerController,
    HealthController,
  ],
  providers: [
    // Core Services
    ProxyService,
    TokenManagerService,

    // Domain Services
    ContaService,
    PartnerService,
    CustomerProfileService,
    HssService,

    // Exception filter global
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    // Guard global de autenticação
    {
      provide: APP_GUARD,
      useClass: SpecTokenGuard,
    },
    // Guard global de rate limiting
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
