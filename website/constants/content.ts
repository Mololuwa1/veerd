import { TwinStory, PricingPlan, FAQItem } from "@/types";

export const twinStories: TwinStory[] = [
  {
    name: "Priya",
    initial: "P",
    avatarColor: "#7D9E8C",
    image: "/images/priya.jpg",
    from: "Finance",
    to: "UX Design",
    transition: "Finance → UX Design",
    quote:
      "I spent two years telling myself it was too late. One conversation with my Twin made me realise I had been ready for months. I just needed someone to say: you are not crazy, this is the right move.",
  },
  {
    name: "James",
    initial: "J",
    avatarColor: "#C4714A",
    image: "/images/james.jpg",
    from: "Law",
    to: "Product Management",
    transition: "Law → Product Management",
    quote:
      "I left a career everyone around me thought was perfect. My Twin told me he cried in his car after his first week in product. That one detail made me feel less alone than anything I had read online in two years of searching.",
  },
  {
    name: "Maya",
    initial: "M",
    avatarColor: "#A8C5A0",
    image: "/images/maya.jpg",
    from: "Support Work",
    to: "Data Analytics",
    transition: "Support Work → Data Analytics",
    quote:
      "I kept Googling the same questions at 2am and getting nowhere. My Twin showed me that the empathy I built in support work was actually my biggest advantage in analytics. Veerd gave me a real person instead of another article.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Explorer",
    description: "For people still figuring out which direction feels right",
    monthlyPrice: 19,
    annualPrice: 15,
    features: [
      "One new Sprint every month to explore a career path",
      "Personalised skills gap map that updates as you grow",
      "Transition Report after each Sprint",
      "Access to the Veerd community of career changers",
      "Add a Twin call anytime for £45",
    ],
    buttonText: "Start exploring",
    buttonVariant: "secondary",
  },
  {
    name: "Navigator",
    description: "For people ready to move, with someone by their side",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Everything in Explorer",
      "A real Twin call every month, included",
      "Follow-up notes and resources from your Twin after each call",
      "Priority matching so you are talking within 24 hours",
      "Unlimited Sprints to explore as many paths as you need",
    ],
    popular: true,
    buttonText: "Start navigating",
    buttonVariant: "primary",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What is a Twin?",
    answer:
      "A Twin is someone who has successfully made the career transition you are considering. Not a coach or a career advisor, just a real person with lived experience who is willing to share it honestly.",
  },
  {
    question: "How does matching work?",
    answer:
      "You complete a six question intake about your current situation and where you want to go. We read your answers carefully and hand-pick the Twin whose transition story is closest to yours. It takes up to 24 hours because we do it personally.",
  },
  {
    question: "What if my match does not feel right?",
    answer:
      "On Navigator you get a second match at no extra charge. No questions asked, just let us know and we will find someone whose story resonates more.",
  },
  {
    question: "How long before I meet my Twin?",
    answer:
      "You see your matched Twin immediately after completing your intake. Booking a call happens as soon as you choose a plan, and most users have their first call within the first week.",
  },
  {
    question: "What is a Sprint?",
    answer:
      "A Sprint is a 30 day structured daily programme, 15 minutes per day, that guides you through exploring a specific career transition. It includes daily tasks, videos, reflection prompts, a skills gap checker, and a real world challenge. At the end you receive a personal Transition Report.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime from your account settings before your next renewal date and you will not be charged again. You keep access until the end of your paid period.",
  },
  {
    question: "Is this only for people in the UK?",
    answer:
      "Veerd is currently focused on the UK market but we match Twins and Explorers regardless of location as long as the transition context is relevant. We are expanding internationally in 2025.",
  },
  {
    question: "How does being a Twin work?",
    answer:
      "Twins are real people who have made a career transition and want to help others do the same. You take calls on your own schedule, share your honest experience, and make a genuine difference. Full details on compensation and how it all works are shared during onboarding.",
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
      "You get matched with someone who has made the exact leap you are considering. Every match is based on your story, your goals, and the transition that fits.",
  },
  {
    number: 3,
    title: "Talk and explore",
    description:
      "Start with a 45 minute honest conversation, then keep building with ongoing Sprints, skill maps, and new Twin calls each month. Your transition does not end after 30 days and neither does Veerd.",
  },
];
