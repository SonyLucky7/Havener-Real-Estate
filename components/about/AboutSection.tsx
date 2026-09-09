'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Compass, Clock, ShieldCheck, TrendingUp } from 'lucide-react';
import { RevealText, PopIn, StaggerGroup, StaggerItem, Parallax } from '@/components/ui/MotionPrimitives';
import { motion } from 'motion/react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;

  const icons = [
    <Compass key="0" className="w-4 h-4 text-[#0A0E24]" strokeWidth={1.5} />,
    <Clock key="1" className="w-4 h-4 text-[#0A0E24]" strokeWidth={1.5} />,
    <ShieldCheck key="2" className="w-4 h-4 text-[#0A0E24]" strokeWidth={1.5} />,
    <TrendingUp key="3" className="w-4 h-4 text-[#0A0E24]" strokeWidth={1.5} />,
  ];

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-t border-slate-200/80 overflow-hidden"
    >
      {/* Radiant ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#2D3E8C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E8922D]/6 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <PopIn className="mb-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold">
            {t.eyebrow}
          </span>
        </PopIn>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Typography & Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <RevealText
              text={t.headline.replace('\n', ' ')}
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-[1.1] mb-8 font-bold"
            />

            <PopIn delay={0.2} className="space-y-6 max-w-2xl text-slate-700 text-base sm:text-lg leading-relaxed">
              <p className="text-[#0A0E24] font-medium border-l-3 border-[#2D3E8C] pl-4 rtl:border-l-0 rtl:border-r-3 rtl:pl-0 rtl:pr-4">
                {t.lead}
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                {t.body}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 italic font-normal">
                {t.secondary}
              </p>
            </PopIn>

            {/* Values Grid with Staggered Entrance */}
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-12 w-full">
              {t.values.map((v, idx) => (
                <StaggerItem key={v.label}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2D3E8C]/40 shadow-xs hover:shadow-md transition-all group h-full"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#0A0E24] shrink-0">
                        {icons[idx]}
                      </span>
                      <h3 className="text-sm font-bold tracking-wide text-[#0A0E24]">
                        {v.label}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Right Column: Architectural Visual composition with Parallax */}
          <div className="lg:col-span-5 relative">
            <PopIn delay={0.25} scale={0.95}>
              <div className="bezel-outer">
                <div className="bezel-inner relative overflow-hidden aspect-[4/5] w-full">
                  <Parallax offset={25}>
                    <div className="relative aspect-[4/5] w-full scale-110">
                      <Image
                        src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=85"
                        alt="Havener Property Dubai Architectural Real Estate"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Floating Architectural Annotation */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-xs"
                  >
                    <div className="flex items-center justify-between text-[#2D3E8C] mb-1 font-mono text-[10px] tracking-widest uppercase font-bold">
                      <span>PRIVATE ARCHITECTURAL ADVISORY</span>
                      <span className="text-[#E8922D]">EST. 2026</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-snug">
                      Curating architectural masterpieces across Dubai&apos;s prime waterfront and luxury corridors.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Floating brand stamp detail */}
              <motion.div
                initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-4 -right-4 hidden sm:flex w-20 h-20 rounded-full border border-[#2D3E8C]/30 items-center justify-center p-2 text-center text-[9px] uppercase tracking-widest text-[#2D3E8C] bg-white/95 backdrop-blur-md shadow-md font-bold"
              >
                <span>DUBAI LUXURY</span>
              </motion.div>
            </PopIn>
          </div>
        </div>
      </div>
    </section>
  );
};
