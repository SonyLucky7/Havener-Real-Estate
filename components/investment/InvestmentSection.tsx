'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { Search, Compass, BarChart3, CheckSquare, Key, TrendingUp } from 'lucide-react';
import { RevealText, PopIn } from '@/components/ui/MotionPrimitives';
import { motion } from 'motion/react';

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
    <Search key="0" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <Compass key="1" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <BarChart3 key="2" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <CheckSquare key="3" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <Key key="4" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
    <TrendingUp key="5" className="w-5 h-5 text-[#0A0E24]" strokeWidth={1.5} />,
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
            <PopIn className="mb-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block">
                {t.eyebrow}
              </span>
            </PopIn>
            <RevealText
              text={t.headline.replace('\n', ' ')}
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none mb-6 font-bold"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <PopIn delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
                {t.copy}
              </p>
            </PopIn>

            <PopIn delay={0.3}>
              <Button
                variant="gold"
                size="md"
                onClick={onOpenConsultation}
                isRtl={isRtl}
                className="w-full sm:w-auto"
              >
                {lang === 'ar' ? 'ابدأ خطتك الاستثمارية' : 'Initiate Investment Briefing'}
              </Button>
            </PopIn>
          </div>
        </div>

        {/* 6-Step Vertical Timeline with Staggered Scroll Animation */}
        <div className="relative border-l-2 border-slate-200 rtl:border-l-0 rtl:border-r-2 ml-4 sm:ml-8 rtl:ml-0 rtl:mr-4 sm:rtl:mr-8 pl-8 sm:pl-12 rtl:pl-0 rtl:pr-8 sm:rtl:pr-12 space-y-12">
          {t.steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;

            return (
              <PopIn key={step.number} delay={idx * 0.08} yOffset={25}>
                <div
                  onMouseEnter={() => setActiveStepIndex(idx)}
                  className="group relative cursor-pointer"
                >
                  {/* Timeline Dot Node */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.18 : 1,
                    }}
                    className={`absolute -left-[45px] sm:-left-[61px] rtl:-left-auto rtl:-right-[45px] sm:rtl:-right-[61px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2D3E8C] to-[#E8922D] text-white shadow-md shadow-blue-900/20 ring-4 ring-amber-500/20'
                        : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-[#2D3E8C]'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Timeline Content Card */}
                  <motion.div
                    whileHover={{ x: isRtl ? -6 : 6, transition: { duration: 0.2 } }}
                    className={`p-6 sm:p-8 rounded-3xl transition-all duration-400 border ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F5F8FF] to-white border-[#2D3E8C]/35 shadow-lg shadow-blue-950/5 ring-1 ring-[#2D3E8C]/10'
                        : 'bg-[#F8FAFC] border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[#0A0E24] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
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
                  </motion.div>
                </div>
              </PopIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
