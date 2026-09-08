'use client';

import React from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { ArrowUpRight } from 'lucide-react';

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
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none whitespace-pre-line font-bold">
            {t.headline}
          </h2>
        </div>

        {/* Editorial Structured Services List */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {t.servicesList.map((service, idx) => (
            <div
              key={service.title}
              onClick={onOpenConsultation}
              className="group py-10 sm:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/90 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-300 cursor-pointer"
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

                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#2D3E8C] text-slate-700 group-hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs">
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isRtl
                        ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                        : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
