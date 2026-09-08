'use client';

import React from 'react';
import { Currency } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CurrencyToggleProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

const CURRENCIES: Currency[] = ['AED', 'USD', 'EUR', 'GBP'];

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({
  currentCurrency,
  onCurrencyChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md',
        className
      )}
      role="radiogroup"
      aria-label="Select Currency"
    >
      {CURRENCIES.map((curr) => {
        const isActive = curr === currentCurrency;
        return (
          <button
            key={curr}
            onClick={() => onCurrencyChange(curr)}
            role="radio"
            aria-checked={isActive}
            className={cn(
              'px-3 py-1 text-xs font-semibold tracking-wider rounded-full transition-all duration-300',
              isActive
                ? 'bg-gradient-to-r from-[#E8922D] to-[#C47A1F] text-[#070A16] shadow-sm font-bold'
                : 'text-[#8E95A5] hover:text-[#F5F2EB]'
            )}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
};
