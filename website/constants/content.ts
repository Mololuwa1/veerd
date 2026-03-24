import { TwinStory, PricingPlan, FAQItem } from "@/types";

export const twinStories: TwinStory[] = [
  {
    name: "Sarah",
    initial: "S",
    avatarColor: "#7D9E8C",
    from: "Finance",
    to: "UX Design",
    transition: "Finance → UX Design",
    quote:
      "Honestly I almost talked myself out of it three times. I am really glad I did not.",
  },
  {
    name: "James",
    initial: "J",
    avatarColor: "#C4714A",
    from: "Law",
    to: "Product Management",
    transition: "Law → Product Management",
    quote:
      "Nobody tells you about the identity crisis. I wish someone had warned me — and reassured me it was normal.",
  },
  {
    name: "Maya",
    initial: "M",
    avatarColor: "#A8C5A0",
    from: "Teaching",
    to: "Data Science",
    transition: "Teaching → Data Science",
    quote:
      "The skills gap felt enormous until I mapped it properly. Most of it was closer than I thought.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Explorer",
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      "One 30 day Sprint per month",
      "Full skills gap checker",
      "Personal Transition Report PDF",
      "Full community access",
      "Twin call top-up at £45",
    ],
    buttonText: "Start Explorer",
    buttonVariant: "secondary",
  },
  {
    name: "Navigator",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Everything in Explorer",
      "One Twin call per month included",
      "Async Q&A with your Twin",
      "Priority matching within 24 hours",
      "Unlimited Sprints",
    ],
    popular: true,
    buttonText: "Start Navigator",
    buttonVariant: "primary",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What is a Twin?",
    answer:
      "A Twin is someone who has successfully made the career transition you are considering — not a coach or a career advisor, just a real person with lived experience who is willing to share it honestly.",
  },
  {
    question: "How does matching work?",
    answer:
      "You complete a six question intake about your current situation and where you want to go. We read your answers carefully and hand-pick the Twin whose transition story is closest to yours. It takes up to 24 hours because we do it personally.",
  },
  {
    question: "What if my match does not feel right?",
    answer:
      "On Navigator you get a second match at no extra charge. No questions asked — just let us know and we will find someone whose story resonates more.",
  },
  {
    question: "How long before I meet my Twin?",
    answer:
      "You see your matched Twin immediately after completing your intake. Booking a call happens as soon as you choose a plan — most users have their first call within the first week.",
  },
  {
    question: "What is a Sprint?",
    answer:
      "A Sprint is a 30 day structured daily programme — 15 minutes per day — that guides you through exploring a specific career transition. It includes daily tasks, videos, reflection prompts, a skills gap checker, and a real world challenge. At the end you receive a personal Transition Report.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime in your Apple ID settings before your next renewal date and you will not be charged again. You keep access until the end of your paid period.",
  },
  {
    question: "Is this only for people in the UK?",
    answer:
      "Veerd is currently focused on the UK market but we match Twins and Explorers regardless of location as long as the transition context is relevant. We are expanding internationally in 2025.",
  },
  {
    question: "How do Twins earn money?",
    answer:
      "Twins earn £35 per call on the Listener tier, with higher rates and bonuses as they complete more calls. Earnings are paid monthly to a connected bank account.",
  },
];

export const sprintFeatures = [
  "Daily tasks, videos, and real world challenges",
  "A personalised skills gap map",
  "Your own Transition Report at the end",
  "Honest reflection prompts that reveal what you actually want",
];

export const howItWorksSteps = [
  {
    number: 1,
    title: "Tell us your story",
    description:
      "Answer six honest questions about where you are and where you think you want to go. We read every word.",
  },
  {
    number: 2,
    title: "Meet your Twin",
    description:
      "We hand-pick someone who has made the exact leap you are considering. Not an algorithm — a human who has read your intake and chosen to help.",
  },
  {
    number: 3,
    title: "Talk and explore",
    description:
      "A 45 minute honest conversation plus 30 days of structured daily exploration. By the end you will know what to do next.",
  },
];
