'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { ShieldCheck, Compass, Clock, TrendingUp } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;

  const icons = [
    <Compass key="0" className="w-4 h-4 text-[#C5A880]" />,
    <Clock key="1" className="w-4 h-4 text-[#C5A880]" />,
    <ShieldCheck key="2" className="w-4 h-4 text-[#C5A880]" />,
    <TrendingUp key="3" className="w-4 h-4 text-[#C5A880]" />,
  ];

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#08090C] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle gold radial ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
            {t.eyebrow}
          </span>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Massive Editorial Typography & Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-[1.1] mb-8 whitespace-pre-line">
              {t.headline}
            </h2>

            <div className="space-y-6 max-w-2xl text-[#C0C5D2] text-base sm:text-lg leading-relaxed">
              <p className="text-[#F5F2EB] font-normal border-l-2 border-[#C5A880] pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                {t.lead}
              </p>
              <p className="text-sm sm:text-base text-[#8E95A5]">
                {t.body}
              </p>
              <p className="text-xs sm:text-sm text-[#6E7485] italic font-light">
                {t.secondary}
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-12 w-full">
              {t.values.map((v, idx) => (
                <div
                  key={v.label}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-[#C5A880]/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-lg bg-[#C5A880]/10 group-hover:bg-[#C5A880]/20 transition-colors">
                      {icons[idx]}
                    </span>
                    <h3 className="text-sm font-semibold tracking-wide text-[#F5F2EB]">
                      {v.label}
                    </h3>
                  </div>
                  <p className="text-xs text-[#8E95A5] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Visual composition */}
          <div className="lg:col-span-5 relative">
            <div className="bezel-outer">
              <div className="bezel-inner relative overflow-hidden aspect-[4/5] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=85"
                  alt="Havener Property Dubai Architectural Real Estate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-80" />

                {/* Floating Architectural Annotation */}
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#060709]/80 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center justify-between text-[#C5A880] mb-1 font-mono text-[10px] tracking-widest uppercase">
                    <span>PRIVATE ARCHITECTURAL ADVISORY</span>
                    <span>EST. 2026</span>
                  </div>
                  <p className="text-[#B2B8C6] text-[11px] leading-snug">
                    Curating architectural masterpieces across Dubai&apos;s prime waterfront and luxury corridors.
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle floating gold stamp detail */}
            <div className="absolute -top-4 -right-4 hidden sm:flex w-20 h-20 rounded-full border border-[#C5A880]/30 items-center justify-center p-2 text-center text-[9px] uppercase tracking-widest text-[#C5A880] bg-[#060709]/90 backdrop-blur-md">
              <span>DUBAI LUXURY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
