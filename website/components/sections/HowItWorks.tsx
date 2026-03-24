"use client";

import { motion } from "framer-motion";
import { howItWorksSteps } from "@/constants/content";

export default function HowItWorks() {
  return (
    <section className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3">
          How it works
        </p>
        <h2 className="text-[36px] font-bold text-textPrimary tracking-[-0.5px] mb-3">
          Three steps to career clarity
        </h2>
        <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[520px] mb-12">
          No generic advice. No algorithm. Just a carefully chosen human who has
          already walked your path.
        </p>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-5 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-[1px] border-t border-dashed border-border" />

          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className="w-10 h-10 rounded-[10px] bg-primaryLight flex items-center justify-center mb-4 relative z-10">
                <span className="text-base font-bold text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-textPrimary mb-2">
                {step.title}
              </h3>
              <p className="text-[15px] text-textSecondary leading-[1.6]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
