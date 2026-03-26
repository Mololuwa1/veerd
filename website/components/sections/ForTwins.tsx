"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const benefits = [
  "Paid for your time",
  "Flexible schedule",
  "Build your profile",
  "Give back",
];

const stats = [
  { label: "Twins on the platform", value: "200+" },
  { label: "Your schedule", value: "Flexible" },
  { label: "Average Twin rating", value: "4.9" },
];

export default function ForTwins() {
  return (
    <section className="bg-primaryLight py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase text-primary tracking-[1px] mb-3">
            For Twins
          </p>
          <h2 className="text-[36px] font-bold text-textPrimary tracking-[-0.5px] mb-4">
            You made the leap. Help someone else do the same.
          </h2>
          <p className="text-[17px] text-textSecondary leading-[1.65] mb-8">
            Share your honest career transition experience with someone who is
            exactly where you were. Get paid for your time, set your own
            schedule, and make a real difference.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {benefits.map((b) => (
              <span
                key={b}
                className="bg-white border border-border rounded-full px-4 py-2 text-sm text-textSecondary text-center"
              >
                {b}
              </span>
            ))}
          </div>

          <Button variant="primary" href="/for-twins" className="bg-primary text-white hover:opacity-90">
            Learn more
          </Button>
          <p className="text-xs text-textSecondary mt-3">
            We review every application personally
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-md shadow-card p-4 px-5"
            >
              <p className="text-2xl font-bold text-textPrimary">
                {stat.value}
              </p>
              <p className="text-sm text-textSecondary">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
