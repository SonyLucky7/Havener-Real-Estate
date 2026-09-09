'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { ArrowUp, Globe } from 'lucide-react';

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
    <footer className="relative bg-[#F4F6FB] border-t border-slate-200 text-slate-600 overflow-hidden">
      {/* Subtle architectural watermark */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 border border-[#2D3E8C]/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] border border-[#E8922D]/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        {/* Main Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-200/80">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="mb-5">
              <BrandLogo variant="horizontal" size="lg" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-5 font-normal">
              {t.brandDesc}
            </p>

            {/* Social Icons (Instagram, LinkedIn, X, YouTube, Facebook) */}
            <div className="mb-6">
              <SocialLinks variant="light" size="md" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onLanguageToggle}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#2D3E8C] transition-colors shadow-2xs cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#0A0E24]" strokeWidth={1.5} />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="text-xs text-[#0A0E24] hover:text-[#2D3E8C] tracking-wider uppercase underline underline-offset-4 font-bold transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'طلب استشارة خاصة' : 'Private Advisory'}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#0A0E24] font-bold">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#2D3E8C] transition-colors font-medium"
                >
                  {lang === 'ar' ? 'المشاريع قيد الإنشاء' : 'Off-Plan Portfolios'}
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#2D3E8C] transition-colors font-medium"
                >
                  {lang === 'ar' ? 'فلل نخلة جميرا وجبل علي' : 'Palm Jumeirah & Jebel Ali Villas'}
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="hover:text-[#2D3E8C] transition-colors font-medium"
                >
                  {lang === 'ar' ? 'شقق وبنتهاوس وسط المدينة' : 'Downtown & Canal Penthouses'}
                </a>
              </li>
              <li>
                <a
                  href="#investment"
                  className="hover:text-[#2D3E8C] transition-colors font-medium"
                >
                  {lang === 'ar' ? 'منهجية الاستثمار' : 'Investment Methodology'}
                </a>
              </li>
              <li>
                <a
                  href="#why-dubai"
                  className="hover:text-[#2D3E8C] transition-colors font-medium"
                >
                  {lang === 'ar' ? 'لماذا الاستثمار في دبي' : 'Why Dubai Investment Thesis'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#0A0E24] font-bold">
              {t.legal}
            </h4>
            <div className="space-y-3 text-[11px] leading-relaxed text-slate-500 font-normal">
              <p>{t.disclaimerText}</p>
              <div className="flex items-center gap-4 pt-2 text-slate-600 font-medium">
                <a href="#contact" className="hover:text-[#2D3E8C] transition-colors">
                  {t.privacyPolicy}
                </a>
                <span>·</span>
                <a href="#contact" className="hover:text-[#2D3E8C] transition-colors">
                  {t.termsOfService}
                </a>
                <span>·</span>
                <a href="#contact" className="hover:text-[#2D3E8C] transition-colors">
                  {t.investmentDisclaimer}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-normal">{t.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#2D3E8C] transition-colors group cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="uppercase tracking-widest text-[10px] font-semibold">
              {lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
            </span>
            <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#2D3E8C] shadow-2xs transition-colors">
              <ArrowUp className="w-3 h-3 text-[#2D3E8C]" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
