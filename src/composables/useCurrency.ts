/**
 * Currency utilities for KES/USD conversion
 * Uses a configurable exchange rate with fallback
 */

// Current approximate rate (update periodically)
// 1 USD ≈ 129.50 KES (as of April 2025, Central Bank of Kenya)
const DEFAULT_EXCHANGE_RATE = 129.50

// Store rate in localStorage so it can be updated
function getExchangeRate(): number {
  const stored = localStorage.getItem('exchangeRate')
  return stored ? parseFloat(stored) : DEFAULT_EXCHANGE_RATE
}

export function setExchangeRate(rate: number): void {
  localStorage.setItem('exchangeRate', rate.toString())
}

/**
 * Convert USD to KES
 */
export function usdToKes(usd: number, rate?: number): number {
  const r = rate || getExchangeRate()
  return Math.round(usd * r)
}

/**
 * Format a KES amount directly (no conversion needed)
 * e.g. 4000 → "KSh 4,000"
 */
export function formatKesDirect(kes: number): string {
  return `KSh ${Math.round(kes).toLocaleString('en-KE')}`
}

/**
 * Format a USD amount as KES
 * e.g. 129 → "KSh 16,706"
 */
export function formatKes(usd: number): string {
  const kes = usdToKes(usd)
  return formatKesDirect(kes)
}

/**
 * Format a USD amount as KES with per-day suffix
 */
export function formatKesPerDay(usd: number): string {
  return `${formatKes(usd)}/day`
}

/**
 * Get the current exchange rate display string
 */
export function getExchangeRateDisplay(): string {
  const rate = getExchangeRate()
  return `1 USD = KSh ${rate.toFixed(2)}`
}
