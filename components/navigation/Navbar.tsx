'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, MessageCircle, Phone } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { SocialLinks } from '@/components/ui/SocialLinks';
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
  const [isOverHero, setIsOverHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll and hero boundary detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Detect whether the viewport is still over the hero section
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setIsOverHero(scrollY < heroBottom - 80);
      } else {
        setIsOverHero(scrollY < window.innerHeight * 0.85);
      }

      // Scrollspy active section detection
      const sections = ['hero', 'properties', 'investment', 'why-dubai', 'about', 'services', 'contact'];
      const scrollPos = scrollY + 140;

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
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none">
        <div
          className={cn(
            'max-w-7xl mx-auto rounded-2xl sm:rounded-full pointer-events-auto transition-all duration-400 ease-out flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3',
            isOverHero
              ? isScrolled
                ? 'bg-slate-950/45 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] text-white'
                : 'bg-slate-950/20 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_0_rgba(0,0,0,0.2)] text-white'
              : 'bg-white/85 backdrop-blur-2xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-slate-900'
          )}
        >
          {/* Brand Logo Lockup */}
          <div className="flex items-center shrink-0 [direction:ltr] text-left" dir="ltr">
            <BrandLogo variant="horizontal" size="md" inverted={isOverHero} />
          </div>

          {/* Desktop Navigation Links - iOS Segmented Capsule Style */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[11px] xl:text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-200 px-3.5 py-1.5 rounded-full relative',
                    isOverHero
                      ? isActive
                        ? 'bg-white/20 text-white font-bold backdrop-blur-md shadow-xs border border-white/15'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'bg-[#2D3E8C] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  )}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher - iOS Glass Capsule */}
            <button
              onClick={onLanguageToggle}
              className={cn(
                'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 cursor-pointer shadow-xs active:scale-95',
                isOverHero
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md focus-visible:ring-white/40'
                  : 'bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-[#2D3E8C] focus-visible:ring-[#2D3E8C]'
              )}
              aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className={cn('w-3.5 h-3.5', isOverHero ? 'text-white' : 'text-[#0A0E24]')} strokeWidth={1.5} />
              <span>{t.nav.languageSwitch}</span>
            </button>

            {/* Private Consultation CTA */}
            <Button
              variant="gold"
              size="sm"
              onClick={onOpenConsultation}
              isRtl={isRtl}
              className="rounded-full shadow-md active:scale-95"
            >
              {t.nav.consultationCTA}
            </Button>
          </div>

          {/* Mobile Menu Trigger & Quick Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onLanguageToggle}
              className={cn(
                'px-2.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer active:scale-95',
                isOverHero
                  ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  : 'bg-slate-100 text-[#2D3E8C] border-slate-200 hover:bg-slate-200'
              )}
              aria-label="Switch Language"
            >
              {t.nav.languageSwitch}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'p-2 rounded-full border transition-colors focus:outline-none cursor-pointer active:scale-95',
                isOverHero
                  ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  : 'bg-slate-100 text-slate-800 border-slate-200 hover:text-[#2D3E8C] hover:bg-slate-200'
              )}
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

      {/* Fullscreen Mobile Navigation Drawer - iOS 18 Frosted Glass Sheet */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-3xl flex flex-col justify-between lg:hidden text-white animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center shrink-0 [direction:ltr] text-left" dir="ltr">
            <BrandLogo variant="horizontal" size="sm" linkToHero={false} inverted={true} />
          </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors cursor-pointer active:scale-95"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 px-8 py-8 my-auto overflow-y-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl text-white/90 hover:text-[#E8922D] transition-colors flex items-center justify-between py-2 border-b border-white/5"
                style={{ transitionDelay: `${idx * 30}ms` }}
              >
                <span className="font-bold">{link.label}</span>
                <span className="text-xs text-[#E8922D] font-mono tracking-widest font-bold">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="flex flex-col gap-3.5 p-6 sm:p-8 border-t border-white/10 bg-white/5 backdrop-blur-xl">
            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://wa.me/97140000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-colors shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+97140000000"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#E8922D]" strokeWidth={1.5} />
                <span>{lang === 'ar' ? 'اتصال مباشر' : 'Direct Call'}</span>
              </a>
            </div>

            {/* Consultation CTA */}
            <Button
              variant="gold"
              size="lg"
              className="w-full rounded-full"
              isRtl={isRtl}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
            >
              {t.nav.consultationCTA}
            </Button>

            {/* Social Icons (Instagram, LinkedIn, X, YouTube, Facebook) */}
            <div className="flex justify-center pt-2 pb-1">
              <SocialLinks variant="glass" size="sm" />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 font-medium">
              <span>{t.contact.directContact.officeValue}</span>
              <span className="text-[#E8922D] font-bold">DLD Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
