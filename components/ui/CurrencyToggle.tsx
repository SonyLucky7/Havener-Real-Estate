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
        'inline-flex items-center p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-xs backdrop-blur-md',
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
              'px-3 py-1 text-xs font-semibold tracking-wider rounded-full transition-all duration-300 cursor-pointer',
              isActive
                ? 'bg-gradient-to-r from-[#2D3E8C] to-[#E8922D] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            )}
          >
            {curr}
          </button>
        );
      })}
    </div>
  );
};
