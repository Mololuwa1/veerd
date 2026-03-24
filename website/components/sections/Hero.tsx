"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const avatars = [
  { initial: "S", bg: "#D4C5B2" },
  { initial: "M", bg: "#C8B99A" },
  { initial: "J", bg: "#BFB094" },
  { initial: "K", bg: "#B8A888" },
];

export default function Hero() {
  return (
    <section className="bg-background py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-primaryLight px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-bold text-primary">
              Career transitions, done differently
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] font-bold text-textPrimary tracking-[-1px] leading-[1.15] mb-5">
            Talk to someone who has already{" "}
            <span className="text-primary">made the leap</span>
          </h1>

          <p className="text-[17px] text-textSecondary leading-[1.65] max-w-[420px] mb-9">
            Not a coach. Not a course. A real person who made the exact career
            change you are considering — and will tell you the honest truth about
            it.
          </p>

          <div className="flex items-center gap-3 mb-7">
            <Button variant="primary">Download Veerd</Button>
            <Button variant="secondary" href="/how-it-works">
              How it works
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((a) => (
                <div
                  key={a.initial}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white border-2 border-white"
                  style={{ backgroundColor: a.bg }}
                >
                  {a.initial}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-textSecondary">
              200+ <span className="font-bold text-textPrimary">professionals</span>{" "}
              already on their journey
            </p>
          </div>
        </motion.div>

        {/* Right column — photo composition */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[420px] md:h-[480px] hidden md:block"
        >
          {/* Main photo */}
          <div
            className="absolute top-5 left-10 w-[280px] h-[360px] rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #D4C5B2, #C4B49E)",
            }}
          >
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold text-[#8B7355] bg-white/80 px-2.5 py-1.5 rounded-md">
                Real people, real transitions
              </span>
            </div>
          </div>

          {/* Secondary photo */}
          <div
            className="absolute top-[140px] right-0 w-[200px] h-[240px] rounded-lg"
            style={{
              background: "linear-gradient(160deg, #C8B99A, #B8A888)",
            }}
          />

          {/* Floating Twin card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="absolute top-4 right-5 bg-white rounded-md shadow-card p-3 px-4 w-[180px]"
          >
            <p className="text-[10px] font-bold uppercase text-textSecondary tracking-[0.5px] mb-1">
              Your Twin
            </p>
            <p className="text-sm font-bold text-textPrimary">Sarah M.</p>
            <p className="text-xs font-bold text-primary mb-2">
              Finance → UX Design
            </p>
            <span className="text-[10px] font-bold text-primary bg-primaryLight px-2 py-0.5 rounded-full">
              Available this week
            </span>
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="absolute bottom-[30px] left-2.5 bg-white rounded-[10px] shadow-card py-2.5 px-3.5"
          >
            <p className="text-xl font-bold text-textPrimary">24hrs</p>
            <p className="text-[11px] text-textSecondary">Average match time</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
