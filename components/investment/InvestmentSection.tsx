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
    <Search key="0" className="w-5 h-5 text-[#2D3E8C]" />,
    <Compass key="1" className="w-5 h-5 text-[#E8922D]" />,
    <BarChart3 key="2" className="w-5 h-5 text-[#2D3E8C]" />,
    <CheckSquare key="3" className="w-5 h-5 text-[#E8922D]" />,
    <Key key="4" className="w-5 h-5 text-[#2D3E8C]" />,
    <TrendingUp key="5" className="w-5 h-5 text-[#E8922D]" />,
  ];

  return (
    <section
      id="investment"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-white border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block mb-3">
              {t.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none whitespace-pre-line mb-6 font-bold">
              {t.headline}
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
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
        <div className="relative border-l border-slate-200 rtl:border-l-0 rtl:border-r ml-4 sm:ml-8 rtl:ml-0 rtl:mr-4 sm:rtl:mr-8 pl-8 sm:pl-12 rtl:pl-0 rtl:pr-8 sm:rtl:pr-12 space-y-12">
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
                      ? 'bg-gradient-to-r from-[#2D3E8C] to-[#E8922D] text-white scale-110 shadow-md shadow-blue-900/20'
                      : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#2D3E8C]'
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
                      ? 'bg-gradient-to-r from-[#F5F8FF] to-white border-[#2D3E8C]/30 shadow-lg shadow-blue-950/5'
                      : 'bg-[#F8FAFC] border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-white shadow-xs text-[#2D3E8C] border border-slate-100">
                        {stepIcons[idx]}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors font-bold">
                        {step.number} — {step.title}
                      </h3>
                    </div>

                    <span className="text-xs uppercase tracking-wider text-[#E8922D] font-mono font-bold">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl pl-11 rtl:pl-0 rtl:pr-11 font-normal">
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
