"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/constants/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[700px] mx-auto">
        <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3">
          FAQ
        </p>
        <h2 className="text-[36px] font-bold text-textPrimary tracking-[-0.5px] mb-10">
          Honest answers
        </h2>

        <div className="space-y-0">
          {faqItems.map((item, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-base font-bold text-textPrimary pr-8">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl text-textSecondary flex-shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-[15px] text-textSecondary leading-[1.65] pb-5">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
