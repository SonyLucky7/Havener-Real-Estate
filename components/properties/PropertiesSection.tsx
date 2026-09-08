'use client';

import React, { useState } from 'react';
import { Property, Language, Currency, PropertyCategory } from '@/lib/types';
import { PROPERTIES_DATA } from '@/data/propertiesData';
import { TRANSLATIONS } from '@/data/translations';
import { PropertyCard } from './PropertyCard';
import { PropertyDrawer } from './PropertyDrawer';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';

interface PropertiesSectionProps {
  lang: Language;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onInquireProperty: (propertyName: string) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  lang,
  currency,
  onCurrencyChange,
  onInquireProperty,
}) => {
  const t = TRANSLATIONS[lang].properties;
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories: { id: PropertyCategory; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'off-plan', label: t.filterOffPlan },
    { id: 'apartments', label: t.filterApartments },
    { id: 'villas', label: t.filterVillas },
    { id: 'waterfront', label: t.filterWaterfront },
    { id: 'branded', label: t.filterBranded },
    { id: 'investment', label: t.filterInvestment },
  ];

  const filteredProperties =
    activeCategory === 'all'
      ? PROPERTIES_DATA
      : PROPERTIES_DATA.filter((p) => p.category === activeCategory);

  const handleOpenProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDrawerOpen(true);
  };

  const handleInquireFromDrawer = (property: Property) => {
    setIsDrawerOpen(false);
    onInquireProperty(`${property.name[lang]} (${property.location[lang]})`);
  };

  return (
    <section
      id="properties"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#060709] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block mb-3">
              {t.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none mb-4">
              {t.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed">
              {t.subhead}
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#8E95A5] hidden sm:inline">
              {t.currency}:
            </span>
            <CurrencyToggle
              currentCurrency={currency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C5A880] text-[#08090C] shadow-md shadow-[#C5A880]/20'
                    : 'bg-white/[0.03] text-[#8E95A5] hover:text-[#F5F2EB] hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              lang={lang}
              currency={currency}
              onSelectProperty={handleOpenProperty}
            />
          ))}
        </div>

        {/* Empty state safeguard if category is empty */}
        {filteredProperties.length === 0 && (
          <div className="py-20 text-center bezel-outer">
            <div className="bezel-inner p-10">
              <p className="text-[#8E95A5] text-sm mb-4">
                {lang === 'ar'
                  ? 'لا توجد عقارات مطابقة حالياً ضمن هذه الفئة.'
                  : 'No properties currently listed in this specific category.'}
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs text-[#C5A880] uppercase tracking-wider underline font-medium"
              >
                {lang === 'ar' ? 'عرض كافة العقارات' : 'View all properties'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Slide-over Quick View Drawer */}
      <PropertyDrawer
        property={selectedProperty}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        lang={lang}
        currency={currency}
        onInquire={handleInquireFromDrawer}
      />
    </section>
  );
};
