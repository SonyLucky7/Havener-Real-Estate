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
          colors: ['#2D3E8C', '#E8922D', '#F59E0B'],
        });
      } catch {
        // Fallback
      }
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F4F6FB] border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Direct Concierge Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-bold block mb-3">
                {t.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0A0E24] tracking-tight leading-none mb-6 whitespace-pre-line font-bold">
                {t.headline}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-12">
                {t.supporting}
              </p>
            </div>

            {/* Direct Concierge Cards */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#2D3E8C] font-mono font-bold mb-4">
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
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2D3E8C]/40 flex items-center gap-4 transition-all duration-300 group shadow-2xs hover:shadow-md"
              >
                <span className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                    {t.directContact.whatsappLabel}
                  </span>
                  <span className="text-sm font-bold text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors">
                    {t.directContact.whatsappValue}
                  </span>
                </div>
              </a>

              {/* Phone Direct */}
              <a
                href="tel:+97140000000"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2D3E8C]/40 flex items-center gap-4 transition-all duration-300 group shadow-2xs hover:shadow-md"
              >
                <span className="p-2.5 rounded-xl bg-[#2D3E8C]/10 text-[#2D3E8C] group-hover:bg-[#2D3E8C]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                    {t.directContact.phoneLabel}
                  </span>
                  <span className="text-sm font-bold text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors">
                    {t.directContact.phoneValue}
                  </span>
                </div>
              </a>

              {/* Email Direct */}
              <a
                href="mailto:concierge@havenerproperty.com"
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-[#2D3E8C]/40 flex items-center gap-4 transition-all duration-300 group shadow-2xs hover:shadow-md"
              >
                <span className="p-2.5 rounded-xl bg-[#E8922D]/10 text-[#E8922D] group-hover:bg-[#E8922D]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                    {t.directContact.emailLabel}
                  </span>
                  <span className="text-sm font-bold text-[#0A0E24] group-hover:text-[#2D3E8C] transition-colors">
                    {t.directContact.emailValue}
                  </span>
                </div>
              </a>

              {/* Office Location */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-4 shadow-2xs">
                <span className="p-2.5 rounded-xl bg-slate-100 text-[#2D3E8C] mt-0.5">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                    {t.directContact.officeLabel}
                  </span>
                  <span className="text-xs text-slate-700 block mt-0.5 leading-relaxed font-medium">
                    {t.directContact.officeValue}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1 font-normal">
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
                    <div className="w-16 h-16 rounded-full bg-[#2D3E8C]/10 border border-[#2D3E8C]/30 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-[#2D3E8C]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#0A0E24] mb-4 font-bold">
                      {t.form.successHeadline}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed font-normal">
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
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
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
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
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
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
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
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
                          {t.form.country}
                        </label>
                        <input
                          type="text"
                          placeholder={t.form.countryPlaceholder}
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
                          {t.form.interestedIn}
                        </label>
                        <select
                          value={formData.interestedIn}
                          onChange={(e) =>
                            setFormData({ ...formData, interestedIn: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors cursor-pointer"
                        >
                          {t.interests.map((item) => (
                            <option key={item} value={item} className="bg-white text-slate-900">
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
                          {t.form.budget}
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors cursor-pointer"
                        >
                          {t.budgets.map((b) => (
                            <option key={b} value={b} className="bg-white text-slate-900">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 mb-2 font-bold">
                        {t.form.message}
                      </label>
                      <textarea
                        rows={4}
                        placeholder={t.form.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0A0E24] placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#2D3E8C] focus:ring-1 focus:ring-[#2D3E8C] transition-colors resize-none"
                      />
                    </div>

                    {/* Fiduciary compliance notice */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 pt-1">
                      <Shield className="w-4 h-4 text-[#2D3E8C] shrink-0" />
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
