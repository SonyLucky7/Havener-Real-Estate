'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, MessageCircle } from 'lucide-react';
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
  const isRtl = lang === 'ar';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy active section detection
      const sections = ['hero', 'properties', 'investment', 'why-dubai', 'about', 'services', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'hero', label: t.nav.home, href: '#hero' },
    { id: 'properties', label: t.nav.properties, href: '#properties' },
    { id: 'investment', label: t.nav.investments, href: '#investment' },
    { id: 'why-dubai', label: t.nav.whyDubai, href: '#why-dubai' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'services', label: t.nav.services, href: '#services' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm shadow-slate-900/5 py-3'
            : 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4 sm:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Lockup */}
          <div className="flex items-center shrink-0">
            <BrandLogo variant="horizontal" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[11px] xl:text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-200 relative py-1.5',
                    isActive
                      ? 'text-[#2D3E8C] font-bold'
                      : 'text-slate-600 hover:text-[#0A0E24]'
                  )}
                >
                  <span>{link.label}</span>
                  {/* Active Indicator Underline */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 rounded-full',
                      isActive
                        ? 'bg-gradient-to-r from-[#2D3E8C] to-[#E8922D] opacity-100 scale-x-100'
                        : 'bg-[#E8922D] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-[#2D3E8C] text-xs font-bold tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D3E8C] cursor-pointer"
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
              isRtl={isRtl}
            >
              {t.nav.consultationCTA}
            </Button>
          </div>

          {/* Mobile Menu Trigger & Quick Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className="px-2.5 py-1.5 rounded-full bg-slate-100 text-[#2D3E8C] text-xs font-bold border border-slate-200 cursor-pointer"
              aria-label="Switch Language"
            >
              {t.nav.languageSwitch}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-slate-100 text-slate-800 hover:text-[#2D3E8C] hover:bg-slate-200 border border-slate-200 transition-colors focus:outline-none cursor-pointer"
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

      {/* Fullscreen Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between lg:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white/95 backdrop-blur-md">
            <BrandLogo variant="horizontal" size="sm" linkToHero={false} />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#2D3E8C] hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 px-8 py-8 my-auto overflow-y-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-slate-900 hover:text-[#2D3E8C] transition-colors flex items-center justify-between py-1"
                style={{ transitionDelay: `${idx * 35}ms` }}
              >
                <span className="font-bold">{link.label}</span>
                <span className="text-xs text-[#2D3E8C] font-mono tracking-widest font-bold">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="flex flex-col gap-3.5 p-6 sm:p-8 border-t border-slate-200 bg-slate-50/80">
            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://wa.me/97140000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:text-[#25D366] transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+97140000000"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:text-[#2D3E8C] transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#2D3E8C]" />
                <span>{lang === 'ar' ? 'اتصال مباشر' : 'Direct Call'}</span>
              </a>
            </div>

            {/* Consultation CTA */}
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

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium">
              <span>{t.contact.directContact.officeValue}</span>
              <span className="text-[#2D3E8C] font-bold">DLD Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
