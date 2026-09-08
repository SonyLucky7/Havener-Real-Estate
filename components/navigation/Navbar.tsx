'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
            ? 'py-3 sm:py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5'
            : 'py-5 sm:py-6 bg-white/50 backdrop-blur-md border-b border-slate-200/40'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo - Precisely Scaled & Positioned */}
          <div className="flex items-center">
            <BrandLogo variant="horizontal" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.14em] uppercase text-slate-700 hover:text-[#0A0E24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E8922D] hover:after:w-full after:transition-all after:duration-300 font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-[#2D3E8C] text-xs font-semibold tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C]"
              aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#E8922D]" />
              <span>{t.nav.languageSwitch}</span>
            </button>

            {/* Private Consultation CTA */}
            <Button
              variant="gold"
              size="sm"
              onClick={onOpenConsultation}
              isRtl={lang === 'ar'}
            >
              {t.nav.consultationCTA}
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className="px-2.5 py-1.5 rounded-full bg-slate-100 text-[#2D3E8C] text-xs font-semibold border border-slate-200"
              aria-label="Switch Language"
            >
              {t.nav.languageSwitch}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-slate-100 text-slate-800 hover:text-[#E8922D] border border-slate-200 transition-colors focus:outline-none"
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
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl flex flex-col p-6 sm:p-10 justify-between lg:hidden animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <BrandLogo variant="horizontal" size="sm" linkToHero={false} />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#E8922D] border border-slate-200 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-slate-900 hover:text-[#E8922D] transition-colors flex items-center justify-between"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#2D3E8C] font-mono tracking-widest font-semibold">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-slate-200">
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              isRtl={lang === 'ar'}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
            >
              {t.nav.consultationCTA}
            </Button>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
              <span>{t.contact.directContact.officeValue}</span>
              <span className="text-[#2D3E8C] font-semibold">DLD Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
