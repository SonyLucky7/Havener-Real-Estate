export type Language = 'en' | 'ar';
export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP';

export type PropertyCategory =
  | 'all'
  | 'off-plan'
  | 'apartments'
  | 'villas'
  | 'waterfront'
  | 'branded'
  | 'investment';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface PaymentMilestone {
  stage: LocalizedString;
  percentage: number;
}

export interface Property {
  id: string;
  slug: string;
  name: LocalizedString;
  category: PropertyCategory;
  categoryLabel: LocalizedString;
  location: LocalizedString;
  subLocation: LocalizedString;
  type: LocalizedString;
  priceAED: number;
  priceUSD: number;
  startingPriceFormatted: LocalizedString;
  paymentPlan: LocalizedString;
  paymentMilestones: PaymentMilestone[];
  completion: LocalizedString;
  developer: string;
  bedrooms: LocalizedString;
  sizeSqFt: string;
  image: string;
  gallery: string[];
  investmentPositioning: LocalizedString;
  highlights: {
    en: string[];
    ar: string[];
  };
  description: LocalizedString;
  tag: LocalizedString;
  architecturalDetails?: LocalizedString;
  scope?: LocalizedString;
  mapUrl?: string;
  blueprintUrl?: string;
  architecturalNarrative?: LocalizedString;
  dimensions?: {
    builtUpArea: string;
    plotArea?: string;
    ceilingHeight?: string;
  };
  virtualTourAvailable?: boolean;
  expectedRoi?: string;
}

export interface ConsultationInquiry {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  interestedIn: string;
  budget: string;
  message: string;
  preferredContact: 'whatsapp' | 'phone' | 'email';
}
