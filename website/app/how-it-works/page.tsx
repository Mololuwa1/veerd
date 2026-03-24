import type { Metadata } from "next";
import HowItWorksDetail from "./HowItWorksDetail";

export const metadata: Metadata = {
  title: "How Veerd works — Career transition with real human guidance",
  description:
    "Learn how Veerd matches you with someone who has made the exact career change you are considering. Intake, matching, Twin calls, and 30 day Sprints explained.",
};

export default function HowItWorksPage() {
  return <HowItWorksDetail />;
}
