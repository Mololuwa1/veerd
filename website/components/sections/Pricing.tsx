"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
            Your transition, your pace
          </h2>
          <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[520px] mx-auto mb-8">
            Start with the plan that fits where you are right now. Upgrade,
            downgrade, or cancel whenever you need to. No lock-ins, no pressure.
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
          {pricingPlans.map((plan) => {
            const savings = (plan.monthlyPrice - plan.annualPrice) * 12;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl p-7 relative flex flex-col ${
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

                <h3 className="text-xl font-bold text-textPrimary mb-1">
                  {plan.name}
                </h3>
                <p className="text-[13px] text-textSecondary leading-[1.5] mb-4">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[36px] font-bold text-textPrimary tracking-[-1px]">
                    £{annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-textSecondary">/month</span>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <p className="text-xs text-textSecondary">
                    {annual
                      ? `Billed annually at £${plan.annualPrice * 12}`
                      : "Billed monthly, cancel anytime"}
                  </p>
                  {annual && (
                    <span className="text-[10px] font-bold text-primary bg-primaryLight px-2 py-0.5 rounded-full">
                      Save £{savings}/yr
                    </span>
                  )}
                </div>

                <hr className="border-border mb-5" />

                <ul className="space-y-3 mb-6 flex-1">
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
                      <span className="text-sm text-textSecondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#footer-signup"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("footer-signup")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block w-full py-3.5 rounded-[10px] text-[15px] font-bold transition-all text-center cursor-pointer ${
                    plan.buttonVariant === "primary"
                      ? "bg-textPrimary text-background hover:bg-[#3D3D3D]"
                      : "bg-transparent text-textSecondary border-[1.5px] border-border hover:border-[#C4B49E]"
                  }`}
                >
                  {plan.buttonText}
                </a>

                {plan.popular && (
                  <p className="text-[11px] text-textSecondary text-center mt-3">
                    Most people start here
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Social proof nudge */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="flex -space-x-2">
            {["/images/giorgio-trovato-VzusBjHlKM8-unsplash.jpg", "/images/ryan-hoffman-Ft4p5E9HjTQ-unsplash.jpg", "/images/willian-souza-p5BoBF0XJUA-unsplash.jpg"].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded-full border-2 border-background object-cover object-top"
              />
            ))}
          </div>
          <p className="text-[13px] text-textSecondary">
            <span className="font-bold text-textPrimary">73% of users</span>{" "}
            choose Navigator
          </p>
        </div>

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
            Secure payment
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
            Cancel or switch plans anytime
          </div>
          <div className="flex items-center gap-2 text-xs text-textSecondary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#7A7A72" strokeWidth="1.2" />
              <path d="M7 4v3.5l2.5 1.5" stroke="#7A7A72" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Start your first Sprint in under 5 minutes
          </div>
        </div>

        {/* Fine print */}
        <p className="text-xs text-textSecondary text-center mt-6 max-w-[480px] mx-auto">
          Subscriptions auto-renew at the end of each billing period. Cancel
          anytime in your account settings before renewal to avoid being
          charged.
        </p>
      </div>
    </section>
  );
}
