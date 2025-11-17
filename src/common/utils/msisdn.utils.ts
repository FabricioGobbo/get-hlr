/**
 * Sanitizes MSISDN by removing all non-digit characters
 *
 * Handles formats like:
 * - +55 (11) 95299-4427 -> 5511952994427
 * - +55 11 95299-4427 -> 5511952994427
 * - 55 (11) 95299-4427 -> 5511952994427
 * - (11) 95299-4427 -> 1195299427
 *
 * @param msisdn - The MSISDN string to sanitize
 * @returns Sanitized MSISDN containing only digits
 *
 * @example
 * sanitizeMsisdn('+55 (11) 95299-4427') // Returns: '5511952994427'
 * sanitizeMsisdn('5511952994427') // Returns: '5511952994427'
 */
export function sanitizeMsisdn(msisdn: string): string {
  // Remove all non-digit characters (spaces, parentheses, hyphens, plus signs, etc.)
  return msisdn.replace(/\D/g, '');
}
