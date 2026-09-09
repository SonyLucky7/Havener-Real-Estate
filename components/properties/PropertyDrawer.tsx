'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Property, Language, Currency } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { formatPrice } from '@/lib/utils';
import { X, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PropertyDrawerProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currency: Currency;
  onInquire: (property: Property) => void;
}

export const PropertyDrawer: React.FC<PropertyDrawerProps> = ({
  property,
  isOpen,
  onClose,
  lang,
  currency,
  onInquire,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const t = TRANSLATIONS[lang].properties;
  const isRtl = lang === 'ar';
  const activeImage = property.gallery[selectedImageIndex] || property.image;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`relative w-full max-w-2xl bg-white border-${
          isRtl ? 'r' : 'l'
        } border-slate-200 shadow-2xl h-full flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-${
          isRtl ? 'left' : 'right'
        } duration-400`}
      >
        {/* Top Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white/95 backdrop-blur-xl border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] uppercase tracking-wider font-bold text-[#0A0E24]">
              {property.categoryLabel[lang]}
            </span>
            <span className="text-xs text-slate-500 font-mono font-medium">
              REF: {property.slug.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-[#0A0E24] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Hero Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={activeImage}
                alt={property.name[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail selector if gallery has multiple photos */}
            {property.gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {property.gallery.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#2D3E8C] scale-95 shadow-xs'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Valuation */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0A0E24] tracking-tight mb-2 font-bold">
              {property.name[lang]}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <MapPin className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
              <span>{property.location[lang]}</span>
              <span className="text-slate-300">|</span>
              <span>{property.subLocation[lang]}</span>
            </div>

            {/* Price & Plan Strip */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1 font-medium">
                  {t.startingFrom}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-[#0A0E24] font-bold">
                  {formatPrice(property.priceAED, currency, lang)}
                </span>
              </div>

              <div className="sm:text-right rtl:sm:text-left border-t sm:border-t-0 sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-slate-200 pt-3 sm:pt-0 sm:pl-6 rtl:sm:pl-0 rtl:sm:pr-6">
                <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1 font-medium">
                  {t.paymentPlan}
                </span>
                <span className="text-sm font-bold text-[#2D3E8C]">
                  {property.paymentPlan[lang]}
                </span>
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-medium">
                {lang === 'ar' ? 'المطور' : 'Developer'}
              </span>
              <span className="text-[#0A0E24] font-bold leading-tight block">
                {property.developer}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-medium">
                {lang === 'ar' ? 'الغرف' : 'Bedrooms'}
              </span>
              <span className="text-[#0A0E24] font-bold leading-tight block">
                {property.bedrooms[lang]}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-medium">
                {lang === 'ar' ? 'المساحة الإجمالية' : 'Built-Up Area'}
              </span>
              <span className="text-[#0A0E24] font-bold leading-tight block">
                {property.sizeSqFt}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-medium">
                {t.completionDate}
              </span>
              <span className="text-[#2D3E8C] font-bold leading-tight block">
                {property.completion[lang]}
              </span>
            </div>
          </div>

          {/* Payment Milestone Structure */}
          {property.paymentMilestones.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#2D3E8C] mb-4">
                {lang === 'ar' ? 'هيكل خطة السداد' : 'Structured Milestone Breakdown'}
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {property.paymentMilestones.map((milestone, i) => (
                  <div key={i} className="text-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xl font-serif font-bold text-[#0A0E24] block">
                      {milestone.percentage}%
                    </span>
                    <span className="text-[11px] text-slate-600 block mt-1 leading-snug font-medium">
                      {milestone.stage[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#2D3E8C] mb-2">
              {lang === 'ar' ? 'الرؤية المعمارية' : 'Architectural Narrative'}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {property.description[lang]}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#2D3E8C] mb-3">
              {t.keyHighlights}
            </h4>
            <div className="space-y-2.5">
              {property.highlights[lang].map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-[#0A0E24] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#0A0E24]" strokeWidth={2} />
                  </span>
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-6 bg-white border-t border-slate-200">
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            isRtl={isRtl}
            onClick={() => {
              onClose();
              onInquire(property);
            }}
          >
            {t.inquireCTA}
          </Button>
          <p className="text-[10px] text-center text-slate-500 mt-3 font-medium">
            {lang === 'ar'
              ? 'تخضع الأسعار وحالة التوفر للتأكيد المباشر مع المطور.'
              : 'Pricing and allocation subject to developer verification.'}
          </p>
        </div>
      </div>
    </div>
  );
};
