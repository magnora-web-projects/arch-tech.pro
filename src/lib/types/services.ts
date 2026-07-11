export interface FAQItemServicesPage {
  question: string;
  answer: string;
}

export interface ServicePageData {
  id: number;
  slug: string;
  title: string;
  banner_image: string;
  header_title: string;
  header_description: string;
  features: string[];
  content: string;
  faq_title: string;
  faq_description: string;
  faqs: FAQItemServicesPage[];
  created_at: Date;
}
