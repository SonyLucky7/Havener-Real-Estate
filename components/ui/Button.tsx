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
      'group inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8922D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050711] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap';

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 gap-2 h-9',
      md: 'text-sm px-6 py-3 gap-3 h-12',
      lg: 'text-base px-8 py-4 gap-4 h-14',
    };

    const variantStyles = {
      gold: 'bg-gradient-to-r from-[#E8922D] via-[#F0A845] to-[#C47A1F] text-[#070A16] hover:brightness-110 shadow-lg shadow-[#E8922D]/20 font-semibold',
      glass:
        'bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F2EB] border border-white/10 hover:border-[#E8922D]/40 backdrop-blur-md',
      outline:
        'bg-transparent hover:bg-[#E8922D]/10 text-[#E8922D] border border-[#E8922D]/40 hover:border-[#E8922D]',
      ghost: 'bg-transparent hover:bg-white/[0.05] text-[#9EA3B0] hover:text-[#F5F2EB]',
    };

    const iconCircleStyles = {
      gold: 'bg-[#070A16]/10 text-[#070A16]',
      glass: 'bg-white/10 text-[#F5F2EB] group-hover:bg-[#E8922D] group-hover:text-[#070A16]',
      outline: 'bg-[#E8922D]/15 text-[#E8922D] group-hover:bg-[#E8922D] group-hover:text-[#070A16]',
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
