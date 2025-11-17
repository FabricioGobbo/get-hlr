import { TransacaoDto } from './transacao.dto';

/**
 * Standard API result wrapper
 */
export interface ResultadoDto<T = Record<string, unknown>> {
  codigoHttp: number;
  mensagem: string;
  dados?: T;
  transacao?: TransacaoDto;
}

/**
 * Standard API response structure
 */
export interface ApiResponseDto<T = Record<string, unknown>> {
  resultado: ResultadoDto<T>;
}
