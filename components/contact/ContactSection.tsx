'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import { Phone, MessageCircle, Mail, MapPin, Shield, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].contact;
  const isRtl = lang === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    interestedIn: t.interests[0],
    budget: t.budgets[1],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#E8922D', '#F0A845', '#2D3E8C'],
        });
      } catch {
        // Fallback
      }
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#080C1A] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Direct Concierge Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-semibold block mb-3">
                {t.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EB] tracking-tight leading-none mb-6 whitespace-pre-line">
                {t.headline}
              </h2>
              <p className="text-base sm:text-lg text-[#B2B8C6] leading-relaxed font-light mb-12">
                {t.supporting}
              </p>
            </div>

            {/* Direct Concierge Cards */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#E8922D] font-mono mb-4">
                {t.directContact.title}
              </h3>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/97140000000?text=${encodeURIComponent(
                  lang === 'ar'
                    ? 'مرحباً، أود الاستفسار عن فرص العقارات الفاخرة في دبي مع هافنر العقارية.'
                    : 'Hello, I would like to inquire about luxury property opportunities in Dubai with Havener Property.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E8922D]/40 flex items-center gap-4 transition-all duration-300 group"
              >
                <span className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E7485] block">
                    {t.directContact.whatsappLabel}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F2EB] group-hover:text-[#F0A845] transition-colors">
                    {t.directContact.whatsappValue}
                  </span>
                </div>
              </a>

              {/* Phone Direct */}
              <a
                href="tel:+97140000000"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E8922D]/40 flex items-center gap-4 transition-all duration-300 group"
              >
                <span className="p-2.5 rounded-xl bg-[#E8922D]/10 text-[#E8922D] group-hover:bg-[#E8922D]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E7485] block">
                    {t.directContact.phoneLabel}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F2EB] group-hover:text-[#F0A845] transition-colors">
                    {t.directContact.phoneValue}
                  </span>
                </div>
              </a>

              {/* Email Direct */}
              <a
                href="mailto:concierge@havenerproperty.com"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E8922D]/40 flex items-center gap-4 transition-all duration-300 group"
              >
                <span className="p-2.5 rounded-xl bg-[#E8922D]/10 text-[#E8922D] group-hover:bg-[#E8922D]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E7485] block">
                    {t.directContact.emailLabel}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F2EB] group-hover:text-[#F0A845] transition-colors">
                    {t.directContact.emailValue}
                  </span>
                </div>
              </a>

              {/* Office Location */}
              <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex items-start gap-4">
                <span className="p-2.5 rounded-xl bg-white/[0.04] text-[#8E95A5] mt-0.5">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E7485] block">
                    {t.directContact.officeLabel}
                  </span>
                  <span className="text-xs text-[#B2B8C6] block mt-0.5 leading-relaxed">
                    {t.directContact.officeValue}
                  </span>
                  <span className="text-[11px] text-[#6E7485] block mt-1">
                    {t.directContact.hoursValue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Form */}
          <div className="lg:col-span-7">
            <div className="bezel-outer">
              <div className="bezel-inner p-6 sm:p-10">
                {isSuccess ? (
                  <div className="py-16 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#E8922D]/15 border border-[#E8922D]/40 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-[#E8922D]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F2EB] mb-4">
                      {t.form.successHeadline}
                    </h3>
                    <p className="text-[#8E95A5] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                      {t.form.successMessage}
                    </p>
                    <Button
                      variant="gold"
                      onClick={() => setIsSuccess(false)}
                      isRtl={isRtl}
                    >
                      {t.form.sendAnother}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.fullName} *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={t.form.fullNamePlaceholder}
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.email} *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder={t.form.emailPlaceholder}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder={t.form.phonePlaceholder}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.country}
                        </label>
                        <input
                          type="text"
                          placeholder={t.form.countryPlaceholder}
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.interestedIn}
                        </label>
                        <select
                          value={formData.interestedIn}
                          onChange={(e) =>
                            setFormData({ ...formData, interestedIn: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0C1024] border border-white/10 text-[#F5F2EB] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors cursor-pointer"
                        >
                          {t.interests.map((item) => (
                            <option key={item} value={item} className="bg-[#0C1024] text-white">
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                          {t.form.budget}
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0C1024] border border-white/10 text-[#F5F2EB] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors cursor-pointer"
                        >
                          {t.budgets.map((b) => (
                            <option key={b} value={b} className="bg-[#0C1024] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-2 font-medium">
                        {t.form.message}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t.form.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors resize-none"
                      />
                    </div>

                    {/* Fiduciary compliance notice */}
                    <div className="flex items-center gap-2.5 text-xs text-[#8E95A5] pt-1">
                      <Shield className="w-4 h-4 text-[#E8922D] shrink-0" />
                      <span>
                        {lang === 'ar'
                          ? 'استشارة سرية ومحمية ائتمانياً. لا تتم مشاركة بياناتك مع أطراف خارجية دون إذنك.'
                          : 'Strict fiduciary confidentiality. Your data is protected and never sold.'}
                      </span>
                    </div>

                    <div className="pt-3">
                      <Button
                        type="submit"
                        variant="gold"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                        icon={<Send className="w-4 h-4" />}
                        isRtl={isRtl}
                      >
                        {isSubmitting ? t.form.submitting : t.form.submitCTA}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
