"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-twins", label: "For Twins" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border/80"
          : "bg-background border-b border-border/40"
      }`}
    >
      <Link
        href="/"
        className="text-[22px] font-bold text-textPrimary tracking-[-0.5px]"
      >
        Veerd
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#"
          className="text-sm font-bold text-background bg-textPrimary px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
        >
          Download the app
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-[1.5px] bg-textPrimary transition-transform ${
            menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-textPrimary transition-opacity ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-textPrimary transition-transform ${
            menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
          }`}
        />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-background z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-xl text-textPrimary font-bold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-base font-bold text-background bg-textPrimary px-8 py-3 rounded-sm"
            >
              Download the app
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
