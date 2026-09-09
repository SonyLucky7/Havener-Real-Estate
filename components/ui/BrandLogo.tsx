'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkToHero?: boolean;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className,
  linkToHero = true,
  inverted = false,
}) => {
  const content = (
    <div
      dir="ltr"
      className={cn('inline-flex items-center select-none group [direction:ltr] text-left', className)}
    >
      {variant === 'horizontal' && (
        inverted ? (
          <div dir="ltr" className="flex flex-row items-center gap-2.5 [direction:ltr] text-left">
            <Image
              src="/havener-mark.png"
              alt="Havener Emblem"
              width={220}
              height={273}
              priority
              className={cn(
                'w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0',
                size === 'sm' && 'h-7 sm:h-8',
                size === 'md' && 'h-8 sm:h-9 md:h-10',
                size === 'lg' && 'h-10 sm:h-12 md:h-14'
              )}
            />
            <div dir="ltr" className="flex flex-col justify-center items-start text-left [direction:ltr]">
              <span
                className={cn(
                  'font-serif font-bold tracking-[0.14em] text-white leading-none drop-shadow-sm text-left',
                  size === 'sm' && 'text-sm sm:text-base',
                  size === 'md' && 'text-base sm:text-lg md:text-xl',
                  size === 'lg' && 'text-lg sm:text-xl md:text-2xl'
                )}
              >
                HAVENER
              </span>
              <span
                className={cn(
                  'font-sans font-medium tracking-[0.24em] text-blue-200/90 uppercase leading-none mt-1 text-left',
                  size === 'sm' && 'text-[8px]',
                  size === 'md' && 'text-[9px] sm:text-[10px]',
                  size === 'lg' && 'text-[10px] sm:text-xs'
                )}
              >
                Real Estate
              </span>
            </div>
          </div>
        ) : (
          <Image
            src="/havener-logo-horizontal.png"
            alt="Havener Real Estate"
            width={720}
            height={220}
            priority
            className={cn(
              'w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]',
              size === 'sm' && 'h-8 sm:h-9',
              size === 'md' && 'h-10 sm:h-11 md:h-12',
              size === 'lg' && 'h-12 sm:h-14 md:h-16'
            )}
          />
        )
      )}

      {variant === 'stacked' && (
        <Image
          src="/havener-logo-tight.png"
          alt="Havener Real Estate"
          width={601}
          height={501}
          priority
          className={cn(
            'w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]',
            size === 'sm' && 'h-12',
            size === 'md' && 'h-16',
            size === 'lg' && 'h-20'
          )}
        />
      )}

      {variant === 'mark-only' && (
        <Image
          src="/havener-mark.png"
          alt="Havener Emblem"
          width={220}
          height={273}
          priority
          className={cn(
            'w-auto object-contain transition-transform duration-300 group-hover:scale-105',
            size === 'sm' && 'h-8',
            size === 'md' && 'h-10',
            size === 'lg' && 'h-12'
          )}
        />
      )}
    </div>
  );

  if (linkToHero) {
    return (
      <Link
        href="#hero"
        dir="ltr"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C] rounded-lg transition-opacity hover:opacity-90 flex items-center [direction:ltr]"
        aria-label="Havener Real Estate Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
