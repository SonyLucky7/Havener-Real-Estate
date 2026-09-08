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
      'group inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap';

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 gap-2 h-9',
      md: 'text-sm px-6 py-3 gap-3 h-12',
      lg: 'text-base px-8 py-4 gap-4 h-14',
    };

    const variantStyles = {
      gold: 'bg-gradient-to-r from-[#D8B682] via-[#C5A880] to-[#A8875A] text-[#08090C] hover:brightness-110 shadow-lg shadow-[#C5A880]/15 font-semibold',
      glass:
        'bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F2EB] border border-white/10 hover:border-[#C5A880]/40 backdrop-blur-md',
      outline:
        'bg-transparent hover:bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/40 hover:border-[#C5A880]',
      ghost: 'bg-transparent hover:bg-white/[0.05] text-[#9EA3B0] hover:text-[#F5F2EB]',
    };

    const iconCircleStyles = {
      gold: 'bg-[#08090C]/10 text-[#08090C]',
      glass: 'bg-white/10 text-[#F5F2EB] group-hover:bg-[#C5A880] group-hover:text-[#08090C]',
      outline: 'bg-[#C5A880]/15 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#08090C]',
      ghost: 'bg-transparent text-current',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        <span>{children}</span>
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
