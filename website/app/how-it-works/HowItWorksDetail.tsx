"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const journeySteps = [
  {
    title: "Complete your intake",
    description:
      "Answer six honest questions about where you are right now, what you are considering, and what is holding you back. There are no wrong answers — we read every word and use your responses to find the right Twin.",
  },
  {
    title: "Get matched with your Twin",
    description:
      "Within 24 hours we hand-pick someone who has made the exact transition you are exploring. Not an algorithm — a real human reads your intake and selects the person whose story is closest to yours.",
  },
  {
    title: "See your Twin's profile",
    description:
      "View their transition story, timeline, honest quote about the hardest part, and their availability. You will know exactly who you are speaking to before you book.",
  },
  {
    title: "Start your Sprint",
    description:
      "Begin 30 days of structured daily exploration — 15 minutes per day. Daily tasks, videos, reflection prompts, and real world challenges designed around your specific transition.",
  },
  {
    title: "Have your Twin call",
    description:
      "A 45 minute honest conversation with someone who has been exactly where you are. They will share what they wish they had known, the real timeline, the skills that transferred, and the surprises along the way.",
  },
];

const sprintWeeks = [
  {
    week: "Week 1",
    theme: "Discovery",
    activities: [
      "Why am I considering this?",
      "Values mapping exercise",
      "Day in the life research",
      "Skills audit — what transfers",
      "First reflection checkpoint",
    ],
  },
  {
    week: "Week 2",
    theme: "Skills and gaps",
    activities: [
      "Skills gap checker tool",
      "Learning path research",
      "Informational interview prep",
      "Real world challenge — shadow or observe",
      "Second reflection checkpoint",
    ],
  },
  {
    week: "Week 3",
    theme: "Reality check",
    activities: [
      "Financial reality calculator",
      "Timeline mapping",
      "Identity and fear journaling",
      "Community discussion prompt",
      "Third reflection checkpoint",
    ],
  },
  {
    week: "Week 4",
    theme: "Decision and action",
    activities: [
      "Decision framework exercise",
      "90 day action plan builder",
      "Support system mapping",
      "Personal Transition Report generated",
      "Final reflection and next steps",
    ],
  },
];

const twinCallDetails = [
  {
    title: "What a Twin call is",
    items: [
      "A 45 minute honest conversation with someone who has already made your transition",
      "An opportunity to ask the questions you cannot ask anyone else",
      "A chance to hear the unfiltered truth about what the transition was really like",
    ],
  },
  {
    title: "What a Twin call is not",
    items: [
      "Not coaching or career advice — your Twin is a peer, not a professional",
      "Not a job interview or networking event",
      "Not a sales pitch for any course, programme, or credential",
    ],
  },
  {
    title: "How to prepare",
    items: [
      "Complete your Sprint activities up to the call date",
      "Write down your three biggest questions or fears",
      "Be honest about where you are — your Twin was once exactly there",
    ],
  },
];

export default function HowItWorksDetail() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3">
            How Veerd works
          </p>
          <h1 className="text-[40px] md:text-[48px] font-bold text-textPrimary tracking-[-1px] leading-[1.15] mb-5">
            From wondering to knowing — in 30 days
          </h1>
          <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[520px] mx-auto">
            Here is exactly what happens when you join Veerd, from intake to
            your Transition Report.
          </p>
        </div>
      </section>

      {/* Explorer Journey */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-10">
            Your Explorer journey
          </h2>
          <div className="space-y-10">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-8 h-8 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-textPrimary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-textSecondary leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sprint Breakdown */}
      <section className="py-16 px-6 md:px-12 bg-primaryLight/30">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-3">
            What a 30 day Sprint looks like
          </h2>
          <p className="text-[15px] text-textSecondary leading-[1.65] mb-10">
            Each Sprint is structured around four weekly themes. Activities take
            15 minutes per day.
          </p>

          <div className="space-y-8">
            {sprintWeeks.map((week) => (
              <div key={week.week}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold text-primary bg-primaryLight px-3 py-1 rounded-full">
                    {week.week}
                  </span>
                  <span className="text-base font-bold text-textPrimary">
                    {week.theme}
                  </span>
                </div>
                <ul className="space-y-2 pl-4">
                  {week.activities.map((activity) => (
                    <li
                      key={activity}
                      className="text-[15px] text-textSecondary flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5 text-xs">&#9679;</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Twin Call Details */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-10">
            The Twin call explained
          </h2>

          <div className="space-y-10">
            {twinCallDetails.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-bold text-textPrimary mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-textSecondary leading-[1.6]"
                    >
                      <div className="w-5 h-5 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="#7D9E8C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-call and CTA */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-4">
            After your call
          </h2>
          <p className="text-[15px] text-textSecondary leading-[1.65] mb-8">
            You continue your Sprint with renewed clarity. At the end of 30
            days you receive your personal Transition Report — a summary of
            your skills gap analysis, reflection insights, and a recommended
            action plan. You will know whether this transition is right for you
            and exactly what to do next.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary">Download Veerd</Button>
            <Button variant="secondary" href="/#pricing">
              View pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
