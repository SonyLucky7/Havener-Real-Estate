'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';

interface TrustSectionProps {
  lang: Language;
}

const DEVELOPER_PARTNERS_PLACEHOLDERS = [
  { name: 'EMAAR', type: 'Master Developer' },
  { name: 'NAKHEEL', type: 'Master Waterfront Planner' },
  { name: 'DAMAC', type: 'Luxury Living & Resorts' },
  { name: 'SOBHA REALTY', type: 'Precision Engineering' },
  { name: 'BINGHATTI', type: 'Branded Hyper-Architecture' },
  { name: 'MERAAS', type: 'Urban & Coastal Destinations' },
];

export const TrustSection: React.FC<TrustSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].trust;

  return (
    <section
      id="trust"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-white border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none whitespace-pre-line mb-6 font-bold">
            {t.headline}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {t.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 hover:bg-white hover:border-[#2D3E8C]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#2D3E8C] font-bold block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-[#0A0E24] mb-3 font-bold">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Network / Credibility Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-white border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#E8922D] font-bold block mb-1">
                {lang === 'ar' ? 'شبكة المطورين المعتمدة' : 'Institutional Developer Sourcing'}
              </span>
              <h4 className="font-serif text-lg text-[#0A0E24] font-bold">
                {lang === 'ar'
                  ? 'مشاريع مرخصة ومعتمدة من دائرة الأراضي والأملاك'
                  : 'Licensed Dubai Land Department Project Portfolio'}
              </h4>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-mono font-bold text-[#D97706] self-start sm:self-auto shadow-2xs">
              ESCROW PROTECTED
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-center">
            {DEVELOPER_PARTNERS_PLACEHOLDERS.map((dev) => (
              <div
                key={dev.name}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2D3E8C]/40 shadow-2xs transition-all flex flex-col items-center justify-center"
              >
                <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#0A0E24] mb-1">
                  {dev.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">
                  {dev.type}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center mt-6 font-medium">
            {t.placeholderNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
