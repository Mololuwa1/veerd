"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { twinStories } from "@/constants/content";

export default function TwinStories() {
  return (
    <section className="bg-textPrimary py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-xs font-bold uppercase text-primary tracking-[1px] mb-3">
          Real Twins
        </p>
        <h2 className="text-[36px] font-bold text-background tracking-[-0.5px] max-w-[500px] mb-12">
          People who have been exactly where you are
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {twinStories.map((twin, i) => (
            <motion.div
              key={twin.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white/[0.06] border border-white/10 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white"
                  style={{ backgroundColor: twin.avatarColor }}
                >
                  {twin.initial}
                </div>
                <div>
                  <p className="text-base font-bold text-background">
                    {twin.name}
                  </p>
                  <p className="text-[13px] font-bold text-primary">
                    {twin.transition}
                  </p>
                </div>
              </div>
              <p className="text-sm italic text-[#FAF7F2]/[0.65] leading-[1.6]">
                &ldquo;{twin.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <p className="text-[15px] text-background">
            Have you already made a career change?
          </p>
          <Link
            href="/for-twins"
            className="text-[15px] font-bold text-primary hover:underline"
          >
            Become a Twin and earn £35 per call →
          </Link>
        </div>
      </div>
    </section>
  );
}
