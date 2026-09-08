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
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-white border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none mb-6 whitespace-pre-line font-bold">
            {t.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.copy}
          </p>
        </div>

        {/* Interactive Full-Width Showcase */}
        <div className="space-y-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5">
            <Image
              src={LIFESTYLE_MEDIA[activeIndex].image}
              alt={LIFESTYLE_MEDIA[activeIndex].title[lang]}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover transition-all duration-700 brightness-95"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* In-Image Caption Strip */}
            <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#FDE68A] font-mono block mb-2 font-bold">
                  {LIFESTYLE_MEDIA[activeIndex].tag[lang]}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-bold drop-shadow-xs">
                  {LIFESTYLE_MEDIA[activeIndex].title[lang]}
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E8922D]" />
                  <span>{LIFESTYLE_MEDIA[activeIndex].location[lang]}</span>
                </div>
              </div>

              {/* Counter Indicator */}
              <div className="font-mono text-sm tracking-widest text-slate-300">
                <span className="text-white font-bold">0{activeIndex + 1}</span>
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
                  className={`text-left rtl:text-right p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-white border-[#2D3E8C] shadow-md ring-1 ring-[#2D3E8C]/20'
                      : 'bg-[#F8FAFC] border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase text-[#E8922D] font-mono block mb-1 font-bold">
                    0{index + 1} · {item.tag[lang]}
                  </span>
                  <h4 className="text-sm font-bold text-[#0A0E24] truncate">
                    {item.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 truncate font-medium">
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
