import { ContaDetalhesResponseDto } from '../dto';

/**
 * Extrai MSISDN da resposta da API Conta
 *
 * DRY: Centraliza lógica de extração em um único lugar
 * Type Safety: Tipagem adequada
 *
 * @param contaResponse - Resposta da API Conta
 * @returns MSISDN extraído ou null se não encontrado
 */
export function extractMsisdnFromConta(
  contaResponse: ContaDetalhesResponseDto | null,
): string | null {
  if (!contaResponse?.resultado) {
    return null;
  }

  const resultado = contaResponse.resultado;
  const msisdn = resultado.nuMsisdn || resultado.msisdn;

  return msisdn ? String(msisdn) : null;
}

/**
 * Extrai MVNO da resposta da API Conta
 *
 * @param contaResponse - Resposta da API Conta
 * @returns MVNO extraído ou null se não encontrado
 */
export function extractMvnoFromConta(
  contaResponse: ContaDetalhesResponseDto | null,
): string | null {
  if (!contaResponse?.resultado) {
    return null;
  }

  const resultado = contaResponse.resultado;
  const mvno = resultado.noMvno || resultado.mvno;

  return mvno ? String(mvno) : null;
}
