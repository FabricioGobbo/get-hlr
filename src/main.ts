import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("port") || 3001;

  // Configuração de CORS
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  });

  // Validação global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle("HLR Service BFF")
    .setDescription(
      "Backend for Frontend - APIs de Telecom e Programas Parceiros"
    )
    .setVersion("1.0")
    .addBearerAuth()
    .addTag(
      "Customer",
      "Perfil Completo do Cliente - Unified endpoint (Conta + Parceiros)"
    )
    .addTag("HSS", "Operações da API HSS (handler-prov-hss)")
    .addTag("Conta", "Operações da API Conta (spec-conta)")
    .addTag("Summa", "Operações da API Summa")
    .addTag("HLR", "Operações da API HLR")
    .addTag(
      "Surf-HUB",
      "Operações da API Surf-HUB - Programas Parceiros (Pague Menos, iFood)"
    )
    .addTag("Health", "Health Check")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api-docs", app, document);

  logger.log("Swagger disponível em: /api-docs");

  // Inicia o servidor
  await app.listen(port);

  logger.log(`Aplicação rodando na porta ${port}`);
  logger.log(`Health check: http://localhost:${port}/health`);
  logger.log(`Swagger UI: http://localhost:${port}/api-docs`);
}

bootstrap();
