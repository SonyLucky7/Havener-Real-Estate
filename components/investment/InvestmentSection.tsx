'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { Search, Compass, BarChart3, CheckSquare, Key, TrendingUp } from 'lucide-react';

interface InvestmentSectionProps {
  lang: Language;
  onOpenConsultation: () => void;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang].investment;
  const isRtl = lang === 'ar';
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [
    <Search key="0" className="w-5 h-5 text-[#E8922D]" />,
    <Compass key="1" className="w-5 h-5 text-[#E8922D]" />,
    <BarChart3 key="2" className="w-5 h-5 text-[#E8922D]" />,
    <CheckSquare key="3" className="w-5 h-5 text-[#E8922D]" />,
    <Key key="4" className="w-5 h-5 text-[#E8922D]" />,
    <TrendingUp key="5" className="w-5 h-5 text-[#E8922D]" />,
  ];

  return (
    <section
      id="investment"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#080C1A] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-semibold block mb-3">
              {t.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none whitespace-pre-line mb-6">
              {t.headline}
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <p className="text-base sm:text-lg text-[#B2B8C6] leading-relaxed font-light mb-8">
              {t.copy}
            </p>

            <div>
              <Button
                variant="gold"
                size="md"
                onClick={onOpenConsultation}
                isRtl={isRtl}
              >
                {lang === 'ar' ? 'ابدأ خطتك الاستثمارية' : 'Initiate Investment Briefing'}
              </Button>
            </div>
          </div>
        </div>

        {/* 6-Step Vertical Timeline with Interactive Stepper */}
        <div className="relative border-l border-white/[0.08] rtl:border-l-0 rtl:border-r ml-4 sm:ml-8 rtl:ml-0 rtl:mr-4 sm:rtl:mr-8 pl-8 sm:pl-12 rtl:pl-0 rtl:pr-8 sm:rtl:pr-12 space-y-12">
          {t.steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStepIndex(idx)}
                className="group relative cursor-pointer"
              >
                {/* Timeline Dot Node */}
                <div
                  className={`absolute -left-[45px] sm:-left-[61px] rtl:-left-auto rtl:-right-[45px] sm:rtl:-right-[61px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E8922D] text-[#070A16] scale-110 shadow-lg shadow-[#E8922D]/30'
                      : 'bg-[#0C1024] border border-white/20 text-[#8E95A5] group-hover:border-[#E8922D]'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold">
                    {step.number}
                  </span>
                </div>

                {/* Timeline Content Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-gradient-to-r from-white/[0.04] to-transparent border-[#E8922D]/40 shadow-xl'
                      : 'bg-white/[0.01] border-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-white/[0.04] text-[#E8922D]">
                        {stepIcons[idx]}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] group-hover:text-[#F0A845] transition-colors">
                        {step.number} — {step.title}
                      </h3>
                    </div>

                    <span className="text-xs uppercase tracking-wider text-[#E8922D] font-mono">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed max-w-3xl pl-11 rtl:pl-0 rtl:pr-11 font-light">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
