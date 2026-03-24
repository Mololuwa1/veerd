"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Earn £35 per call on a flexible schedule",
    description:
      "Set your own availability and take as many or as few calls as you like. Calls are 45 minutes and happen on your terms.",
  },
  {
    title: "Give back to someone at the exact crossroads you once stood at",
    description:
      "You know what it feels like to wonder whether you are making the right decision. One honest conversation can change everything for someone.",
  },
  {
    title: "Build a public profile that becomes a piece of your professional brand",
    description:
      "Your Twin profile showcases your transition story and expertise. It is a unique credential that demonstrates your experience and willingness to help others.",
  },
  {
    title: "Be part of a community of people who have successfully reinvented themselves",
    description:
      "Join a network of career changers who understand what it takes to make the leap. Share insights, learn from others, and grow together.",
  },
];

const tiers = [
  { name: "Listener", calls: "1 call/month", earnings: "~£35/month" },
  { name: "Guide", calls: "2–3 calls/month", earnings: "~£105/month" },
  { name: "Pathmaker", calls: "4+ calls/month", earnings: "~£175+/month" },
];

const years = Array.from({ length: 7 }, (_, i) => String(2024 - i));

export default function ForTwinsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentRole: "",
    previousRole: "",
    transitionYear: "",
    leapReason: "",
    quote: "",
    availabilityTier: "",
    linkedinUrl: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/twin-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          currentRole: form.currentRole,
          previousRole: form.previousRole,
          transitionYear: form.transitionYear,
          quote: form.quote,
          availabilityTier: form.availabilityTier,
          linkedinUrl: form.linkedinUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const inputClasses =
    "w-full h-12 bg-white border border-border rounded-sm px-4 text-[15px] text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase text-primary tracking-[1px] mb-3">
              Become a Twin
            </p>
            <h1 className="text-[36px] md:text-[44px] font-bold text-textPrimary tracking-[-1px] leading-[1.15] mb-5">
              You made the leap. Now help someone else do the same.
            </h1>
            <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[440px]">
              Veerd connects career changers with people who have already made
              their transition. Be honest. Be yourself. Earn money doing
              something you would probably do for free.
            </p>
          </div>
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-white rounded-md shadow-card p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-base font-bold text-textPrimary">
                    {tier.name}
                  </p>
                  <p className="text-sm text-textSecondary">{tier.calls}</p>
                </div>
                <p className="text-xl font-bold text-primary">{tier.earnings}</p>
              </div>
            ))}
            <p className="text-xs text-textSecondary">
              Bonuses available for high ratings and successful Explorer outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Why become a Twin */}
      <section className="py-16 px-6 md:px-12 bg-primaryLight/30">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-10">
            Why become a Twin
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <h3 className="text-lg font-bold text-textPrimary mb-2">
                  {reason.title}
                </h3>
                <p className="text-[15px] text-textSecondary leading-[1.65]">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for Twins */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-10">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: 1,
                title: "Apply",
                desc: "Tell us your transition story in five minutes. We want to know what you did, why, and what you wish someone had told you.",
              },
              {
                num: 2,
                title: "Get matched",
                desc: "We send you Explorers whose situation mirrors where you were. You will see their intake before every call.",
              },
              {
                num: 3,
                title: "Have the call",
                desc: "45 minutes of honest conversation on your schedule. Share your experience, answer their questions, be real.",
              },
            ].map((step) => (
              <div key={step.num}>
                <div className="w-10 h-10 rounded-[10px] bg-primaryLight flex items-center justify-center mb-4">
                  <span className="text-base font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-textPrimary mb-2">
                  {step.title}
                </h3>
                <p className="text-[15px] text-textSecondary leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Potential */}
      <section className="py-16 px-6 md:px-12 bg-primaryLight/30">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-8">
            Earning potential
          </h2>
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-bold text-textSecondary uppercase tracking-[0.5px] border-b border-border px-6 py-3">
              <span>Tier</span>
              <span>Calls</span>
              <span>Monthly earnings</span>
            </div>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="grid grid-cols-3 px-6 py-4 border-b border-border/40 last:border-0"
              >
                <span className="text-sm font-bold text-textPrimary">
                  {tier.name}
                </span>
                <span className="text-sm text-textSecondary">{tier.calls}</span>
                <span className="text-sm font-bold text-primary">
                  {tier.earnings}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-textSecondary mt-4">
            Bonuses available for high ratings and successful Explorer outcomes.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-3">
            Apply to be a Twin
          </h2>
          <p className="text-[15px] text-textSecondary leading-[1.65] mb-10">
            It takes about five minutes. We review every application personally.
          </p>

          {status === "success" ? (
            <div className="bg-primaryLight rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-textPrimary mb-3">
                Application received
              </h3>
              <p className="text-[15px] text-textSecondary">
                Thank you for applying. We review every application personally
                and will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Your current role
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={form.currentRole}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Your previous role (before your transition)
                </label>
                <input
                  type="text"
                  name="previousRole"
                  value={form.previousRole}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Year you made the transition
                </label>
                <select
                  name="transitionYear"
                  value={form.transitionYear}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  In one honest sentence, what made you make the leap?
                </label>
                <textarea
                  name="leapReason"
                  value={form.leapReason}
                  onChange={handleChange}
                  maxLength={120}
                  required
                  rows={2}
                  className="w-full bg-white border border-border rounded-sm px-4 py-3 text-[15px] text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <p className="text-xs text-textSecondary mt-1">
                  {form.leapReason.length}/120 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  What do you wish someone had told you?
                  <span className="font-normal text-textSecondary ml-1">
                    (this becomes your quote on your Twin profile)
                  </span>
                </label>
                <textarea
                  name="quote"
                  value={form.quote}
                  onChange={handleChange}
                  maxLength={160}
                  required
                  rows={3}
                  className="w-full bg-white border border-border rounded-sm px-4 py-3 text-[15px] text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <p className="text-xs text-textSecondary mt-1">
                  {form.quote.length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  Availability tier
                </label>
                <select
                  name="availabilityTier"
                  value={form.availabilityTier}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select tier</option>
                  <option value="Listener">Listener (1 call/month)</option>
                  <option value="Guide">Guide (2–3 calls/month)</option>
                  <option value="Pathmaker">Pathmaker (4+ calls/month)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-textPrimary mb-2">
                  LinkedIn profile URL{" "}
                  <span className="font-normal text-textSecondary">(optional)</span>
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={form.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className={inputClasses}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-[#D9705A]">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 bg-primary text-white font-bold text-[15px] rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Submit my application"
                )}
              </button>

              <p className="text-xs text-textSecondary text-center">
                We review every application personally. You will hear from us
                within 48 hours.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
