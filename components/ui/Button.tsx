'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean | React.ReactNode;
  isRtl?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'gold',
      size = 'md',
      icon = true,
      isRtl = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 gap-2 h-9',
      md: 'text-sm px-6 py-3 gap-3 h-12',
      lg: 'text-base px-8 py-4 gap-4 h-14',
    };

    const variantStyles = {
      gold: 'bg-gradient-to-r from-[#E8922D] via-[#F0A845] to-[#D97706] text-white hover:brightness-105 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 font-semibold',
      glass:
        'bg-white/90 hover:bg-white text-[#0A0E24] border border-slate-200 hover:border-[#2D3E8C]/50 shadow-sm hover:shadow backdrop-blur-md font-semibold',
      outline:
        'bg-white hover:bg-amber-50/50 text-[#E8922D] border-1.5 border-[#E8922D]/60 hover:border-[#E8922D] font-semibold',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-[#0A0E24]',
    };

    const iconCircleStyles = {
      gold: 'bg-white/20 text-white group-hover:bg-white/30',
      glass: 'bg-slate-100 text-[#0A0E24] group-hover:bg-[#2D3E8C] group-hover:text-white',
      outline: 'bg-[#E8922D]/10 text-[#E8922D] group-hover:bg-[#E8922D] group-hover:text-white',
      ghost: 'bg-transparent text-current',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        <span className="inline-flex items-center justify-center text-center truncate">{children}</span>
        {icon && (
          <span
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
              iconCircleStyles[variant],
              isRtl
                ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            )}
          >
            {typeof icon === 'boolean' ? (
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform" />
            ) : (
              icon
            )}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
