'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageToggle,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050711] border-t border-white/[0.08] text-[#8E95A5] overflow-hidden">
      {/* Subtle architectural geometric watermark */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 border border-[#E8922D]/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] border border-[#E8922D]/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        {/* Main Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="#hero" className="inline-block focus:outline-none mb-4">
              <Image
                src="/havener-logo.png"
                alt="Havener Real Estate"
                width={180}
                height={54}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed max-w-sm mb-6 font-light">
              {t.brandDesc}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={onLanguageToggle}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-[#E8922D] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="text-xs text-[#F5F2EB] hover:text-[#E8922D] tracking-wider uppercase underline underline-offset-4 font-medium transition-colors"
              >
                {lang === 'ar' ? 'طلب استشارة خاصة' : 'Private Advisory'}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#F5F2EB] transition-colors"
                >
                  {lang === 'ar' ? 'المشاريع قيد الإنشاء' : 'Off-Plan Portfolios'}
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#F5F2EB] transition-colors"
                >
                  {lang === 'ar' ? 'فلل نخلة جميرا وجبل علي' : 'Palm Jumeirah & Jebel Ali Villas'}
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#F5F2EB] transition-colors"
                >
                  {lang === 'ar' ? 'شقق وبنتهاوس وسط المدينة' : 'Downtown & Canal Penthouses'}
                </a>
              </li>
              <li>
                <a
                  href="#investment"
                  className="hover:text-[#F5F2EB] transition-colors"
                >
                  {lang === 'ar' ? 'منهجية الاستثمار' : 'Investment Methodology'}
                </a>
              </li>
              <li>
                <a
                  href="#why-dubai"
                  className="hover:text-[#F5F2EB] transition-colors"
                >
                  {lang === 'ar' ? 'لماذا الاستثمار في دبي' : 'Why Dubai Investment Thesis'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#F5F2EB]">
              {t.legal}
            </h4>
            <div className="space-y-3 text-[11px] leading-relaxed text-[#6E7485]">
              <p>{t.disclaimerText}</p>
              <div className="flex items-center gap-4 pt-2 text-[#8E95A5]">
                <a href="#contact" className="hover:text-[#E8922D] transition-colors">
                  {t.privacyPolicy}
                </a>
                <span>·</span>
                <a href="#contact" className="hover:text-[#E8922D] transition-colors">
                  {t.termsOfService}
                </a>
                <span>·</span>
                <a href="#contact" className="hover:text-[#E8922D] transition-colors">
                  {t.investmentDisclaimer}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E7485]">
          <p>{t.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#8E95A5] hover:text-[#E8922D] transition-colors group"
            aria-label="Scroll to top"
          >
            <span className="uppercase tracking-widest text-[10px]">
              {lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
            </span>
            <span className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-[#E8922D] transition-colors">
              <ArrowUp className="w-3 h-3 text-[#E8922D]" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
