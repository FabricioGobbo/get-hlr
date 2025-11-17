import { IsNotEmpty, IsObject, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para requisições Hub (POST)
 * Define a estrutura esperada para chamadas à API Hub
 */
export class HubRequestDto {
  @ApiProperty({
    description: 'Dados da requisição Hub',
    example: { operation: 'sync', data: {} },
  })
  @IsNotEmpty({ message: 'Dados são obrigatórios' })
  @IsObject({ message: 'Dados devem ser um objeto' })
  dados: Record<string, unknown>;
}

/**
 * DTO for Hub API tier validation query parameters
 * Validates MSISDN format
 */
export class ValidateTiersQueryDto {
  @ApiProperty({
    description: 'Número de telefone do cliente (formato MSISDN com DDI)',
    example: '5511999999999',
    pattern: '^55\\d{10,11}$',
  })
  @IsNotEmpty({ message: 'MSISDN é obrigatório' })
  @IsString({ message: 'MSISDN deve ser uma string' })
  @Matches(/^55\d{10,11}$/, {
    message: 'MSISDN deve estar no formato 5511999999999 (DDI 55 + DDD + número)',
  })
  msisdn: string;
}
