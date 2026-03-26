import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import TwinStories from "@/components/sections/TwinStories";
import SprintSection from "@/components/sections/SprintSection";
import Pricing from "@/components/sections/Pricing";
import ForTwins from "@/components/sections/ForTwins";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Veerd | Career transition through real human connection",
  description:
    "Meet the person who made the exact career change you are considering. Veerd matches you with real career changers for honest conversation and structured exploration.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TwinStories />
      <SprintSection />
      <Pricing />
      <ForTwins />
      <FAQ />
    </>
  );
}
