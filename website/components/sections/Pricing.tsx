"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pricingPlans } from "@/constants/content";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3">
            Pricing
          </p>
          <h2 className="text-[36px] font-bold text-textPrimary tracking-[-0.5px] mb-3">
            One month. Real progress.
          </h2>
          <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[520px] mx-auto mb-8">
            Two plans built around where you are in your transition. Cancel
            anytime — no questions asked.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white border border-border rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-bold px-5 py-2 rounded-full transition-all ${
                !annual
                  ? "bg-textPrimary text-background"
                  : "text-textSecondary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-bold px-5 py-2 rounded-full transition-all flex items-center gap-2 ${
                annual
                  ? "bg-textPrimary text-background"
                  : "text-textSecondary"
              }`}
            >
              Annual
              <span className="text-xs font-bold text-secondary bg-secondaryLight px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl p-7 relative ${
                plan.popular
                  ? "border-2 border-primary"
                  : "border-[1.5px] border-border"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-7 text-[11px] font-bold text-primary bg-primaryLight px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-bold text-textPrimary mb-3">
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[36px] font-bold text-textPrimary tracking-[-1px]">
                  £{annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm text-textSecondary">/month</span>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <p className="text-xs text-textSecondary">
                  {annual
                    ? `Billed annually at £${plan.annualPrice * 12} — save £${
                        (plan.monthlyPrice - plan.annualPrice) * 12
                      }`
                    : "Billed monthly — cancel anytime"}
                </p>
                {annual && (
                  <span className="text-[10px] font-bold text-primary bg-primaryLight px-2 py-0.5 rounded-full">
                    Save £{(plan.monthlyPrice - plan.annualPrice) * 12}/yr
                  </span>
                )}
              </div>

              <hr className="border-border mb-5" />

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
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
                    <span className="text-sm text-textSecondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-[10px] text-[15px] font-bold transition-all ${
                  plan.buttonVariant === "primary"
                    ? "bg-textPrimary text-background hover:opacity-90"
                    : "bg-transparent text-textSecondary border-[1.5px] border-border hover:border-textSecondary"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* One-time option */}
        <p className="text-center text-sm text-textSecondary mt-8">
          Prefer one conversation?{" "}
          <span className="font-bold text-textPrimary">
            Sprint Package — £149 one-time, no subscription.
          </span>
        </p>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-xs text-textSecondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="3"
                y="6"
                width="8"
                height="7"
                rx="1"
                stroke="#7A7A72"
                strokeWidth="1.2"
              />
              <path
                d="M5 6V4a2 2 0 114 0v2"
                stroke="#7A7A72"
                strokeWidth="1.2"
              />
            </svg>
            Secure payment via Apple
          </div>
          <div className="flex items-center gap-2 text-xs text-textSecondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7a6 6 0 1012 0A6 6 0 001 7z"
                stroke="#7A7A72"
                strokeWidth="1.2"
              />
              <path
                d="M5 3L3 7l2 4M9 3l2 4-2 4"
                stroke="#7A7A72"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Cancel anytime
          </div>
          <div className="flex items-center gap-2 text-xs text-textSecondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L2 3v4c0 3.5 2.5 5.5 5 6.5 2.5-1 5-3 5-6.5V3L7 1z"
                stroke="#7A7A72"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            7 day money back guarantee
          </div>
        </div>

        {/* Fine print */}
        <p className="text-xs text-textSecondary text-center mt-6 max-w-[480px] mx-auto">
          Subscriptions auto-renew at the end of each billing period. Cancel
          anytime in your Apple ID settings before renewal to avoid being
          charged.
        </p>
      </div>
    </section>
  );
}
