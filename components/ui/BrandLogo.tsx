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
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className,
  linkToHero = true,
}) => {
  const content = (
    <div className={cn('inline-flex items-center gap-3 select-none group', className)}>
      {variant === 'horizontal' && (
        <>
          {/* Crisp H Monogram Mark */}
          <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/havener-mark.png"
              alt="Havener Real Estate Emblem"
              width={220}
              height={273}
              priority
              className={cn(
                'w-auto object-contain',
                size === 'sm' && 'h-8 sm:h-9',
                size === 'md' && 'h-10 sm:h-11',
                size === 'lg' && 'h-12 sm:h-14'
              )}
            />
          </div>

          {/* Precision Typographic Lockup */}
          <div className="flex flex-col justify-center leading-none">
            <span
              className={cn(
                'font-serif tracking-[0.16em] text-[#0A0E24] font-bold transition-colors duration-300 group-hover:text-[#2D3E8C]',
                size === 'sm' && 'text-base sm:text-lg',
                size === 'md' && 'text-lg sm:text-xl',
                size === 'lg' && 'text-xl sm:text-2xl'
              )}
            >
              HAVENER
            </span>
            <span
              className={cn(
                'font-sans uppercase tracking-[0.26em] text-[#2D3E8C] font-semibold mt-1 transition-colors duration-300 group-hover:text-[#E8922D]',
                size === 'sm' && 'text-[9px] sm:text-[10px]',
                size === 'md' && 'text-[10px] sm:text-[11px]',
                size === 'lg' && 'text-[11px] sm:text-xs'
              )}
            >
              REAL ESTATE · DUBAI
            </span>
          </div>
        </>
      )}

      {variant === 'stacked' && (
        <div className="flex flex-col items-start group">
          <Image
            src="/havener-logo-tight.png"
            alt="Havener Real Estate"
            width={601}
            height={501}
            className={cn(
              'w-auto object-contain transition-transform duration-300 group-hover:scale-102',
              size === 'sm' && 'h-12',
              size === 'md' && 'h-16',
              size === 'lg' && 'h-20'
            )}
          />
        </div>
      )}

      {variant === 'mark-only' && (
        <Image
          src="/havener-mark.png"
          alt="Havener Emblem"
          width={220}
          height={273}
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
      <Link href="#hero" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
