"use client";

import { motion } from "framer-motion";

const sprintFeatures = [
  "Daily tasks, videos, and real world challenges tailored to your path",
  "A personalised skills gap map that updates as you grow",
  "Transition Reports that track your progress over time",
  "Honest reflection prompts that reveal what you actually want",
  "New Sprint topics every month so you never stop exploring",
];

const sprints = [
  {
    title: "Life as a UX Designer",
    status: "completed",
    progress: 100,
    tag: "Completed",
    tagColor: "bg-primaryLight text-primary",
  },
  {
    title: "Building a UX Portfolio",
    status: "active",
    progress: 40,
    tag: "Day 12 of 30",
    tagColor: "bg-secondaryLight text-secondary",
  },
  {
    title: "Freelance vs Full-time in Design",
    status: "upcoming",
    progress: 0,
    tag: "Up next",
    tagColor: "bg-border/40 text-textSecondary",
  },
];

const currentDays = [
  {
    num: 11,
    status: "completed",
    type: "Skills",
    typeColor: "text-primary bg-primaryLight",
    title: "Portfolio feedback framework",
  },
  {
    num: 12,
    status: "today",
    type: "Challenge",
    typeColor: "text-secondary bg-secondaryLight",
    title: "Redesign a real product screen",
  },
  {
    num: 13,
    status: "upcoming",
    type: "Reflection",
    typeColor: "text-textSecondary bg-border/40",
    title: "What kind of designer are you?",
  },
];

export default function SprintSection() {
  return (
    <section className="bg-background py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-bold uppercase text-secondary tracking-[1px] mb-3 text-center md:text-left">
            Sprints
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold text-textPrimary tracking-[-0.5px] max-w-[440px] mb-4 leading-[1.2] text-center md:text-left mx-auto md:mx-0">
            Every month, a new Sprint. Every Sprint, real progress.
          </h2>
          <p className="text-[16px] md:text-[17px] text-textSecondary leading-[1.65] mb-4 text-center md:text-left">
            Sprints are 30 day structured programmes that guide you through a specific part of your career transition, 15 minutes a day. Finish one and start the next. Explore a new direction, go deeper on the one you chose, or build the skills you need to land.
          </p>
          <p className="text-[15px] text-textSecondary leading-[1.65] mb-8 text-center md:text-left">
            This is not a one-off course. It is an ongoing journey that grows with you, month after month, until you are exactly where you want to be.
          </p>

          <div className="space-y-4 mb-8 max-w-[400px] mx-auto md:mx-0 md:max-w-none">
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

          <div className="flex gap-6 md:gap-10 justify-center md:justify-start">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-textPrimary">15 min</p>
              <p className="text-xs text-textSecondary">Daily commitment</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-textPrimary">30+</p>
              <p className="text-xs text-textSecondary">Sprint topics available</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-textPrimary">Ongoing</p>
              <p className="text-xs text-textSecondary">New Sprints every month</p>
            </div>
          </div>
        </motion.div>

        {/* Right column - Sprint journey visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 w-full max-w-full"
        >
          {/* Sprint journey overview */}
          <div className="bg-white rounded-xl shadow-card p-5 w-full">
            <p className="text-xs font-bold uppercase text-textSecondary tracking-[0.5px] mb-4">
              Your Sprint journey
            </p>
            <div className="space-y-3">
              {sprints.map((sprint, i) => (
                <div
                  key={sprint.title}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    sprint.status === "active"
                      ? "bg-secondaryLight/50 border border-secondary/20"
                      : sprint.status === "completed"
                      ? "bg-primaryLight/50"
                      : "bg-border/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      sprint.status === "completed"
                        ? "bg-primary text-white"
                        : sprint.status === "active"
                        ? "bg-secondary text-white"
                        : "bg-border/40 text-textSecondary"
                    }`}
                  >
                    {sprint.status === "completed" ? (
                      <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${
                        sprint.status === "upcoming"
                          ? "text-textSecondary"
                          : "text-textPrimary"
                      }`}
                    >
                      {sprint.title}
                    </p>
                    {sprint.status === "active" && (
                      <div className="h-1 bg-border/40 rounded-full mt-1.5 w-full">
                        <div
                          className="h-1 bg-secondary rounded-full"
                          style={{ width: `${sprint.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sprint.tagColor}`}
                  >
                    {sprint.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Sprint detail */}
          <div className="bg-white rounded-xl shadow-card p-5 w-full">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-textPrimary">
                Building a UX Portfolio
              </p>
              <p className="text-xs text-textSecondary">Day 12 of 30</p>
            </div>

            <div className="h-1 bg-border rounded-full mb-5">
              <div className="h-1 bg-secondary rounded-full w-[40%]" />
            </div>

            <div className="space-y-2.5">
              {currentDays.map((day) => (
                <div
                  key={day.num}
                  className="flex items-center gap-3 py-1.5"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                      day.status === "completed"
                        ? "bg-primary text-white"
                        : day.status === "today"
                        ? "bg-secondary text-white"
                        : "bg-border/40 text-textSecondary"
                    }`}
                  >
                    {day.status === "completed" ? (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
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
                    className={`text-[13px] ${
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

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs font-bold text-secondary">
                  42 day streak
                </span>
              </div>
              <span className="text-[10px] text-textSecondary">
                2 Sprints completed
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
