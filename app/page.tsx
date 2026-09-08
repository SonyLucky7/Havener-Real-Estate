'use client';

import React, { useState, useEffect } from 'react';
import { Language, Currency, Property } from '@/lib/types';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { WhyDubaiSection } from '@/components/why-dubai/WhyDubaiSection';
import { PropertiesSection } from '@/components/properties/PropertiesSection';
import { InvestorCalculator } from '@/components/tools/InvestorCalculator';
import { PropertyDetailView } from '@/components/properties/PropertyDetailView';
import { InvestmentSection } from '@/components/investment/InvestmentSection';
import { LifestyleSection } from '@/components/lifestyle/LifestyleSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { TrustSection } from '@/components/trust/TrustSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';
import { ConsultationModal } from '@/components/contact/ConsultationModal';
import { AnimatePresence } from 'motion/react';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('AED');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefilledProperty, setPrefilledProperty] = useState<string | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Sync document direction and language attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleLanguageToggle = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleOpenConsultation = (propertyName?: string) => {
    setPrefilledProperty(propertyName);
    setIsConsultationOpen(true);
  };

  return (
    <div
      className={`min-h-screen bg-white text-[#0A0E24] flex flex-col selection:bg-[#E8922D]/20 selection:text-[#0A0E24] ${
        lang === 'ar' ? 'font-sans' : 'font-sans'
      }`}
    >
      {/* Navigation */}
      <Navbar
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Hero Section with 3D Architectural Scene */}
      <HeroSection
        lang={lang}
        currency={currency}
        onOpenConsultation={() => handleOpenConsultation()}
        onSelectProperty={setSelectedProperty}
        selectedProperty={null}
        onCloseDetail={() => setSelectedProperty(null)}
      />

      {/* About Havener Property */}
      <AboutSection lang={lang} />

      {/* Why Dubai Storytelling & Verified Economic Pillars */}
      <WhyDubaiSection lang={lang} />

      {/* Curated Opportunities & Property Discovery */}
      <PropertiesSection
        lang={lang}
        currency={currency}
        onCurrencyChange={setCurrency}
        onInquireProperty={(propName) => handleOpenConsultation(propName)}
        onSelectEditorialProperty={setSelectedProperty}
        onSelectProperty={setSelectedProperty}
      />

      {/* Institutional Investor Yield, Tax Arbitrage & Golden Visa Calculator */}
      <InvestorCalculator
        lang={lang}
        currency={currency}
        onOpenConsultation={(summary) => handleOpenConsultation(summary)}
      />

      {/* Investment Methodology Timeline */}
      <InvestmentSection
        lang={lang}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Dubai Lifestyle & Visual Showcase */}
      <LifestyleSection lang={lang} />

      {/* Refined Private Advisory Services */}
      <ServicesSection
        lang={lang}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Trust, Governance & Developer Network */}
      <TrustSection lang={lang} />

      {/* Private Consultation & Direct Concierge */}
      <ContactSection lang={lang} />

      {/* Minimal Architectural Footer */}
      <Footer
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        lang={lang}
        prefilledProperty={prefilledProperty}
      />

      {/* Editorial Property Detail View Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailView
            key={selectedProperty.slug}
            property={selectedProperty}
            lang={lang}
            currency={currency}
            onClose={() => setSelectedProperty(null)}
            onInquire={(prop) => handleOpenConsultation(prop?.name[lang])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
