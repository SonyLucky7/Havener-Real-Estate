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
    <div className={cn('inline-flex items-center select-none group', className)}>
      {variant === 'horizontal' && (
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
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C] rounded-lg transition-opacity hover:opacity-90 flex items-center"
        aria-label="Havener Real Estate Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
