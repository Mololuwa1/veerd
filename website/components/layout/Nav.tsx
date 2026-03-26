"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-twins", label: "For Twins" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

function MobileMenu({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 top-16 z-[9999] bg-[#FAF7F2] flex flex-col px-8 pt-10 overflow-y-auto"
      style={{ opacity: 1 }}
    >
      <div className="flex flex-col gap-7">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-[20px] text-[#2C2C2C] font-semibold"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-10 pt-8 border-t border-[#E0DDD8]">
        <a
          href="#footer-signup"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            setTimeout(() => {
              document.getElementById("footer-signup")?.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }}
          className="block w-full text-center text-[16px] font-bold text-[#FAF7F2] bg-[#2C2C2C] px-6 py-3.5 rounded-[10px] cursor-pointer"
        >
          Get early access
        </a>
      </div>
    </div>,
    document.body
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <>
      <nav
        className={`sticky top-0 z-[10000] h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E0DDD8]/80"
            : "bg-[#FAF7F2] border-b border-[#E0DDD8]/40"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Veerd"
            width={40}
            height={40}
            className="rounded-[8px]"
          />
          <span className="text-[22px] font-bold text-textPrimary tracking-[-0.5px]">
            Veerd
          </span>
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
          <a
            href="#footer-signup"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("footer-signup")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-bold text-background bg-textPrimary px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Get early access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 relative z-[10001]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-textPrimary transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-textPrimary transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-textPrimary transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu rendered via portal to document.body */}
      {mounted && menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
