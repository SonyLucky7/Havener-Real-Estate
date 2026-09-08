'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { MapPin } from 'lucide-react';

interface LifestyleSectionProps {
  lang: Language;
}

const LIFESTYLE_MEDIA = [
  {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    title: {
      en: 'Architectural Skyline & Penthouses',
      ar: 'أفق دبي المعماري والقصور المعلقة',
    },
    location: {
      en: 'Downtown & Dubai Canal',
      ar: 'وسط المدينة وقناة دبي المائية',
    },
    tag: { en: 'Urban Elevation', ar: 'سمو حضري' },
  },
  {
    image: 'https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=1600&q=85',
    title: {
      en: 'Private Shoreline & Island Havens',
      ar: 'شواطئ خاصة وملاذات الجزر الفارهة',
    },
    location: {
      en: 'Palm Jumeirah & Palm Jebel Ali',
      ar: 'نخلة جميرا ونخلة جبل علي',
    },
    tag: { en: 'Maritime Serenity', ar: 'سكينة بحرية' },
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    title: {
      en: 'Turnkey Bespoke Interiors',
      ar: 'تصاميم داخلية مخصصة بأعلى المقاييس',
    },
    location: {
      en: 'Signature Waterfront Residences',
      ar: 'مساكن شاطئية استثنائية',
    },
    tag: { en: 'Italian Craftsmanship', ar: 'حرفية إيطالية' },
  },
];

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].lifestyle;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="lifestyle"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#050711] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-semibold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none mb-6 whitespace-pre-line">
            {t.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#B2B8C6] leading-relaxed font-light">
            {t.copy}
          </p>
        </div>

        {/* Interactive Full-Width Showcase */}
        <div className="space-y-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-[#080C1A]">
            <Image
              src={LIFESTYLE_MEDIA[activeIndex].image}
              alt={LIFESTYLE_MEDIA[activeIndex].title[lang]}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover transition-all duration-700 brightness-90"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050711] via-black/20 to-transparent" />

            {/* In-Image Caption Strip */}
            <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#F4B85C] font-mono block mb-2">
                  {LIFESTYLE_MEDIA[activeIndex].tag[lang]}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#F5F2EB] font-medium">
                  {LIFESTYLE_MEDIA[activeIndex].title[lang]}
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C0C5D2] mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E8922D]" />
                  <span>{LIFESTYLE_MEDIA[activeIndex].location[lang]}</span>
                </div>
              </div>

              {/* Counter Indicator */}
              <div className="font-mono text-sm tracking-widest text-[#8E95A5]">
                <span className="text-[#F5F2EB] font-bold">0{activeIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>0{LIFESTYLE_MEDIA.length}</span>
              </div>
            </div>
          </div>

          {/* Selector Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LIFESTYLE_MEDIA.map((item, index) => {
              const isCurrent = activeIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left rtl:text-right p-5 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white/[0.05] border-[#E8922D]/50 shadow-lg'
                      : 'bg-white/[0.01] border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase text-[#E8922D] font-mono block mb-1">
                    0{index + 1} · {item.tag[lang]}
                  </span>
                  <h4 className="text-sm font-semibold text-[#F5F2EB] truncate">
                    {item.title[lang]}
                  </h4>
                  <p className="text-xs text-[#8E95A5] mt-1 truncate">
                    {item.location[lang]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
