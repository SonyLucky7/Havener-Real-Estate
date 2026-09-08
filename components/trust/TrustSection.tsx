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
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#050711] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-semibold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none whitespace-pre-line mb-6">
            {t.headline}
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {t.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-8 rounded-3xl bg-white/[0.015] border border-white/[0.06] hover:border-[#E8922D]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#E8922D] block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-xl text-[#F5F2EB] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Network / Credibility Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/[0.06] pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#E8922D] block mb-1">
                {lang === 'ar' ? 'شبكة المطورين المعتمدة' : 'Institutional Developer Sourcing'}
              </span>
              <h4 className="font-serif text-lg text-[#F5F2EB]">
                {lang === 'ar'
                  ? 'مشاريع مرخصة ومعتمدة من دائرة الأراضي والأملاك'
                  : 'Licensed Dubai Land Department Project Portfolio'}
              </h4>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-[#E8922D]/10 border border-[#E8922D]/20 text-[11px] font-mono text-[#F4B85C] self-start sm:self-auto">
              ESCROW PROTECTED
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {DEVELOPER_PARTNERS_PLACEHOLDERS.map((dev) => (
              <div
                key={dev.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col items-center justify-center"
              >
                <span className="font-serif text-sm sm:text-base font-bold tracking-widest text-[#F5F2EB] mb-1">
                  {dev.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#6E7485]">
                  {dev.type}
                </span>
              </div>
            ))}
          </div>

          {/* Compliance notice adhering strictly to the user prompt */}
          <p className="text-[11px] text-[#6E7485] text-center mt-6">
            {t.placeholderNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
