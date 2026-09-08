import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency, Language } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EXCHANGE_RATES: Record<Currency, number> = {
  AED: 1,
  USD: 0.2723,
  EUR: 0.2515,
  GBP: 0.2154,
};

export const CURRENCY_SYMBOLS: Record<Currency, { en: string; ar: string }> = {
  AED: { en: 'AED', ar: 'د.إ' },
  USD: { en: '$', ar: '$' },
  EUR: { en: '€', ar: '€' },
  GBP: { en: '£', ar: '£' },
};

export function formatPrice(
  amountAED: number,
  currency: Currency = 'AED',
  lang: Language = 'en'
): string {
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amountAED * rate;
  const symbol = CURRENCY_SYMBOLS[currency][lang];

  if (converted >= 1_000_000) {
    const millions = (converted / 1_000_000).toFixed(1).replace(/\.0$/, '');
    if (lang === 'ar') {
      return `${millions} مليون ${symbol}`;
    }
    return currency === 'AED' ? `${symbol} ${millions}M` : `${symbol}${millions}M`;
  }

  const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-AE' : 'en-US', {
    maximumFractionDigits: 0,
  }).format(converted);

  return lang === 'ar' ? `${formattedNumber} ${symbol}` : `${symbol} ${formattedNumber}`;
}
