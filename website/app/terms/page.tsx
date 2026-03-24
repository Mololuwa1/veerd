import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Veerd",
  description: "Veerd terms of service. The rules and agreements for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[650px] mx-auto">
        <h1 className="text-[36px] font-bold text-textPrimary tracking-[-1px] mb-8">
          Terms of Service
        </h1>
        <p className="text-xs text-textSecondary mb-8">Last updated: January 2025</p>

        <div className="space-y-8 text-[15px] text-textSecondary leading-[1.75]">
          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              About Veerd
            </h2>
            <p>
              Veerd is a career transition platform that connects people
              considering a career change with people who have already made
              one. By using Veerd you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              What Veerd is and is not
            </h2>
            <p>
              Veerd provides peer conversations and structured exploration
              tools. Twins are not licensed career counsellors, coaches, or
              therapists. The conversations and content on Veerd are for
              informational and exploratory purposes only and should not be
              considered professional career advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Subscriptions and payments
            </h2>
            <p>
              Subscriptions are billed through Apple In-App Purchase.
              Subscriptions auto-renew at the end of each billing period.
              You can cancel anytime in your Apple ID settings before your
              next renewal date to avoid being charged. Refund requests are
              handled through Apple. We also offer a 7 day money-back
              guarantee — contact hello@veerd.co within 7 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Twin conduct
            </h2>
            <p>
              Twins agree to share their honest experience and to be
              respectful and supportive during calls. Twins must not provide
              professional advice outside their area of lived experience,
              solicit Explorers for external services, or share confidential
              information from calls.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Explorer conduct
            </h2>
            <p>
              Explorers agree to be respectful during Twin calls, to use the
              platform for genuine career exploration, and to not record calls
              without consent from all parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Intellectual property
            </h2>
            <p>
              All content on the Veerd platform including Sprint materials,
              assessment tools, and the Transition Report framework is owned
              by Veerd. You may not reproduce, distribute, or create
              derivative works from our content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Limitation of liability
            </h2>
            <p>
              Veerd is not responsible for career decisions made based on Twin
              conversations or Sprint content. We provide tools for
              exploration and peer connection but ultimately career decisions
              are yours to make.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Changes to terms
            </h2>
            <p>
              We may update these terms from time to time. We will notify you
              of significant changes via email. Continued use of Veerd after
              changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Contact
            </h2>
            <p>
              Questions about these terms? Email us at hello@veerd.co.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
