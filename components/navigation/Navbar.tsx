'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.properties, href: '#properties' },
    { label: t.nav.investments, href: '#investment' },
    { label: t.nav.whyDubai, href: '#why-dubai' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          isScrolled
            ? 'py-3 sm:py-4 bg-[#060709]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60'
            : 'py-6 sm:py-8 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="#hero"
            className="group flex flex-col focus-visible:outline-none"
            aria-label="Havener Property Home"
          >
            <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.18em] text-[#F5F2EB] group-hover:text-[#D8B682] transition-colors duration-300">
              {t.brand.name}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium">
              {t.brand.tagline}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-8 xl:gap-10"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-[#B2B8C6] hover:text-[#F5F2EB] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#C5A880] text-xs font-semibold tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.nav.languageSwitch}</span>
            </button>

            {/* Private Consultation CTA */}
            <Button
              variant="gold"
              size="sm"
              onClick={onOpenConsultation}
              isRtl={isRtl}
            >
              {t.nav.consultationCTA}
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className="px-2.5 py-1.5 rounded-full bg-white/[0.05] text-[#C5A880] text-xs font-medium border border-white/10"
              aria-label="Switch Language"
            >
              {t.nav.languageSwitch}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/[0.05] text-[#F5F2EB] hover:text-[#C5A880] border border-white/10 transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060709]/98 backdrop-blur-2xl flex flex-col p-6 sm:p-10 justify-between lg:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] text-[#F5F2EB]">
                {t.brand.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880]">
                {t.brand.tagline}
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/[0.06] text-[#F5F2EB] hover:text-[#C5A880] border border-white/10 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-[#F5F2EB] hover:text-[#C5A880] transition-colors flex items-center justify-between"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C5A880]/50 font-sans tracking-widest">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              isRtl={isRtl}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
            >
              {t.nav.consultationCTA}
            </Button>
            <div className="flex items-center justify-between text-xs text-[#8E95A5] pt-2">
              <span>{t.contact.directContact.officeValue}</span>
              <span className="text-[#C5A880]">DLD Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
