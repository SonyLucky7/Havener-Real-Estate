'use client';

import React from 'react';
import Image from 'next/image';
import { Property, Language, Currency } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { formatPrice } from '@/lib/utils';
import { MapPin, ArrowUpRight } from 'lucide-react';

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
  const isRtl = lang === 'ar';

  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="group cursor-pointer bezel-outer transition-all duration-500 hover:border-[#C5A880]/40 hover:-translate-y-1"
    >
      <div className="bezel-inner overflow-hidden flex flex-col">
        {/* Large Editorial Image Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0B0E]">
          <Image
            src={property.image}
            alt={property.name[lang]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-black/20 to-transparent" />

          {/* Top Tag Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-[#060709]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-[#E5C38C]">
              {property.categoryLabel[lang]}
            </span>

            <span className="px-3 py-1 rounded-full bg-[#060709]/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-medium text-[#C0C5D2]">
              {property.tag[lang]}
            </span>
          </div>

          {/* Bottom Floating Price Strip */}
          <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white pointer-events-none">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#8E95A5] block">
                {t.startingFrom}
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#F5F2EB]">
                {formatPrice(property.priceAED, currency, lang)}
              </span>
            </div>

            <div className="text-right rtl:text-left text-[11px] text-[#C5A880] font-mono">
              <span>{property.paymentPlan[lang]}</span>
            </div>
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-[#0B0D12]">
          <div>
            {/* Title & Location */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EB] group-hover:text-[#D8B682] transition-colors leading-snug">
                  {property.name[lang]}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#8E95A5] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{property.location[lang]}</span>
                  <span className="text-white/20">·</span>
                  <span className="truncate">{property.subLocation[lang]}</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-9 h-9 rounded-full bg-white/[0.04] group-hover:bg-[#C5A880] text-[#F5F2EB] group-hover:text-[#08090C] border border-white/10 flex items-center justify-center transition-all duration-300 shrink-0">
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform ${
                    isRtl
                      ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5'
                      : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  }`}
                />
              </div>
            </div>

            {/* Investment Positioning Copy */}
            <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed line-clamp-2 my-4">
              {property.investmentPositioning[lang]}
            </p>
          </div>

          {/* Key Specs Bar */}
          <div className="pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center text-xs text-[#8E95A5]">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-[#5A6070]">
                {lang === 'ar' ? 'المساحة' : 'Footprint'}
              </span>
              <span className="text-[#F5F2EB] font-medium text-[11px] truncate">
                {property.sizeSqFt}
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-wider text-[#5A6070]">
                {lang === 'ar' ? 'الغرف' : 'Bedrooms'}
              </span>
              <span className="text-[#F5F2EB] font-medium text-[11px] truncate">
                {property.bedrooms[lang]}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-[#5A6070]">
                {t.completionDate}
              </span>
              <span className="text-[#E5C38C] font-medium text-[11px] truncate">
                {property.completion[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
