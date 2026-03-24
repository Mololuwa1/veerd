import type { Metadata } from "next";
import ForTwinsPage from "./ForTwinsPage";

export const metadata: Metadata = {
  title: "Become a Veerd Twin — Earn money sharing your career change story",
  description:
    "You made the leap. Now help someone else do the same. Earn £35 per call sharing your honest career transition experience on Veerd.",
};

export default function Page() {
  return <ForTwinsPage />;
}
