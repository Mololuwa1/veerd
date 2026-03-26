import { PricingPlan } from "@/types";

interface PlanCardProps {
  plan: PricingPlan;
  annual: boolean;
}

export default function PlanCard({ plan, annual }: PlanCardProps) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;
  const savings = (plan.monthlyPrice - plan.annualPrice) * 12;

  return (
    <div
      className={`bg-white rounded-xl p-7 relative ${
        plan.popular
          ? "border-2 border-primary"
          : "border-[1.5px] border-border"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-7 text-[11px] font-bold text-primary bg-primaryLight px-3 py-1 rounded-full">
          Most popular
        </span>
      )}

      <h3 className="text-xl font-bold text-textPrimary mb-3">{plan.name}</h3>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-[36px] font-bold text-textPrimary tracking-[-1px]">
          £{price}
        </span>
        <span className="text-sm text-textSecondary">/month</span>
      </div>

      <p className="text-xs text-textSecondary mb-5">
        {annual
          ? `Billed annually, save £${savings}`
          : "Billed monthly, cancel anytime"}
      </p>

      <hr className="border-border mb-5" />

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primaryLight flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="#7D9E8C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm text-textSecondary">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-[10px] text-[15px] font-bold transition-all ${
          plan.buttonVariant === "primary"
            ? "bg-textPrimary text-background hover:opacity-90"
            : "bg-transparent text-textSecondary border-[1.5px] border-border hover:border-textSecondary"
        }`}
      >
        {plan.buttonText}
      </button>
    </div>
  );
}
