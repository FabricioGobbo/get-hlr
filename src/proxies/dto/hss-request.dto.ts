import { IsNotEmpty, IsString, Matches, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para dados internos da requisição HSS
 */
class HssRequestDadosDto {
  @ApiProperty({
    description: 'Identificador do assinante (IMSI, ICCID ou MSISDN)',
    example: '724170000559312',
  })
  @IsNotEmpty({ message: 'Identificador (imsi) é obrigatório' })
  @IsString({ message: 'Identificador deve ser uma string' })
  imsi: string;
}

/**
 * DTO para requisições HSS (POST)
 * Type Safety: Estrutura tipada corretamente
 */
export class HssRequestDto {
  @ApiProperty({
    description: 'Dados da requisição contendo o identificador',
    type: HssRequestDadosDto,
  })
  @ValidateNested()
  @Type(() => HssRequestDadosDto)
  dados: HssRequestDadosDto;
}

/**
 * DTO para requisições HSS Network Subscriber (GET)
 * Valida o formato do IMSI
 */
export class HssNetworkSubscriberDto {
  @ApiProperty({
    description: 'IMSI do assinante (14-15 dígitos numéricos)',
    example: '724031234567890',
    minLength: 14,
    maxLength: 15,
  })
  @IsNotEmpty({ message: 'IMSI é obrigatório' })
  @IsString({ message: 'IMSI deve ser uma string' })
  @Length(14, 15, { message: 'IMSI deve conter 14-15 dígitos' })
  @Matches(/^[0-9]{14,15}$/, {
    message: 'IMSI deve conter apenas dígitos numéricos',
  })
  imsi: string;
}
