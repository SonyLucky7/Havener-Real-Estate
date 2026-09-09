'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Language, Currency, Property } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { PROPERTIES_DATA } from '@/data/propertiesData';
import { motion, AnimatePresence } from 'motion/react';

export interface HeroSectionProps {
  lang: Language;
  onOpenConsultation: (propertyTitle?: string) => void;
  onSelectProperty?: (property: Property) => void;
  selectedProperty?: Property | null;
  onCloseDetail?: () => void;
  currency?: Currency;
}

interface FeaturedHeroItem {
  property: Property;
  ultra4kImage: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenConsultation,
}) => {
  const t = TRANSLATIONS[lang];

  // 4 Flagship 4K Residences
  const featuredResidences: FeaturedHeroItem[] = useMemo(() => {
    const propertySlugs = [
      'palm-crown-residence',
      'downtown-sky-horizon',
      'bulgari-lighthouse-mansions',
      'palm-jebel-ali-ocean-estates',
    ];

    const fallback4kImages = [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2048&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2048&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2048&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2048&q=80',
    ];

    return propertySlugs.map((slug, idx) => {
      const prop =
        PROPERTIES_DATA.find((p) => p.slug === slug) || PROPERTIES_DATA[idx % PROPERTIES_DATA.length];
      return {
        property: prop,
        ultra4kImage: fallback4kImages[idx % fallback4kImages.length],
      };
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = featuredResidences[activeIndex] || featuredResidences[0];
  const activeProperty = activeItem.property;

  // Continuous Automatic Smooth Image Cycle (every 5 seconds, pauses when tab is hidden)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        setActiveIndex((prev) => (prev + 1) % featuredResidences.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredResidences.length]);

  const handleScrollToProperties = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-32 pb-10 sm:pt-40 sm:pb-14 px-6 sm:px-12 overflow-hidden bg-[#0A0E24] text-white"
    >
      {/* ============================================================== */}
      {/* 1. CINEMATIC 4K PROPERTY IMAGE BACKGROUND (CONTINUOUS AUTO)    */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeItem.ultra4kImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeItem.ultra4kImage}
              alt={activeProperty.name[lang] || 'Dubai Luxury Property'}
              fill
              priority
              quality={82}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Delicate, subtle gradient scrim allowing the 4K property to shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E24] via-[#0A0E24]/30 to-[#0A0E24]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E24]/75 via-[#0A0E24]/20 to-transparent" />
      </div>

      {/* ============================================================== */}
      {/* 2. REFINED MINIMALIST EDITORIAL CONTENT (OVER IMAGE)           */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-5xl my-auto flex flex-col items-start pointer-events-auto">
        {/* Subtle Luxury Brand Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-mono text-slate-300 font-medium">
            {lang === 'ar' ? 'هافنر العقارية · دبي' : 'HAVENER PROPERTY · DUBAI'}
          </span>
        </motion.div>

        {/* Clean, Elegant, High-End Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.08] mb-4 drop-shadow-md"
        >
          {lang === 'ar' ? 'عقارات دبي الفاخرة.' : 'Dubai Luxury Real Estate.'}
        </motion.h1>

        {/* Simple, Understated Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-xl leading-relaxed mb-8 drop-shadow-xs"
        >
          {lang === 'ar'
            ? 'مساكن معمارية استثنائية وفرص استثمارية رائدة في أبرز وجهات دبي.'
            : 'Curated architectural residences and iconic investment opportunities.'}
        </motion.p>

        {/* Clean, Premium CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none"
        >
          {/* Primary CTA */}
          <a
            href="#properties"
            onClick={handleScrollToProperties}
            className="group h-12 px-7 rounded-full bg-white text-[#0A0E24] hover:bg-slate-100 font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>{t.hero.primaryCTA}</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#0A0E24] transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
          </a>

          {/* Secondary CTA */}
          <button
            onClick={() => onOpenConsultation(activeProperty.name[lang])}
            className="group h-12 px-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>{t.hero.secondaryCTA}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </button>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* 3. REFINED BOTTOM BAR: ACTIVE PROPERTY & AMBIENT INDICATOR     */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-slate-300 pointer-events-auto">
        {/* Active Property Subtle Caption */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8922D] animate-pulse" />
          <span className="font-serif text-sm font-medium text-white">
            {activeProperty.name[lang]}
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 text-xs font-light">
            {activeProperty.location[lang]}
          </span>
        </div>

        {/* Subtle Ambient Continuous Slide Progress Indicator (Clean lines, no buttons) */}
        <div className="flex items-center gap-1.5">
          {featuredResidences.map((_, idx) => (
            <span
              key={idx}
              className={`h-0.5 rounded-full transition-all duration-700 ${
                activeIndex === idx
                  ? 'w-8 bg-white'
                  : 'w-3 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
