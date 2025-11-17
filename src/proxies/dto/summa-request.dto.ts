import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para requisições Summa
 * Define a estrutura esperada para chamadas à API Summa
 */
export class SummaRequestDto {
  @ApiProperty({
    description: 'Dados da requisição Summa',
    example: { action: 'query', parameters: {} },
  })
  @IsNotEmpty({ message: 'Dados são obrigatórios' })
  @IsObject({ message: 'Dados devem ser um objeto' })
  dados: Record<string, unknown>;
}
