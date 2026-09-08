'use client';

import React from 'react';
import Image from 'next/image';
import { Property, Language, Currency } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { formatPrice } from '@/lib/utils';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
  lang: Language;
  currency: Currency;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  lang,
  currency,
  onSelectProperty,
}) => {
  const t = TRANSLATIONS[lang].properties;

  return (
    <motion.div
      onClick={() => onSelectProperty(property)}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      whileTap={{ scale: 0.99 }}
      className="group cursor-pointer bezel-outer transition-shadow duration-500 hover:shadow-xl hover:shadow-blue-950/10"
    >
      <div className="bezel-inner overflow-hidden flex flex-col">
        {/* Large Editorial Image Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={property.image}
            alt={property.name[lang]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Tag Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] uppercase tracking-wider font-bold text-[#2D3E8C] shadow-xs">
              {property.categoryLabel[lang]}
            </span>

            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-semibold text-white">
              {property.tag[lang]}
            </span>
          </div>

          {/* Bottom Floating Price Strip */}
          <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white pointer-events-none">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-medium">
                {t.startingFrom}
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-xs">
                {formatPrice(property.priceAED, currency, lang)}
              </span>
            </div>

            <div className="text-right rtl:text-left text-[11px] text-[#FDE68A] font-mono font-semibold">
              <span>{property.paymentPlan[lang]}</span>
            </div>
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
          <div>
            {/* Title & Location */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors leading-snug font-bold">
                  {property.name[lang]}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E8922D] shrink-0" />
                  <span>{property.location[lang]}</span>
                  <span className="text-slate-300">·</span>
                  <span className="truncate">{property.subLocation[lang]}</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#2D3E8C] text-slate-700 group-hover:text-white border border-slate-200 flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:scale-105">
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform ${
                    lang === 'ar'
                      ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                      : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  }`}
                />
              </div>
            </div>

            {/* Investment Positioning Copy */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 my-4">
              {property.investmentPositioning[lang]}
            </p>
          </div>

          {/* Key Specs Bar */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                {lang === 'ar' ? 'المساحة' : 'Footprint'}
              </span>
              <span className="text-[#0A0E24] font-semibold text-[11px] truncate mt-0.5">
                {property.sizeSqFt}
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-100">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                {lang === 'ar' ? 'الغرف' : 'Bedrooms'}
              </span>
              <span className="text-[#0A0E24] font-semibold text-[11px] truncate mt-0.5">
                {property.bedrooms[lang]}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                {t.completionDate}
              </span>
              <span className="text-[#2D3E8C] font-semibold text-[11px] truncate mt-0.5">
                {property.completion[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
