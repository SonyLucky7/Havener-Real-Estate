'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Building2, Globe2, ShieldCheck, Sun, TrendingUp, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhyDubaiSectionProps {
  lang: Language;
}

export const WhyDubaiSection: React.FC<WhyDubaiSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].whyDubai;
  const [activePillar, setActivePillar] = useState(0);

  const pillarIcons = [
    <Landmark key="0" className="w-5 h-5" />,
    <Building2 key="1" className="w-5 h-5" />,
    <TrendingUp key="2" className="w-5 h-5" />,
    <Globe2 key="3" className="w-5 h-5" />,
    <Sun key="4" className="w-5 h-5" />,
    <ShieldCheck key="5" className="w-5 h-5" />,
  ];

  return (
    <section
      id="why-dubai"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#050711] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle light accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#E8922D]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-semibold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none mb-6">
            {t.headline}
          </h2>
          <p className="text-base sm:text-xl text-[#B2B8C6] leading-relaxed font-light">
            {t.supporting}
          </p>
        </div>

        {/* Dynamic Architectural Grid with Large Typographic Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.pillars.map((pillar, index) => {
            const isSelected = activePillar === index;

            return (
              <div
                key={pillar.number}
                onClick={() => setActivePillar(index)}
                className={cn(
                  'group relative p-8 rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden border',
                  isSelected
                    ? 'bg-gradient-to-b from-[#111630] to-[#080C1A] border-[#E8922D]/40 shadow-xl shadow-black/40'
                    : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04]'
                )}
              >
                {/* Micro Number & Metric Pill */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-2xl tracking-widest text-[#E8922D]/60 group-hover:text-[#E8922D] transition-colors">
                    {pillar.number}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-[#E8922D]/10 border border-[#E8922D]/20 text-[11px] font-mono text-[#F4B85C]">
                    {pillar.metric}
                  </div>
                </div>

                {/* Pillar Title */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-xl bg-white/[0.05] text-[#E8922D]">
                    {pillarIcons[index]}
                  </span>
                  <h3 className="font-serif text-lg tracking-wide text-[#F5F2EB] group-hover:text-[#F0A845] transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                {/* Pillar Description */}
                <p className="text-sm text-[#8E95A5] leading-relaxed mb-6 font-light">
                  {pillar.desc}
                </p>

                {/* Verified Data Note */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#6E7485]">
                  <span>Verified Anchor</span>
                  <span className="text-[#E8922D]">{pillar.metricNote}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory Governance Note */}
        <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E95A5]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E8922D]" />
            <span>
              {lang === 'ar'
                ? 'تستند جميع الرؤى الاستثمارية إلى الأطر التنظيمية الرسمية لـ دائرة الأراضي والأملاك بدبي (DLD) ومصرف الإمارات المركزي.'
                : 'All investment criteria are anchored in official Dubai Land Department (DLD) and UAE regulatory frameworks.'}
            </span>
          </div>
          <span className="font-mono text-[#E8922D] text-[11px] uppercase tracking-wider">
            DLD COMPLIANT
          </span>
        </div>
      </div>
    </section>
  );
};
