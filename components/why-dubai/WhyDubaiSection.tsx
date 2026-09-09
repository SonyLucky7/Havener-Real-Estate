'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Landmark, Building2, TrendingUp, Globe2, Sun, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealText, PopIn, StaggerGroup, StaggerItem } from '@/components/ui/MotionPrimitives';
import { motion } from 'motion/react';

interface WhyDubaiSectionProps {
  lang: Language;
}

export const WhyDubaiSection: React.FC<WhyDubaiSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].whyDubai;
  const [activePillar, setActivePillar] = useState(0);

  const pillarIcons = [
    <Landmark key="0" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <Building2 key="1" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <TrendingUp key="2" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <Globe2 key="3" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <Sun key="4" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <ShieldCheck key="5" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
  ];

  return (
    <section
      id="why-dubai"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-white border-t border-slate-200/80 overflow-hidden"
    >
      {/* Radiant ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#E8922D]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-[#2D3E8C]/6 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <PopIn className="mb-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block">
              {t.eyebrow}
            </span>
          </PopIn>
          <RevealText
            text={t.headline}
            as="h2"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none mb-6 font-bold"
          />
          <PopIn delay={0.2}>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
              {t.supporting}
            </p>
          </PopIn>
        </div>

        {/* Dynamic Architectural Grid with Staggered Motion */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.07}>
          {t.pillars.map((pillar, index) => {
            const isSelected = activePillar === index;

            return (
              <StaggerItem key={pillar.number}>
                <motion.div
                  onClick={() => setActivePillar(index)}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'group relative p-8 rounded-3xl transition-all duration-400 cursor-pointer overflow-hidden border h-full',
                    isSelected
                      ? 'bg-gradient-to-b from-[#F5F8FF] to-white border-[#2D3E8C]/40 shadow-xl shadow-blue-950/5 ring-2 ring-[#2D3E8C]/15'
                      : 'bg-[#F8FAFC] border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-md'
                  )}
                >
                  {/* Micro Number & Metric Pill */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-2xl tracking-widest text-[#2D3E8C]/60 group-hover:text-[#2D3E8C] transition-colors font-bold">
                      {pillar.number}
                    </span>
                    <motion.div
                      animate={{ scale: isSelected ? 1.05 : 1 }}
                      className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0A0E24]"
                    >
                      {pillar.metric}
                    </motion.div>
                  </div>

                  {/* Pillar Title & 2D Icon */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[#0A0E24] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {pillarIcons[index]}
                    </span>
                    <h3 className="font-serif text-lg tracking-wide text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors font-bold">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Pillar Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>

                  {/* Verified Data Note */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-medium">Verified Anchor</span>
                    <span className="text-[#2D3E8C] font-semibold">{pillar.metricNote}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Regulatory Governance Note */}
        <PopIn delay={0.4} className="mt-16">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E8922D] animate-pulse" />
              <span className="font-medium">
                {lang === 'ar'
                  ? 'تستند جميع الرؤى الاستثمارية إلى الأطر التنظيمية الرسمية لـ دائرة الأراضي والأملاك بدبي (DLD) ومصرف الإمارات المركزي.'
                  : 'All investment criteria are anchored in official Dubai Land Department (DLD) and UAE regulatory frameworks.'}
              </span>
            </div>
            <span className="font-mono text-[#2D3E8C] text-[11px] uppercase tracking-wider font-bold">
              DLD COMPLIANT
            </span>
          </div>
        </PopIn>
      </div>
    </section>
  );
};
