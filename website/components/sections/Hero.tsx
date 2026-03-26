"use client";

import { motion } from "framer-motion";

const avatars = [
  { initial: "S", bg: "#D4C5B2" },
  { initial: "M", bg: "#C8B99A" },
  { initial: "J", bg: "#BFB094" },
  { initial: "K", bg: "#B8A888" },
];

const beforeItems = [
  "Months of online research going nowhere",
  "Generic career coach advice that does not know your situation",
  "Still not sure if the change is right for you",
  "Another year passes without doing anything",
];

const afterItems = [
  "One honest 45-minute conversation with someone who lived it",
  "Real clarity from someone who has been exactly where you are",
  "Know within 30 days whether this change is right for you",
  "Finally move forward with confidence",
];

const stats = [
  { number: "45 min", label: "One honest call" },
  { number: "30 days", label: "Structured Sprint" },
  { number: "12 hrs", label: "Match time" },
];

export default function Hero() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section className="bg-background pt-10 md:pt-20 pb-8 md:pb-16 px-5 md:px-12">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-[72px] items-center">
        {/* Left column */}
        <motion.div {...fadeUp(0.1)}>
          {/* Headline */}
          <h1 className="text-[28px] md:text-[46px] font-bold text-textPrimary tracking-[-0.5px] md:tracking-[-1px] leading-[1.15] md:leading-[1.12] mb-3 md:mb-4">
            Stop researching.
            <br />
            <span className="text-primary">
              Start talking to someone
              <br />
              who has done it.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-[15px] md:text-[17px] text-textSecondary leading-[1.6] md:leading-[1.65] max-w-[460px] mb-6 md:mb-8">
            Veerd matches you with a real person who made the career leap you are
            considering. They will tell you what Google cannot: what it actually
            feels like, what they wished they had known, and whether it was worth it.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <a
              href="#footer-signup"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("footer-signup")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-bold cursor-pointer text-[14px] md:text-[15px] inline-block"
              style={{
                background: "#2C2C2C",
                color: "#FAF7F2",
                fontWeight: 700,
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                textDecoration: "none",
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#3D3D3D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#2C2C2C")
              }
            >
              Get matched today
            </a>
            <a
              href="/how-it-works"
              className="cursor-pointer text-[14px] md:text-[15px]"
              style={{
                background: "transparent",
                color: "#7A7A72",
                padding: "12px 18px",
                border: "1.5px solid #E0DDD8",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "border-color 150ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#C4B49E")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E0DDD8")
              }
            >
              How it works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-2.5">
            <div className="flex">
              {avatars.map((a, i) => (
                <div
                  key={a.initial}
                  className="flex items-center justify-center"
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    border: "2px solid #FAF7F2",
                    backgroundColor: a.bg,
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#fff",
                    marginLeft: i === 0 ? 0 : "-8px",
                    position: "relative",
                    zIndex: avatars.length - i,
                  }}
                >
                  {a.initial}
                </div>
              ))}
            </div>
            <p className="text-[12px] md:text-[13px] text-textSecondary">
              <span className="font-bold text-textPrimary">200+ professionals</span>{" "}
              already on their journey
            </p>
          </div>
        </motion.div>

        {/* Right column */}
        <div>
          {/* Before / After grid */}
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            {/* Before card */}
            <motion.div
              {...fadeIn(0.2)}
              style={{
                background: "#F0EDED",
                border: "1px solid #D9D5D0",
                borderRadius: "14px",
              }}
              className="p-3 md:p-6"
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                <div
                  className="flex-shrink-0"
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#D4A09A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 2L8 8M8 2L2 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p
                  className="text-[9px] md:text-[11px]"
                  style={{
                    fontWeight: 700,
                    color: "#8C6A65",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  Without Veerd
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                {beforeItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: "#D9D5D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#A8A49E",
                        }}
                      />
                    </div>
                    <p
                      className="text-[11px] md:text-[14px]"
                      style={{
                        color: "#5C5C58",
                        lineHeight: 1.45,
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* After card */}
            <motion.div
              {...fadeIn(0.35)}
              style={{
                background: "#E4F0E8",
                border: "1px solid #A8D4B8",
                borderRadius: "14px",
              }}
              className="p-3 md:p-6"
            >
              <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
                <div
                  className="flex-shrink-0"
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#7D9E8C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5.5L4 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  className="text-[9px] md:text-[11px]"
                  style={{
                    fontWeight: 700,
                    color: "#4A7A5E",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  With Veerd
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                {afterItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: "#B8D9C5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                      }}
                    >
                      <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4.5L3 6L6.5 2.5" stroke="#4A7A5E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p
                      className="text-[11px] md:text-[14px]"
                      style={{
                        color: "#2C2C2C",
                        lineHeight: 1.45,
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating insight card */}
          <motion.div
            {...fadeIn(0.5)}
            className="mt-3 md:mt-4 p-3 md:p-4 md:px-5"
            style={{
              background: "#FFFFFF",
              border: "0.5px solid #E0DDD8",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(44, 44, 44, 0.08)",
            }}
          >
            {/* Top row */}
            <div className="flex justify-between items-center">
              <p
                className="text-[12px] md:text-[13px]"
                style={{
                  fontWeight: 700,
                  color: "#2C2C2C",
                }}
              >
                Most people wait too long
              </p>
              <span
                className="text-[9px] md:text-[10px] hidden sm:inline-block"
                style={{
                  background: "#FAF0EA",
                  color: "#9E5535",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "999px",
                }}
              >
                The Veerd difference
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "0.5px",
                backgroundColor: "#E0DDD8",
                margin: "8px 0",
              }}
            />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-1">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-[18px] md:text-[22px]"
                    style={{
                      fontWeight: 700,
                      color: "#2C2C2C",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {stat.number}
                  </p>
                  <p
                    className="text-[9px] md:text-[10px]"
                    style={{
                      color: "#7A7A72",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
