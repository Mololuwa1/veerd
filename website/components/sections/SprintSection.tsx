"use client";

import { motion } from "framer-motion";
import { sprintFeatures } from "@/constants/content";

const days = [
  {
    num: 7,
    status: "completed",
    type: "Reflection",
    typeColor: "text-primary bg-primaryLight",
    title: "Week 1 check-in",
  },
  {
    num: 8,
    status: "today",
    type: "Skills",
    typeColor: "text-secondary bg-secondaryLight",
    title: "Skills gap checker",
  },
  {
    num: 9,
    status: "upcoming",
    type: "Interview",
    typeColor: "text-textSecondary bg-border/40",
    title: "Informational interview guide",
  },
  {
    num: 10,
    status: "upcoming",
    type: "Shadow",
    typeColor: "text-textSecondary bg-border/40",
    title: "Shadow day guidance",
  },
];

export default function SprintSection() {
  return (
    <section className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3">
            30 day Sprints
          </p>
          <h2 className="text-[36px] font-bold text-textPrimary tracking-[-0.5px] max-w-[420px] mb-4">
            Figure out if this is right for you — before you commit
          </h2>
          <p className="text-[17px] text-textSecondary leading-[1.65] mb-8">
            30 days of structured daily guidance — 15 minutes per day — built
            around the specific career transition you are exploring.
          </p>

          <div className="space-y-4 mb-8">
            {sprintFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    className="text-primary"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-[15px] text-textSecondary">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-2xl font-bold text-textPrimary">15 min</p>
              <p className="text-xs text-textSecondary">Daily commitment</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-textPrimary">
                Less than £1
              </p>
              <p className="text-xs text-textSecondary">Cost per day</p>
            </div>
          </div>
        </motion.div>

        {/* Right column — Sprint roadmap visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-textPrimary">
                Your Sprint — Life as a UX Designer
              </p>
              <p className="text-xs text-textSecondary">Day 8 of 30</p>
            </div>

            <div className="h-1 bg-border rounded-full mb-6">
              <div className="h-1 bg-primary rounded-full w-[27%]" />
            </div>

            <div className="space-y-3">
              {days.map((day) => (
                <div
                  key={day.num}
                  className="flex items-center gap-3 py-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      day.status === "completed"
                        ? "bg-primary text-white"
                        : day.status === "today"
                        ? "bg-secondary text-white"
                        : "bg-border/40 text-textSecondary"
                    }`}
                  >
                    {day.status === "completed" ? (
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 10 8"
                        fill="none"
                      >
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      day.num
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${day.typeColor}`}
                  >
                    {day.type}
                  </span>
                  <span
                    className={`text-sm ${
                      day.status === "upcoming"
                        ? "text-textSecondary"
                        : "text-textPrimary"
                    }`}
                  >
                    {day.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-border/40">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-xs font-bold text-secondary">
                7 day streak
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
