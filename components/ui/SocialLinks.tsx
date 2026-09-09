'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SocialLinkItem {
  id: 'instagram' | 'linkedin' | 'x' | 'youtube' | 'facebook';
  label: string;
  href: string;
}

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/havener.property/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { id: 'x', label: 'X (Twitter)', href: 'https://x.com' },
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
];

interface SocialLinksProps {
  links?: SocialLinkItem[];
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = DEFAULT_SOCIAL_LINKS,
  variant = 'light',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-11 h-11',
  };

  const baseVariantClasses = {
    light: 'bg-white text-slate-700 border border-slate-200 shadow-2xs',
    dark: 'bg-[#0D1530] text-slate-300 border border-blue-900/40 shadow-2xs',
    glass: 'bg-white/10 text-white/80 border border-white/15 backdrop-blur-md shadow-xs',
  };

  // Authentic Brand Colors on hover / mouse movement
  const brandHoverClasses: Record<SocialLinkItem['id'], string> = {
    instagram:
      'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:text-white hover:shadow-md hover:shadow-[#dc2743]/30',
    linkedin:
      'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:shadow-md hover:shadow-[#0A66C2]/30',
    x:
      'hover:bg-black hover:border-black hover:text-white hover:shadow-md hover:shadow-black/30',
    youtube:
      'hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white hover:shadow-md hover:shadow-[#FF0000]/30',
    facebook:
      'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-md hover:shadow-[#1877F2]/30',
  };

  const renderIcon = (id: SocialLinkItem['id']) => {
    switch (id) {
      case 'instagram':
        return (
          <svg
            className="w-4 h-4 fill-none stroke-current transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );

      case 'linkedin':
        return (
          <svg
            className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.8v-7.6h-2.8M7.86 6.3a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
          </svg>
        );

      case 'x':
        return (
          <svg
            className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );

      case 'youtube':
        return (
          <svg
            className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );

      case 'facebook':
        return (
          <svg
            className="w-3.5 h-3.5 fill-current transition-transform duration-200 group-hover:scale-105"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
    }
  };

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)} dir="ltr">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className={cn(
            'group rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shrink-0',
            sizeClasses[size],
            baseVariantClasses[variant],
            brandHoverClasses[link.id]
          )}
        >
          {renderIcon(link.id)}
        </a>
      ))}
    </div>
  );
};
