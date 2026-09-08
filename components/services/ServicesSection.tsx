'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { ArrowUpRight } from 'lucide-react';
import { RevealText, PopIn, StaggerGroup, StaggerItem } from '@/components/ui/MotionPrimitives';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  lang: Language;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang].services;
  const isRtl = lang === 'ar';

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#F8FAFC] to-white border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <PopIn className="mb-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block">
              {t.eyebrow}
            </span>
          </PopIn>
          <RevealText
            text={t.headline.replace('\n', ' ')}
            as="h2"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none whitespace-pre-line font-bold"
          />
        </div>

        {/* Editorial Structured Services List with Staggered Motion */}
        <StaggerGroup className="divide-y divide-slate-200 border-y border-slate-200">
          {t.servicesList.map((service, idx) => (
            <StaggerItem key={service.title}>
              <motion.div
                onClick={onOpenConsultation}
                whileHover={{ x: isRtl ? -8 : 8, backgroundColor: 'rgba(241, 245, 249, 0.7)' }}
                transition={{ duration: 0.25 }}
                className="group py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-colors cursor-pointer"
              >
                {/* Number and Title */}
                <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                  <span className="font-mono text-sm tracking-widest text-[#2D3E8C]/70 group-hover:text-[#2D3E8C] transition-colors font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors font-bold">
                    {service.title}
                  </h3>
                </div>

                {/* Description & Action */}
                <div className="flex items-center justify-between lg:justify-end gap-8 lg:max-w-xl">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {service.desc}
                  </p>

                  <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#2D3E8C] text-slate-700 group-hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-110">
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isRtl
                          ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                          : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};
