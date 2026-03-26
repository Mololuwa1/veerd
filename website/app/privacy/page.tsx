import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Veerd",
  description: "Veerd privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background py-20 px-6 md:px-12">
      <div className="max-w-[650px] mx-auto">
        <h1 className="text-[36px] font-bold text-textPrimary tracking-[-1px] mb-8">
          Privacy Policy
        </h1>
        <p className="text-xs text-textSecondary mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-[15px] text-textSecondary leading-[1.75]">
          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              What we collect
            </h2>
            <p>
              When you use Veerd we collect your email address, name, and the
              information you provide in your intake form or Twin application.
              We also collect anonymous usage data through Vercel Analytics to
              improve the product.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              How we use your data
            </h2>
            <p>
              We use your intake information to match you with an appropriate
              Twin. We use your email to send you product updates and
              transactional emails related to your account. We never sell your
              data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Data storage
            </h2>
            <p>
              Your data is stored securely on Supabase servers. We use
              industry-standard encryption for data in transit and at rest.
              Call recordings are not stored. Twin calls happen in real time
              and are not recorded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Your rights
            </h2>
            <p>
              You can request access to, correction of, or deletion of your
              personal data at any time by emailing hello@veerd.co. We will
              respond within 30 days. You can unsubscribe from marketing emails
              at any time using the link in any email.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Cookies
            </h2>
            <p>
              We use essential cookies to keep you logged in and analytics
              cookies through Vercel Analytics to understand how people use the
              site. We do not use advertising cookies or trackers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Third parties
            </h2>
            <p>
              We use Supabase for data storage, Resend for transactional
              email, and Vercel for hosting and analytics. Each of these
              services has their own privacy policy and processes data on our
              behalf under appropriate agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-textPrimary mb-3">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy or your data,
              email us at hello@veerd.co.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
