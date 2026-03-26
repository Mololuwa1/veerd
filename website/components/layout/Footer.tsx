import Link from "next/link";
import Image from "next/image";
import EmailCapture from "@/components/ui/EmailCapture";

const productLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-twins", label: "For Twins" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

const companyLinks = [
  { href: "#", label: "About" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
  { href: "mailto:hello@veerd.co", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border px-6 md:px-12 pt-12 pb-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/logo.png"
                alt="Veerd"
                width={56}
                height={56}
                className="rounded-[10px]"
              />
              <p className="text-xl font-bold text-textPrimary">Veerd</p>
            </div>
            <p className="text-[13px] text-textSecondary leading-[1.6] mb-4">
              Talk to someone who has already made the leap
            </p>
            <div className="flex gap-4">
              {/* TikTok */}
              <a
                href="https://tiktok.com/@veerd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-textPrimary transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M12.6 0H9.6v12.3c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2c.2 0 .5 0 .7.1V7.1c-.2 0-.5-.1-.7-.1C4.2 7 1.6 9.6 1.6 12.8S4.2 18.5 7.4 18.5s5.8-2.6 5.8-5.8V5.8c1.2.9 2.7 1.4 4.2 1.4V4.2c-2.6-.1-4.8-2-4.8-4.2z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/veerd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-textPrimary transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM5.3 15.3H2.7V6.7h2.7v8.6zM4 5.6c-.9 0-1.6-.7-1.6-1.6S3.1 2.4 4 2.4s1.6.7 1.6 1.6-.7 1.6-1.6 1.6zm11.3 9.7h-2.7V11c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3.9-.1.2-.1.4-.1.6v4.5H7.2V6.7h2.6v1.2c.4-.5 1-1.3 2.4-1.3 1.7 0 3 1.1 3 3.5v5.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-bold uppercase text-textPrimary tracking-[0.5px] mb-4">
              Product
            </p>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold uppercase text-textPrimary tracking-[0.5px] mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div id="footer-signup">
            <p className="text-xs font-bold uppercase text-textPrimary tracking-[0.5px] mb-4">
              Stay in the loop
            </p>
            <EmailCapture placement="footer" />
            <p className="text-xs text-textSecondary mt-3">
              No spam. Just updates on Veerd and career transition insights.
            </p>
          </div>
        </div>

        <hr className="border-border mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-textSecondary">
            &copy; 2026 Veerd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-textSecondary hover:text-textPrimary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-textSecondary hover:text-textPrimary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
