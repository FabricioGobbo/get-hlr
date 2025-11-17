import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para requisições HLR
 * Define a estrutura esperada para chamadas à API HLR
 */
export class HlrRequestDto {
  @ApiProperty({
    description: 'Dados da requisição HLR',
    example: { msisdn: '5511999999999', operation: 'query' },
  })
  @IsNotEmpty({ message: 'Dados são obrigatórios' })
  @IsObject({ message: 'Dados devem ser um objeto' })
  dados: Record<string, unknown>;
}
