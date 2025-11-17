/**
 * Environment Configuration
 *
 * Type Safety: Properly typed configuration
 * Validation: All values validated and sanitized
 * KISS: Simple configuration structure
 */

/**
 * Validate that a required environment variable is set
 */
function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Please check your .env file.`,
    );
  }
  return value;
}

/**
 * Parse integer with validation
 */
function parseIntSafe(
  value: string | undefined,
  defaultValue: number,
  name: string,
): number {
  if (!value) {
    return defaultValue;
  }

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(
      `Invalid integer value for ${name}: "${value}". Expected a number.`,
    );
  }

  return parsed;
}

/**
 * Environment configuration factory
 * Type Safety: Returns properly typed configuration object
 */
export const envConfig = () => ({
  // Server
  port: parseIntSafe(process.env.PORT, 3001, 'PORT'),

  // Downstream Services
  hssUrl: process.env.HSS_URL || 'http://localhost:3000',
  contaUrl: process.env.CONTA_URL || 'https://plataforma.stage.surf.com.br/api',
  summaUrl: process.env.SUMMA_URL || 'http://localhost:3000',
  hlrUrl: process.env.HLR_URL || 'http://localhost:3000',
  hubUrl: process.env.HUB_URL || 'https://plataforma.stage.surf.com.br/api',

  // HTTP Config
  httpTimeout: parseIntSafe(process.env.HTTP_TIMEOUT, 30000, 'HTTP_TIMEOUT'),

  // BSS Authentication (CRITICAL - Required for downstream service access)
  // Note: These are validated at runtime when TokenManagerService attempts to use them
  bssAuthUrl: process.env.BSS_AUTH_URL,
  bssAuthEmail: process.env.BSS_AUTH_EMAIL,
  bssAuthPassword: process.env.BSS_AUTH_PASSWORD,
});

/**
 * Type for environment configuration
 * Type Safety: Ensures consistent typing across the application
 */
export type EnvConfig = ReturnType<typeof envConfig>;
