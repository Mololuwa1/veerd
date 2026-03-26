"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Make the kind of difference a Google search never could",
    description:
      "You know what it feels like to wonder whether you are making the right decision. One honest conversation from someone who has been there can change everything.",
  },
  {
    title: "Get compensated for sharing what you already know",
    description:
      "Your time matters. Twins are paid for every call they take. Set your own availability and take as many or as few calls as you like.",
  },
  {
    title: "Build a profile that showcases your unique career story",
    description:
      "Your Twin profile highlights your transition journey and expertise. It becomes a piece of your professional brand that no one else can replicate.",
  },
  {
    title: "Join a community of people who have reinvented themselves",
    description:
      "Connect with other career changers who understand what it takes to make the leap. Share insights, support each other, and grow together.",
  },
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
            <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[440px] mb-6">
              Veerd connects career changers with people who have already made
              their transition. Be honest. Be yourself. Get paid for sharing
              something you would probably do for free.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-primaryLight text-primary text-[13px] font-bold px-4 py-2 rounded-full">
                Paid for every call
              </span>
              <span className="bg-primaryLight text-primary text-[13px] font-bold px-4 py-2 rounded-full">
                Set your own hours
              </span>
              <span className="bg-primaryLight text-primary text-[13px] font-bold px-4 py-2 rounded-full">
                45 min per call
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-card p-6">
              <p className="text-xs font-bold uppercase text-textSecondary tracking-[0.5px] mb-5">
                How Twins spend their time
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-textPrimary">Review the Explorer&apos;s story</p>
                    <p className="text-xs text-textSecondary">5 min before the call</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-textPrimary">Have an honest conversation</p>
                    <p className="text-xs text-textSecondary">45 min on your schedule</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-textPrimary">Get paid, help someone move forward</p>
                    <p className="text-xs text-textSecondary">Payment after each call</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 px-2">
              <div>
                <p className="text-xl font-bold text-textPrimary">200+</p>
                <p className="text-xs text-textSecondary">Twins active</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-xl font-bold text-textPrimary flex items-center gap-1">4.9 <svg width="16" height="16" viewBox="0 0 16 16" fill="#C4714A"><path d="M8 0.5l2.47 5.01L16 6.26l-4 3.9.94 5.49L8 13.01l-4.94 2.64L4 10.16l-4-3.9 5.53-.75z"/></svg></p>
                <p className="text-xs text-textSecondary">Average rating</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-xl font-bold text-textPrimary">Flexible</p>
                <p className="text-xs text-textSecondary">Your schedule</p>
              </div>
            </div>
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
                desc: "We send you Explorers whose situation mirrors where you were. You will see their intake before every call so you can prepare.",
              },
              {
                num: 3,
                title: "Have the call",
                desc: "45 minutes of honest conversation on your schedule. Share your experience, answer their questions, be real. You get paid after every call.",
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

      {/* Commitment levels */}
      <section className="py-16 px-6 md:px-12 bg-primaryLight/30">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] font-bold text-textPrimary tracking-[-0.5px] mb-3">
            Choose your commitment
          </h2>
          <p className="text-[15px] text-textSecondary leading-[1.65] mb-8">
            Take as many or as few calls as you like. There are no minimums and no obligations. Compensation details are shared during onboarding.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Listener",
                calls: "1 call per month",
                desc: "Perfect if you want to dip your toes in and help someone once a month.",
                highlight: false,
              },
              {
                name: "Guide",
                calls: "2 to 3 calls per month",
                desc: "For Twins who enjoy regular conversations and want to build deeper connections.",
                highlight: true,
              },
              {
                name: "Pathmaker",
                calls: "4+ calls per month",
                desc: "For those who want to make this a meaningful part of their routine.",
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-lg p-5 ${
                  tier.highlight
                    ? "border-2 border-primary shadow-card"
                    : "border border-border"
                }`}
              >
                {tier.highlight && (
                  <span className="text-[10px] font-bold text-primary bg-primaryLight px-2 py-0.5 rounded-full mb-3 inline-block">
                    Most popular
                  </span>
                )}
                <p className="text-lg font-bold text-textPrimary mb-1">
                  {tier.name}
                </p>
                <p className="text-sm font-bold text-primary mb-2">
                  {tier.calls}
                </p>
                <p className="text-[13px] text-textSecondary leading-[1.5]">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
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
                  How many calls would you like to take?
                </label>
                <select
                  name="availabilityTier"
                  value={form.availabilityTier}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="">Select availability</option>
                  <option value="Listener">Listener (1 call per month)</option>
                  <option value="Guide">Guide (2 to 3 calls per month)</option>
                  <option value="Pathmaker">Pathmaker (4+ calls per month)</option>
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
