'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield } from 'lucide-react';
import { Language } from '@/lib/types';
import { TRANSLATIONS } from '@/data/translations';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  prefilledProperty?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  lang,
  prefilledProperty,
}) => {
  const t = TRANSLATIONS[lang].contact;
  const isRtl = lang === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    interestedIn: prefilledProperty || t.interests[0],
    budget: t.budgets[1],
    message: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury advisory routing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E8922D', '#F0A845', '#2D3E8C'],
        });
      } catch {
        // Confetti fallback
      }
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      interestedIn: t.interests[0],
      budget: t.budgets[1],
      message: '',
      preferredContact: 'whatsapp',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl my-auto z-10 bezel-outer animate-in zoom-in-95 duration-300">
        <div className="bezel-inner p-6 sm:p-10 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 ${
              isRtl ? 'left-6' : 'right-6'
            } p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[#8E95A5] hover:text-[#F5F2EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8922D]`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#E8922D]/15 border border-[#E8922D]/40 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#E8922D]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F2EB] mb-4">
                {t.form.successHeadline}
              </h3>
              <p className="text-[#8E95A5] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                {t.form.successMessage}
              </p>
              <Button variant="gold" onClick={handleReset} isRtl={isRtl}>
                {t.form.sendAnother}
              </Button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-8">
                <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#E8922D] font-medium mb-2">
                  {t.eyebrow}
                </span>
                <h2
                  id="modal-headline"
                  className="text-2xl sm:text-3xl font-serif text-[#F5F2EB] tracking-tight whitespace-pre-line"
                >
                  {t.headline}
                </h2>
                <p className="text-sm text-[#8E95A5] mt-2 max-w-lg leading-relaxed">
                  {t.supporting}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
                      {t.form.country}
                    </label>
                    <input
                      type="text"
                      placeholder={t.form.countryPlaceholder}
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
                      {t.form.interestedIn}
                    </label>
                    <select
                      value={formData.interestedIn}
                      onChange={(e) =>
                        setFormData({ ...formData, interestedIn: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0C1024] border border-white/10 text-[#F5F2EB] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors cursor-pointer"
                    >
                      {t.interests.map((item) => (
                        <option key={item} value={item} className="bg-[#0C1024] text-white">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
                      {t.form.budget}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#0C1024] border border-white/10 text-[#F5F2EB] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors cursor-pointer"
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
                  <label className="block text-xs uppercase tracking-wider text-[#E8922D] mb-1.5 font-medium">
                    {t.form.message}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#F5F2EB] placeholder-[#5A6070] text-sm focus:outline-none focus:border-[#E8922D] focus:ring-1 focus:ring-[#E8922D] transition-colors resize-none"
                  />
                </div>

                {/* Privacy & Escrow Assurance */}
                <div className="flex items-center gap-2 text-xs text-[#8E95A5] py-1">
                  <Shield className="w-4 h-4 text-[#E8922D] shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'جميع الاستفسارات مشمولة بالسرية الائتمانية وتخضع لمعايير الأراضي والأملاك بدبي.'
                      : 'Fiduciary discretion guaranteed. Registered with Dubai Land Department standards.'}
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    icon={<Send className="w-3.5 h-3.5" />}
                    isRtl={isRtl}
                  >
                    {isSubmitting ? t.form.submitting : t.form.submitCTA}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
