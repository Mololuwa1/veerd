export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  metaDescription: string;
}

export interface TwinApplication {
  name: string;
  email: string;
  currentRole: string;
  previousRole: string;
  transitionYear: string;
  quote: string;
  availabilityTier: "Listener" | "Guide" | "Pathmaker";
  linkedinUrl?: string;
}

export interface TwinStory {
  name: string;
  initial: string;
  avatarColor: string;
  from: string;
  to: string;
  transition: string;
  quote: string;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "secondary";
}

export interface FAQItem {
  question: string;
  answer: string;
}
