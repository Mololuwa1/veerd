"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { twinStories } from "@/constants/content";

const cardStyles = [
  {
    bg: "linear-gradient(160deg, #2A3D33 0%, #1E2E25 100%)",
    border: "#3D5A47",
    tagBg: "#7D9E8C",
  },
  {
    bg: "linear-gradient(160deg, #3D2E24 0%, #2E2019 100%)",
    border: "#5A3F30",
    tagBg: "#C4714A",
  },
  {
    bg: "linear-gradient(160deg, #2A3D33 0%, #1E2E25 100%)",
    border: "#3D5A47",
    tagBg: "#7D9E8C",
  },
];

export default function TwinStories() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const fadeUp = (delay: number) => mounted ? ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }) : { style: { opacity: 1 } };

  return (
    <section className="bg-[#1A1A1A] py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase text-primary tracking-[1px] mb-3">
          Real Twins
        </p>
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#FAF7F2] tracking-[-0.5px] max-w-[500px] mb-12 leading-[1.2]">
          People who have been exactly where you are
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {twinStories.map((twin, i) => (
            <motion.div
              key={twin.name}
              {...fadeUp(i * 0.15)}
              className="rounded-xl p-6"
              style={{
                background: cardStyles[i % 3].bg,
                border: `1px solid ${cardStyles[i % 3].border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {twin.image ? (
                  <Image
                    src={twin.image}
                    alt={twin.name}
                    width={200}
                    height={200}
                    className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-white/25"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white ring-2 ring-white/25"
                    style={{ backgroundColor: twin.avatarColor }}
                  >
                    {twin.initial}
                  </div>
                )}
                <div>
                  <p className="text-[16px] font-bold text-white">
                    {twin.name}
                  </p>
                  <span
                    className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mt-0.5"
                    style={{
                      backgroundColor: cardStyles[i % 3].tagBg,
                      color: "#fff",
                    }}
                  >
                    {twin.transition}
                  </span>
                </div>
              </div>

              <p className="text-[14px] md:text-[15px] italic text-white/90 leading-[1.7]">
                &ldquo;{twin.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <p className="text-[15px] text-white/90">
            Have you already made a career change?
          </p>
          <Link
            href="/for-twins"
            className="text-[15px] font-bold text-primary hover:underline"
          >
            Become a Twin &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
