"use client";

import { LandingHero } from "@/components/LandingHero";
import { LandingFeatures } from "@/components/LandingFeatures";
import { LandingMCP } from "@/components/LandingMCP";
import { LandingCTA } from "@/components/LandingCTA";

export default function LandingPage() {
  return (
    <div className="bg-mesh min-h-screen">
      <LandingHero />
      <LandingMCP />
      <LandingFeatures />
      <LandingCTA />
    </div>
  );
}
