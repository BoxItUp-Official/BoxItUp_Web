// Shared currency + region helpers used across the merchant portal so a
// store's chosen currency flows through Overview, Orders, and Analytics.

export type CurrencyCode = 'TWD' | 'USD' | 'JPY' | 'CNY' | 'HKD' | 'EUR' | 'GBP'

export const CURRENCIES: Record<CurrencyCode, { symbol: string; label: string; decimals: number }> = {
  TWD: { symbol: 'NT$', label: 'New Taiwan Dollar', decimals: 0 },
  USD: { symbol: '$',   label: 'US Dollar',          decimals: 2 },
  JPY: { symbol: '¥',   label: 'Japanese Yen',       decimals: 0 },
  CNY: { symbol: '¥',   label: 'Chinese Yuan',       decimals: 2 },
  HKD: { symbol: 'HK$', label: 'Hong Kong Dollar',   decimals: 2 },
  EUR: { symbol: '€',   label: 'Euro',               decimals: 2 },
  GBP: { symbol: '£',   label: 'British Pound',       decimals: 2 },
}

export const REGIONS: { code: string; label: string; currency: CurrencyCode; timezone: string }[] = [
  { code: 'TW', label: 'Taiwan',        currency: 'TWD', timezone: 'Asia/Taipei' },
  { code: 'HK', label: 'Hong Kong',     currency: 'HKD', timezone: 'Asia/Hong_Kong' },
  { code: 'JP', label: 'Japan',         currency: 'JPY', timezone: 'Asia/Tokyo' },
  { code: 'CN', label: 'Mainland China', currency: 'CNY', timezone: 'Asia/Shanghai' },
  { code: 'US', label: 'United States', currency: 'USD', timezone: 'America/New_York' },
  { code: 'GB', label: 'United Kingdom', currency: 'GBP', timezone: 'Europe/London' },
  { code: 'EU', label: 'Eurozone',      currency: 'EUR', timezone: 'Europe/Berlin' },
]

export function currencySymbol(code?: string | null): string {
  return CURRENCIES[(code as CurrencyCode)] ?.symbol ?? 'NT$'
}

// Format a number as money in the given currency, e.g. formatMoney(1290,'TWD') -> "NT$1,290"
export function formatMoney(amount: number, code?: string | null): string {
  const c = CURRENCIES[(code as CurrencyCode)] ?? CURRENCIES.TWD
  const n = c.decimals === 0 ? Math.round(amount) : amount
  return c.symbol + n.toLocaleString(undefined, {
    minimumFractionDigits: c.decimals,
    maximumFractionDigits: c.decimals,
  })
}
